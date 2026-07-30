import { Router } from "express";
import { Post } from "../models/Post.js";
import { createCrudController } from "../controllers/crudFactory.js";
import { requireAuth, requireRole } from "../middlewares/auth.js";

const router = Router();
const ctrl = createCrudController(Post, { searchFields: ["title", "excerpt", "tags"], resourceName: "Post" });

// Public: only published posts, by slug or id, with view counting on detail fetch.
router.get("/", async (req, res, next) => {
  try {
    const { page = 1, limit = 9, search, tag } = req.query;
    const query = { published: true };
    if (search) query.$or = ["title", "excerpt"].map((f) => ({ [f]: { $regex: search, $options: "i" } }));
    if (tag) query.tags = tag;

    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const limitNum = Math.min(parseInt(limit, 10) || 9, 50);

    const [items, total] = await Promise.all([
      Post.find(query).sort("-publishedAt").skip((pageNum - 1) * limitNum).limit(limitNum),
      Post.countDocuments(query),
    ]);
    res.json({ success: true, data: items, pagination: { page: pageNum, limit: limitNum, total, pages: Math.ceil(total / limitNum) } });
  } catch (err) {
    next(err);
  }
});

router.get("/:slugOrId", async (req, res, next) => {
  try {
    const query = req.params.slugOrId.match(/^[0-9a-fA-F]{24}$/)
      ? { _id: req.params.slugOrId }
      : { slug: req.params.slugOrId, published: true };
    const post = await Post.findOneAndUpdate(query, { $inc: { views: 1 } }, { new: true });
    if (!post) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: post });
  } catch (err) {
    next(err);
  }
});

// Admin: full list (published + drafts) and mutations.
router.get("/admin/all", requireAuth, requireRole("admin"), ctrl.getAll);
router.post("/", requireAuth, requireRole("admin"), (req, res, next) => {
  if (req.body.published && !req.body.publishedAt) req.body.publishedAt = new Date();
  next();
}, ctrl.create);
router.patch("/:id", requireAuth, requireRole("admin"), (req, res, next) => {
  if (req.body.published && !req.body.publishedAt) req.body.publishedAt = new Date();
  next();
}, ctrl.update);
router.delete("/:id", requireAuth, requireRole("admin"), ctrl.remove);

export default router;
