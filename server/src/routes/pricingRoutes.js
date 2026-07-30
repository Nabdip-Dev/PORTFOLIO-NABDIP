import { Router } from "express";
import { PricingPlan } from "../models/PricingPlan.js";
import { createCrudController } from "../controllers/crudFactory.js";
import { requireAuth, requireRole } from "../middlewares/auth.js";

const router = Router();
const ctrl = createCrudController(PricingPlan, { defaultSort: "order", resourceName: "PricingPlan" });

router.get("/", ctrl.getAll);
router.post("/", requireAuth, requireRole("admin"), ctrl.create);
router.patch("/:id", requireAuth, requireRole("admin"), ctrl.update);
router.delete("/:id", requireAuth, requireRole("admin"), ctrl.remove);

export default router;
