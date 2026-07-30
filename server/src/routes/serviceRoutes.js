import { Router } from "express";
import { Service } from "../models/Service.js";
import { createCrudController } from "../controllers/crudFactory.js";
import { requireAuth, requireRole } from "../middlewares/auth.js";

const router = Router();
const ctrl = createCrudController(Service, { defaultSort: "order" });

router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getOne);
router.post("/", requireAuth, requireRole("admin"), ctrl.create);
router.patch("/:id", requireAuth, requireRole("admin"), ctrl.update);
router.delete("/:id", requireAuth, requireRole("admin"), ctrl.remove);

export default router;
