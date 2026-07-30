import mongoose from "mongoose";
const { Schema, model } = mongoose;

// One document per conversation between a visitor and the admin.
const chatMessageSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, maxlength: 2000 },
    image: { url: String, publicId: String },
    seen: { type: Boolean, default: false },
    seenAt: { type: Date },
  },
  { timestamps: true }
);

const chatSchema = new Schema(
  {
    visitor: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    messages: [chatMessageSchema],
    lastMessageAt: { type: Date, default: Date.now, index: true },
  },
  { timestamps: true }
);

export const Chat = model("Chat", chatSchema);
export default Chat;
