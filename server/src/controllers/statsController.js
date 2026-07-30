import { Project } from "../models/Project.js";
import { Testimonial } from "../models/Testimonial.js";
import { Message } from "../models/Message.js";
import { Chat } from "../models/Chat.js";

/** Admin-only summary counts for the dashboard Overview page. */
export async function getOverviewStats(req, res, next) {
  try {
    const [totalProjects, pendingTestimonials, unreadMessages, totalChats, projectViews] =
      await Promise.all([
        Project.countDocuments(),
        Testimonial.countDocuments({ approved: false }),
        Message.countDocuments({ read: false }),
        Chat.countDocuments(),
        Project.aggregate([{ $group: { _id: null, total: { $sum: "$views" } } }]),
      ]);

    res.json({
      success: true,
      data: {
        totalProjects,
        pendingTestimonials,
        unreadMessages,
        totalChats,
        totalProjectViews: projectViews[0]?.total ?? 0,
      },
    });
  } catch (err) {
    next(err);
  }
}
