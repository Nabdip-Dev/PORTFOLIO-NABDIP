import { Router } from "express";
import { getOverviewStats } from "../controllers/statsController.js";
import { requireAuth, requireRole } from "../middlewares/auth.js";

const router = Router();
router.get("/overview", requireAuth, requireRole("admin"), getOverviewStats);

export default router;
