import mongoose from "mongoose";
const { Schema, model } = mongoose;

// Singleton document mirrored to LocalStorage on the client for instant paint,
// and persisted here so the admin's chosen defaults survive across devices.
const themeSchema = new Schema(
  {
    mode: { type: String, enum: ["dark", "light"], default: "dark" },
    accent: { type: String, enum: ["purple", "blue", "black"], default: "purple" },
    primaryColor: { type: String }, // admin override, hex
    secondaryColor: { type: String },
    backgroundStyle: { type: String, enum: ["solid", "gradient", "mesh"], default: "gradient" },
  },
  { timestamps: true }
);

export const Theme = model("Theme", themeSchema);
export default Theme;
