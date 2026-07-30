import mongoose from "mongoose";
const { Schema, model } = mongoose;

// Contact form submissions (not chat — see Chat.js for that)
const messageSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true, maxlength: 5000 },
    read: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

export const Message = model("Message", messageSchema);
export default Message;
