import { Router } from "express";
import rateLimit from "express-rate-limit";
import {
  getApproved,
  submit,
  getAllForAdmin,
  setApproval,
  remove,
} from "../controllers/testimonialController.js";
import { validate } from "../middlewares/validate.js";
import { requireAuth, requireRole } from "../middlewares/auth.js";
import { testimonialSubmitSchema } from "../validators/testimonialValidators.js";

const router = Router();

const submitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many submissions, please try again later" },
});

// Public
router.get("/", getApproved);
router.post("/", submitLimiter, validate(testimonialSubmitSchema), submit);

// Admin
router.get("/admin", requireAuth, requireRole("admin"), getAllForAdmin);
router.patch("/:id/approval", requireAuth, requireRole("admin"), setApproval);
router.delete("/:id", requireAuth, requireRole("admin"), remove);

export default router;
