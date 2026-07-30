import { logActivity } from "../utils/activityLogger.js";

/**
 * Generic CRUD controller factory. Most of the "content" collections
 * (Projects, Skills, Services, Experience, Education, SocialLinks, FAQ,
 * PricingPlan, Post) share the same shape of operations, so we generate
 * them once here instead of duplicating boilerplate per-model. Model-specific
 * logic (e.g. Testimonial approval, Project view counts) lives in its own
 * controller instead. `resourceName` is used only for the activity log.
 */
export function createCrudController(Model, { searchFields = [], defaultSort = "-createdAt", resourceName } = {}) {
  const name = resourceName || Model.modelName;

  return {
    async getAll(req, res, next) {
      try {
        const { page = 1, limit = 12, search, category, status, featured, sort } = req.query;
        const query = {};

        if (search && searchFields.length) {
          query.$or = searchFields.map((f) => ({ [f]: { $regex: search, $options: "i" } }));
        }
        if (category) query.category = category;
        if (status) query.status = status;
        if (featured !== undefined) query.featured = featured === "true";

        const pageNum = Math.max(parseInt(page, 10) || 1, 1);
        const limitNum = Math.min(parseInt(limit, 10) || 12, 100);

        const [items, total] = await Promise.all([
          Model.find(query)
            .sort(sort || defaultSort)
            .skip((pageNum - 1) * limitNum)
            .limit(limitNum),
          Model.countDocuments(query),
        ]);

        res.json({
          success: true,
          data: items,
          pagination: {
            page: pageNum,
            limit: limitNum,
            total,
            pages: Math.ceil(total / limitNum),
          },
        });
      } catch (err) {
        next(err);
      }
    },

    async getOne(req, res, next) {
      try {
        const item = await Model.findById(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: "Not found" });
        res.json({ success: true, data: item });
      } catch (err) {
        next(err);
      }
    },

    async create(req, res, next) {
      try {
        const item = await Model.create(req.body);
        if (req.user) {
          logActivity({ adminId: req.user._id, action: "create", resource: name, resourceId: item._id.toString() });
        }
        res.status(201).json({ success: true, data: item });
      } catch (err) {
        next(err);
      }
    },

    async update(req, res, next) {
      try {
        const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!item) return res.status(404).json({ success: false, message: "Not found" });
        if (req.user) {
          logActivity({ adminId: req.user._id, action: "update", resource: name, resourceId: item._id.toString() });
        }
        res.json({ success: true, data: item });
      } catch (err) {
        next(err);
      }
    },

    async remove(req, res, next) {
      try {
        const item = await Model.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: "Not found" });
        if (req.user) {
          logActivity({ adminId: req.user._id, action: "delete", resource: name, resourceId: req.params.id });
        }
        res.json({ success: true, message: "Deleted" });
      } catch (err) {
        next(err);
      }
    },
  };
}
