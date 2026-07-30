import { Router } from "express";
import { Project } from "../models/Project.js";
import { createCrudController } from "../controllers/crudFactory.js";
import { requireAuth, requireRole } from "../middlewares/auth.js";

const router = Router();
const ctrl = createCrudController(Project, { searchFields: ["title", "description", "technologies"] });

// Public: browse, filter, search, paginate
router.get("/", ctrl.getAll);
router.get("/:id", async (req, res, next) => {
  try {
    // Support lookup by slug or id, and increment view count on detail view
    const query = req.params.id.match(/^[0-9a-fA-F]{24}$/)
      ? { _id: req.params.id }
      : { slug: req.params.id };
    const project = await Project.findOneAndUpdate(query, { $inc: { views: 1 } }, { new: true });
    if (!project) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
});

// Admin-only mutation
router.post("/", requireAuth, requireRole("admin"), ctrl.create);
router.patch("/:id", requireAuth, requireRole("admin"), ctrl.update);
router.delete("/:id", requireAuth, requireRole("admin"), ctrl.remove);

export default router;
