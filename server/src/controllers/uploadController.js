import { uploadBufferToCloudinary, deleteFromCloudinary } from "../utils/cloudinaryUpload.js";

/**
 * Generic image upload — used by chat (any authenticated user) and by the
 * admin dashboard (avatar, project images). Folder is fixed per-route
 * rather than client-supplied, so nothing can be uploaded outside the
 * expected Cloudinary folders.
 */
export function makeImageUploadHandler(folder) {
  return async (req, res, next) => {
    try {
      if (!req.file) return res.status(400).json({ success: false, message: "No file provided" });
      const result = await uploadBufferToCloudinary(req.file.buffer, { folder, resourceType: "image" });
      res.status(201).json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  };
}

export function makeVideoUploadHandler(folder) {
  return async (req, res, next) => {
    try {
      if (!req.file) return res.status(400).json({ success: false, message: "No file provided" });
      const result = await uploadBufferToCloudinary(req.file.buffer, { folder, resourceType: "video" });
      res.status(201).json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  };
}

export function makeDocumentUploadHandler(folder) {
  return async (req, res, next) => {
    try {
      if (!req.file) return res.status(400).json({ success: false, message: "No file provided" });
      // Cloudinary treats non-image/video files as "raw" resources.
      const result = await uploadBufferToCloudinary(req.file.buffer, { folder, resourceType: "raw" });
      res.status(201).json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  };
}

export async function deleteAsset(req, res, next) {
  try {
    const { publicId, resourceType = "image" } = req.body;
    if (!publicId) return res.status(400).json({ success: false, message: "publicId is required" });
    await deleteFromCloudinary(publicId, resourceType);
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    next(err);
  }
}
