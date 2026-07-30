import { ActivityLog } from "../models/ActivityLog.js";

export async function getActivityLog(req, res, next) {
  try {
    const { page = 1, limit = 30 } = req.query;
    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const limitNum = Math.min(parseInt(limit, 10) || 30, 100);

    const [items, total] = await Promise.all([
      ActivityLog.find()
        .sort("-createdAt")
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum)
        .populate("admin", "name email"),
      ActivityLog.countDocuments(),
    ]);

    res.json({
      success: true,
      data: items,
      pagination: { page: pageNum, limit: limitNum, total, pages: Math.ceil(total / limitNum) },
    });
  } catch (err) {
    next(err);
  }
}
