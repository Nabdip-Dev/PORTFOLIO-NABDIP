import mongoose from "mongoose";
const { Schema, model } = mongoose;

const testimonialSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    country: { type: String, trim: true },
    company: { type: String, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, maxlength: 1000 },
    photo: { url: String, publicId: String },
    approved: { type: Boolean, default: false, index: true }, // admin must approve
    // Basic spam protection fields
    ipHash: { type: String, select: false },
    honeypot: { type: String, select: false }, // should always be empty; filled = bot
  },
  { timestamps: true }
);

export const Testimonial = model("Testimonial", testimonialSchema);
export default Testimonial;
