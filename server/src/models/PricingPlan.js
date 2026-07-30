import mongoose from "mongoose";
const { Schema, model } = mongoose;

const pricingFeatureSchema = new Schema(
  { text: String, included: { type: Boolean, default: true } },
  { _id: false }
);

const pricingPlanSchema = new Schema(
  {
    name: { type: String, required: true, trim: true }, // "Basic" | "Standard" | "Premium" etc.
    price: { type: Number, required: true },
    billingPeriod: { type: String, default: "project" }, // e.g. "project", "month"
    description: { type: String },
    features: [pricingFeatureSchema],
    highlighted: { type: Boolean, default: false }, // visually emphasized as "Most Popular"
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const PricingPlan = model("PricingPlan", pricingPlanSchema);
export default PricingPlan;
