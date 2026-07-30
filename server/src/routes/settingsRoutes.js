import { Router } from "express";
import { Settings } from "../models/Settings.js";
import { createSingletonController } from "../controllers/singletonFactory.js";
import { requireAuth, requireRole } from "../middlewares/auth.js";

const router = Router();
const ctrl = createSingletonController(Settings, {});

router.get("/", ctrl.get);
router.patch("/", requireAuth, requireRole("admin"), ctrl.update);

export default router;
