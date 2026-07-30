import { PageView } from "../models/PageView.js";
import { Project } from "../models/Project.js";

// In-memory "live visitor" tracking: sessionId -> last heartbeat timestamp.
// Deliberately not persisted to Mongo — this is a transient presence signal,
// not historical data (that's what PageView is for). Resets on server restart,
// which is fine since "live" only ever means "right now" anyway.
const liveSessions = new Map();
const LIVE_WINDOW_MS = 60 * 1000; // a session counts as "live" for 60s after its last heartbeat

function pruneStaleSessions() {
  const cutoff = Date.now() - LIVE_WINDOW_MS;
  for (const [id, lastSeen] of liveSessions) {
    if (lastSeen < cutoff) liveSessions.delete(id);
  }
}

/** Public: records a page view. No cookies, no fingerprinting — just a
 * path + best-effort country from a CDN/proxy header if one is present. */
export async function trackPageView(req, res, next) {
  try {
    const { path, referrer } = req.body;
    if (!path) return res.status(400).json({ success: false, message: "path is required" });

    // These headers are only populated when deployed behind Vercel or
    // Cloudflare; locally (and on plain Node hosts) this stays "Unknown" —
    // there's no reliable GeoIP lookup without a paid/external service.
    const country =
      req.headers["x-vercel-ip-country"] || req.headers["cf-ipcountry"] || "Unknown";

    await PageView.create({ path, referrer, country });
    res.status(201).json({ success: true });
  } catch (err) {
    next(err);
  }
}

/** Public: lightweight presence ping, called on an interval by the frontend. */
export function heartbeat(req, res) {
  const { sessionId } = req.body;
  if (sessionId) liveSessions.set(sessionId, Date.now());
  pruneStaleSessions();
  res.json({ success: true });
}

/** Admin: current live visitor count. */
export function getLiveCount(req, res) {
  pruneStaleSessions();
  res.json({ success: true, data: { liveVisitors: liveSessions.size } });
}

/** Admin: pageviews per day for the last N days, plus top pages. */
export async function getAnalyticsSummary(req, res, next) {
  try {
    const days = Math.min(parseInt(req.query.days, 10) || 14, 90);
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const [byDay, topPaths, topProjects, totalViews] = await Promise.all([
      PageView.aggregate([
        { $match: { createdAt: { $gte: since } } },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),
      PageView.aggregate([
        { $match: { createdAt: { $gte: since } } },
        { $group: { _id: "$path", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 },
      ]),
      Project.find().sort("-views").limit(5).select("title views slug"),
      PageView.countDocuments({ createdAt: { $gte: since } }),
    ]);

    res.json({
      success: true,
      data: {
        byDay: byDay.map((d) => ({ date: d._id, count: d.count })),
        topPaths: topPaths.map((p) => ({ path: p._id, count: p.count })),
        topProjects,
        totalViews,
      },
    });
  } catch (err) {
    next(err);
  }
}
