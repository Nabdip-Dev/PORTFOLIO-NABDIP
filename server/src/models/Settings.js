import mongoose from "mongoose";
const { Schema, model } = mongoose;

// Singleton document: SEO defaults + general website settings.
const settingsSchema = new Schema(
  {
    siteTitle: { type: String, default: "" },
    siteDescription: { type: String, default: "" },
    seoKeywords: [{ type: String }],
    ogImage: { url: String, publicId: String },
    contactEmail: { type: String },
    whatsappNumber: { type: String }, // E.164 format, e.g. "8801XXXXXXXXX" — used to build wa.me links
    maintenanceMode: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Settings = model("Settings", settingsSchema);
export default Settings;
