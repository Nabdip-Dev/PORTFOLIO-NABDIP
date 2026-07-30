import { Router } from "express";
import { Hero } from "../models/Hero.js";
import { createSingletonController } from "../controllers/singletonFactory.js";
import { requireAuth, requireRole } from "../middlewares/auth.js";

const router = Router();
const ctrl = createSingletonController(Hero, { name: "Your Name", titles: ["Full Stack Developer"] });

router.get("/", ctrl.get);
router.patch("/", requireAuth, requireRole("admin"), ctrl.update);

export default router;
