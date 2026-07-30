import mongoose from "mongoose";
const { Schema, model } = mongoose;

const educationSchema = new Schema(
  {
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    description: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Education = model("Education", educationSchema);
export default Education;
