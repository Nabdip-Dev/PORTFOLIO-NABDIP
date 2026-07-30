import mongoose from "mongoose";
const { Schema, model } = mongoose;

const projectSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 150 },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true },
    shortDescription: { type: String, maxlength: 250 },
    images: [{ url: String, publicId: String }],
    video: { url: String, publicId: String },
    features: [{ type: String }],
    technologies: [{ type: String }],
    category: { type: String, required: true, index: true },
    githubLink: { type: String },
    liveLink: { type: String },
    status: {
      type: String,
      enum: ["completed", "in-progress", "planned"],
      default: "completed",
    },
    featured: { type: Boolean, default: false, index: true },
    views: { type: Number, default: 0 },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

projectSchema.index({ title: "text", description: "text" });

export const Project = model("Project", projectSchema);
export default Project;
