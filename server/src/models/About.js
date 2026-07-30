import mongoose from "mongoose";
const { Schema, model } = mongoose;

const statSchema = new Schema(
  { label: String, value: String },
  { _id: false }
);

const timelineItemSchema = new Schema(
  {
    year: String,
    title: String,
    description: String,
  },
  { _id: false }
);

// Singleton document.
const aboutSchema = new Schema(
  {
    photo: { url: String, publicId: String },
    biography: { type: String, required: true },
    achievements: [{ type: String }],
    stats: [statSchema],
    timeline: [timelineItemSchema],
  },
  { timestamps: true }
);

export const About = model("About", aboutSchema);
export default About;
