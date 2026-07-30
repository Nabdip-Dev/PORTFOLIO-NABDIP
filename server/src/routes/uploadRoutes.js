import { Router } from "express";
import rateLimit from "express-rate-limit";
import { uploadImage, uploadVideo, uploadDocument } from "../middlewares/upload.js";
import {
  makeImageUploadHandler,
  makeVideoUploadHandler,
  makeDocumentUploadHandler,
  deleteAsset,
} from "../controllers/uploadController.js";
import { requireAuth, requireRole } from "../middlewares/auth.js";

const router = Router();

const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 60,
  standardHeaders: true,
  legacyHeaders: false,
});
router.use(uploadLimiter);

// Any authenticated user (chat participants + admin) can upload a chat
// image or their own avatar — folder is fixed server-side either way.
router.post(
  "/chat-image",
  requireAuth,
  uploadImage.single("file"),
  makeImageUploadHandler("portfolio/chat")
);
router.post(
  "/avatar",
  requireAuth,
  uploadImage.single("file"),
  makeImageUploadHandler("portfolio/avatars")
);

// Admin-only: project media, resume.
router.post(
  "/project-image",
  requireAuth,
  requireRole("admin"),
  uploadImage.single("file"),
  makeImageUploadHandler("portfolio/projects")
);
router.post(
  "/project-video",
  requireAuth,
  requireRole("admin"),
  uploadVideo.single("file"),
  makeVideoUploadHandler("portfolio/projects")
);
router.post(
  "/resume",
  requireAuth,
  requireRole("admin"),
  uploadDocument.single("file"),
  makeDocumentUploadHandler("portfolio/resume")
);

router.delete("/", requireAuth, requireRole("admin"), deleteAsset);

export default router;
