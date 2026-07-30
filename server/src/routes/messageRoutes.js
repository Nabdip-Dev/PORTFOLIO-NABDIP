import { Router } from "express";
import rateLimit from "express-rate-limit";
import { submit, getAll, markRead, remove } from "../controllers/messageController.js";
import { validate } from "../middlewares/validate.js";
import { requireAuth, requireRole } from "../middlewares/auth.js";
import { messageSubmitSchema } from "../validators/messageValidators.js";

const router = Router();

const submitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many messages, please try again later" },
});

// Public
router.post("/", submitLimiter, validate(messageSubmitSchema), submit);

// Admin
router.get("/", requireAuth, requireRole("admin"), getAll);
router.patch("/:id/read", requireAuth, requireRole("admin"), markRead);
router.delete("/:id", requireAuth, requireRole("admin"), remove);

export default router;
