import mongoose from "mongoose";
const { Schema, model } = mongoose;

const activityLogSchema = new Schema(
  {
    admin: { type: Schema.Types.ObjectId, ref: "User", required: true },
    action: { type: String, required: true }, // "create" | "update" | "delete" | "login" | ...
    resource: { type: String, required: true }, // e.g. "Project", "Testimonial"
    resourceId: { type: String },
    meta: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

activityLogSchema.index({ createdAt: -1 });

export const ActivityLog = model("ActivityLog", activityLogSchema);
export default ActivityLog;
