import mongoose from "mongoose";
const { Schema, model } = mongoose;

const skillSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    icon: { type: String, required: true }, // react-icons key, e.g. "SiReact"
    percentage: { type: Number, required: true, min: 0, max: 100 },
    description: { type: String, maxlength: 300 },
    category: {
      type: String,
      enum: ["frontend", "backend", "database", "deployment", "version-control", "tools"],
      required: true,
      index: true,
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Skill = model("Skill", skillSchema);
export default Skill;
