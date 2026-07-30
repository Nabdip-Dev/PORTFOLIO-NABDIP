import multer from "multer";

// Memory storage: files are held as a buffer and streamed straight to
// Cloudinary in the controller, never written to local disk.
const storage = multer.memoryStorage();

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) return cb(null, true);
  cb(new Error("Only image files are allowed"));
};

const videoFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("video/")) return cb(null, true);
  cb(new Error("Only video files are allowed"));
};

const documentFilter = (req, file, cb) => {
  const allowed = ["application/pdf", "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
  if (allowed.includes(file.mimetype)) return cb(null, true);
  cb(new Error("Only PDF or Word documents are allowed"));
};

export const uploadImage = multer({
  storage,
  fileFilter: imageFilter,
  limits: { fileSize: 8 * 1024 * 1024 }, // 8MB
});

export const uploadVideo = multer({
  storage,
  fileFilter: videoFilter,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
});

export const uploadDocument = multer({
  storage,
  fileFilter: documentFilter,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB
});
