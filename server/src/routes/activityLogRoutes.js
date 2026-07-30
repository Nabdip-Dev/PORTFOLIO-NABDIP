import { Router } from "express";
import { getActivityLog } from "../controllers/activityLogController.js";
import { requireAuth, requireRole } from "../middlewares/auth.js";

const router = Router();
router.get("/", requireAuth, requireRole("admin"), getActivityLog);

export default router;
