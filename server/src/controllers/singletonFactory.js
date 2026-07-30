import { logActivity } from "../utils/activityLogger.js";

/**
 * Factory for "singleton" collections that only ever have one document
 * (Hero, About, Settings, Theme). GET returns the document, creating a
 * default one on first access; PATCH (admin-only) upserts it and logs the change.
 */
export function createSingletonController(Model, defaults = {}, resourceName) {
  const name = resourceName || Model.modelName;

  return {
    async get(req, res, next) {
      try {
        let doc = await Model.findOne();
        if (!doc) doc = await Model.create(defaults);
        res.json({ success: true, data: doc });
      } catch (err) {
        next(err);
      }
    },

    async update(req, res, next) {
      try {
        const doc = await Model.findOneAndUpdate({}, req.body, {
          new: true,
          upsert: true,
          runValidators: true,
        });
        if (req.user) {
          logActivity({ adminId: req.user._id, action: "update", resource: name, resourceId: doc._id.toString() });
        }
        res.json({ success: true, data: doc });
      } catch (err) {
        next(err);
      }
    },
  };
}
