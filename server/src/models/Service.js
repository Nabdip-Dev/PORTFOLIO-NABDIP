import mongoose from "mongoose";
const { Schema, model } = mongoose;

const serviceSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    features: [{ type: String }],
    price: { type: Number }, // optional
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Service = model("Service", serviceSchema);
export default Service;
