import mongoose from "mongoose";
const { Schema, model } = mongoose;

// One document per page view — kept intentionally simple (no personal data,
// no cookies/fingerprinting) since this is a lightweight traffic counter,
// not a full analytics platform.
const pageViewSchema = new Schema(
  {
    path: { type: String, required: true },
    country: { type: String, default: "Unknown" },
    referrer: { type: String },
  },
  { timestamps: true }
);

pageViewSchema.index({ createdAt: -1 });
pageViewSchema.index({ path: 1 });

export const PageView = model("PageView", pageViewSchema);
export default PageView;
