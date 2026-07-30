import { ActivityLog } from "../models/ActivityLog.js";

/** Fire-and-forget activity log write — never blocks or fails the request
 * that triggered it. Called from the generic CRUD/singleton factories so
 * every admin mutation across every collection is captured automatically. */
export function logActivity({ adminId, action, resource, resourceId, meta }) {
  ActivityLog.create({ admin: adminId, action, resource, resourceId, meta }).catch((err) => {
    console.error("[activityLogger] Failed to write log:", err.message);
  });
}
