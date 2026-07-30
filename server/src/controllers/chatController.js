import { Chat } from "../models/Chat.js";
import { User } from "../models/User.js";

/** Visitor: fetch (or lazily create, atomically) their own chat history. */
export async function getMyChat(req, res, next) {
  try {
    const chat = await Chat.findOneAndUpdate(
      { visitor: req.user._id },
      { $setOnInsert: { visitor: req.user._id, messages: [] } },
      { upsert: true, new: true }
    );
    res.json({ success: true, data: chat });
  } catch (err) {
    next(err);
  }
}

/** Admin: list all conversations, most recently active first. */
export async function getAllChats(req, res, next) {
  try {
    const chats = await Chat.find()
      .sort("-lastMessageAt")
      .populate("visitor", "name email avatar isOnline lastSeen");
    res.json({ success: true, data: chats });
  } catch (err) {
    next(err);
  }
}

/** Admin: fetch a single conversation by id. */
export async function getChatById(req, res, next) {
  try {
    const chat = await Chat.findById(req.params.id).populate(
      "visitor",
      "name email avatar isOnline lastSeen"
    );
    if (!chat) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: chat });
  } catch (err) {
    next(err);
  }
}
