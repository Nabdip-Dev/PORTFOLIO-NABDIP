import { Router } from "express";
import { About } from "../models/About.js";
import { createSingletonController } from "../controllers/singletonFactory.js";
import { requireAuth, requireRole } from "../middlewares/auth.js";

const router = Router();
const ctrl = createSingletonController(About, { biography: "" });

router.get("/", ctrl.get);
router.patch("/", requireAuth, requireRole("admin"), ctrl.update);

export default router;
