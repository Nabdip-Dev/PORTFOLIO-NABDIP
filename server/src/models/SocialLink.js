import mongoose from "mongoose";
const { Schema, model } = mongoose;

const socialLinkSchema = new Schema(
  {
    platform: { type: String, required: true }, // e.g. "github", "linkedin"
    url: { type: String, required: true },
    icon: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const SocialLink = model("SocialLink", socialLinkSchema);
export default SocialLink;
