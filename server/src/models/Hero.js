import mongoose from "mongoose";
const { Schema, model } = mongoose;

// Singleton document — there is only ever one Hero config.
const heroSchema = new Schema(
  {
    greeting: { type: String, default: "Hello, I'm" },
    name: { type: String, required: true },
    titles: [{ type: String }], // rotated by the typing effect
    availability: { type: Boolean, default: true },
    resumeUrl: { type: String },
    resumePublicId: { type: String },
    socialLinks: [{ platform: String, url: String, icon: String }],
  },
  { timestamps: true }
);

export const Hero = model("Hero", heroSchema);
export default Hero;
