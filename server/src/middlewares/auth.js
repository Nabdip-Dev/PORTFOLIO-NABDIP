import { verifyAccessToken } from "../utils/tokens.js";
import { User } from "../models/User.js";

/**
 * Verifies the Bearer access token, attaches the authenticated user to
 * req.user, and rejects the request otherwise. Used on chat-send routes
 * and everything under /api/admin.
 */
export async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    const payload = verifyAccessToken(token);
    const user = await User.findById(payload.sub);

    if (!user) {
      return res.status(401).json({ success: false, message: "User no longer exists" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
}

/**
 * Restricts a route to specific roles. Use after requireAuth.
 * Example: router.get("/admin/stats", requireAuth, requireRole("admin"), handler)
 */
export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
    next();
  };
}

/**
 * Blocks unverified visitors from the chat system, per spec ("Users must
 * verify their email before accessing the Chat System"). Admin is exempt —
 * the seed script marks the admin account verified on creation anyway, but
 * this exemption also covers accounts promoted to admin manually later.
 */
export function requireVerifiedEmail(req, res, next) {
  if (req.user.role === "admin" || req.user.isEmailVerified) {
    return next();
  }
  return res.status(403).json({
    success: false,
    message: "Please verify your email before using chat",
    code: "EMAIL_NOT_VERIFIED",
  });
}
