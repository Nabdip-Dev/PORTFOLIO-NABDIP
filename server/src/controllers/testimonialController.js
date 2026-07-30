import crypto from "crypto";
import { Testimonial } from "../models/Testimonial.js";
import { logActivity } from "../utils/activityLogger.js";

function hashIp(ip) {
  return crypto.createHash("sha256").update(ip || "unknown").digest("hex");
}

/** Public: list only approved testimonials, paginated. */
export async function getApproved(req, res, next) {
  try {
    const { page = 1, limit = 9 } = req.query;
    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const limitNum = Math.min(parseInt(limit, 10) || 9, 50);

    const [items, total] = await Promise.all([
      Testimonial.find({ approved: true })
        .sort("-createdAt")
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum),
      Testimonial.countDocuments({ approved: true }),
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

/**
 * Public: submit a review. No login required, but:
 *  - honeypot field must be empty (bots tend to fill every field)
 *  - IP is hashed and rate-limited at the route level
 *  - always created with approved: false
 */
export async function submit(req, res, next) {
  try {
    const { name, country, company, rating, comment, photo, honeypot } = req.body;

    if (honeypot) {
      // Silently pretend success so bots don't learn the trap worked.
      return res.status(201).json({ success: true, message: "Thank you for your review" });
    }

    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    await Testimonial.create({
      name,
      country,
      company,
      rating,
      comment,
      photo,
      approved: false,
      ipHash: hashIp(Array.isArray(ip) ? ip[0] : ip),
    });

    res.status(201).json({ success: true, message: "Thank you! Your review is pending approval." });
  } catch (err) {
    next(err);
  }
}

/** Admin: list all testimonials (pending + approved) for moderation. */
export async function getAllForAdmin(req, res, next) {
  try {
    const { approved } = req.query;
    const query = {};
    if (approved !== undefined) query.approved = approved === "true";
    const items = await Testimonial.find(query).sort("-createdAt");
    res.json({ success: true, data: items });
  } catch (err) {
    next(err);
  }
}

/** Admin: approve or reject (toggle) a testimonial. */
export async function setApproval(req, res, next) {
  try {
    const { approved } = req.body;
    const item = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { approved: Boolean(approved) },
      { new: true }
    );
    if (!item) return res.status(404).json({ success: false, message: "Not found" });
    logActivity({
      adminId: req.user._id,
      action: approved ? "approve" : "reject",
      resource: "Testimonial",
      resourceId: item._id.toString(),
    });
    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
}

export async function remove(req, res, next) {
  try {
    const item = await Testimonial.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    next(err);
  }
}
