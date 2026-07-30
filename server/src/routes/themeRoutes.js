import { Router } from "express";
import { Theme } from "../models/Theme.js";
import { createSingletonController } from "../controllers/singletonFactory.js";
import { requireAuth, requireRole } from "../middlewares/auth.js";

const router = Router();
const ctrl = createSingletonController(Theme, { mode: "dark", accent: "purple" });

// Public GET so the site can paint the admin's chosen defaults for new visitors
// (returning visitors' own LocalStorage choice still takes priority client-side).
router.get("/", ctrl.get);
router.patch("/", requireAuth, requireRole("admin"), ctrl.update);

export default router;
