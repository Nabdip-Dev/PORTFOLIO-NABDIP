import { Router } from "express";
import rateLimit from "express-rate-limit";
import { trackPageView, heartbeat, getLiveCount, getAnalyticsSummary } from "../controllers/analyticsController.js";
import { requireAuth, requireRole } from "../middlewares/auth.js";

const router = Router();

// Generous but bounded — pageview/heartbeat are called automatically by
// every visitor's browser, not something a person triggers manually.
const trackLimiter = rateLimit({ windowMs: 60 * 1000, limit: 30, standardHeaders: true, legacyHeaders: false });

router.post("/pageview", trackLimiter, trackPageView);
router.post("/heartbeat", trackLimiter, heartbeat);

router.get("/live", requireAuth, requireRole("admin"), getLiveCount);
router.get("/summary", requireAuth, requireRole("admin"), getAnalyticsSummary);

export default router;
