import mongoose from "mongoose";
const { Schema, model } = mongoose;

const faqSchema = new Schema(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true },
    category: { type: String, default: "general", index: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Faq = model("Faq", faqSchema);
export default Faq;
