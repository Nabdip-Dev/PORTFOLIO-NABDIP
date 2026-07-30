import { Server } from "socket.io";
import { verifyAccessToken } from "../utils/tokens.js";
import { User } from "../models/User.js";
import { Chat } from "../models/Chat.js";

/**
 * Wires up Socket.IO for the Messenger-style chat. Attaches to the same
 * HTTP server as Express. Every socket must present a valid access token
 * (chat is the one feature on the site that requires login).
 */
export function initChatSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: { origin: process.env.CLIENT_URL || "http://localhost:3000", credentials: true },
  });

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) return next(new Error("Not authenticated"));
      const payload = verifyAccessToken(token);
      const user = await User.findById(payload.sub);
      if (!user) return next(new Error("User no longer exists"));
      if (user.role !== "admin" && !user.isEmailVerified) {
        return next(new Error("EMAIL_NOT_VERIFIED"));
      }
      socket.user = user;
      next();
    } catch (err) {
      next(new Error("Invalid or expired token"));
    }
  });

  io.on("connection", async (socket) => {
    const { user } = socket;

    // Admin joins a broadcast room to receive every visitor's messages;
    // visitors join a room scoped to their own chat thread only.
    if (user.role === "admin") {
      socket.join("admin-room");
    } else {
      socket.join(`chat:${user._id}`);
    }

    user.isOnline = true;
    await user.save();
    io.emit("presence:update", { userId: user._id, isOnline: true });

    socket.on("chat:message", async ({ chatId, visitorId, text, image }) => {
      try {
        let chat;

        if (user.role === "admin") {
          // Admin must specify which visitor they're replying to. If a chatId
          // is also given, verify it actually belongs to that visitor before
          // writing to it — never trust a client-supplied id blindly.
          if (!visitorId) {
            return socket.emit("chat:error", { message: "visitorId is required" });
          }
          if (chatId) {
            chat = await Chat.findById(chatId);
            if (chat && String(chat.visitor) !== String(visitorId)) {
              return socket.emit("chat:error", { message: "Chat does not belong to that visitor" });
            }
          }
          if (!chat) {
            chat = await Chat.findOneAndUpdate(
              { visitor: visitorId },
              { $setOnInsert: { visitor: visitorId, messages: [] } },
              { upsert: true, new: true }
            );
          }
        } else {
          // Visitors can only ever write to their own conversation. Any
          // chatId they send is ignored — it is resolved server-side from
          // the authenticated socket's user id, not from client input.
          // Upsert is atomic, so two near-simultaneous first messages from
          // the same new visitor can never create two separate chat docs.
          chat = await Chat.findOneAndUpdate(
            { visitor: user._id },
            { $setOnInsert: { visitor: user._id, messages: [] } },
            { upsert: true, new: true }
          );
        }

        const targetVisitorId = user.role === "admin" ? visitorId : user._id;

        const message = { sender: user._id, text, image, seen: false };
        chat.messages.push(message);
        chat.lastMessageAt = new Date();
        await chat.save();

        const payload = {
          chatId: chat._id,
          message: chat.messages[chat.messages.length - 1],
        };

        io.to(`chat:${targetVisitorId}`).emit("chat:message", payload);
        io.to("admin-room").emit("chat:message", payload);
      } catch (err) {
        socket.emit("chat:error", { message: "Failed to send message" });
      }
    });

    socket.on("chat:typing", ({ visitorId, isTyping }) => {
      const room = user.role === "admin" ? `chat:${visitorId}` : "admin-room";
      socket.to(room).emit("chat:typing", { userId: user._id, isTyping });
    });

    socket.on("chat:seen", async ({ chatId, visitorId }) => {
      try {
        // Same rule as chat:message — a visitor can only mark their own
        // conversation as seen, never an arbitrary chatId they happen to send.
        const chat =
          user.role === "admin"
            ? await Chat.findById(chatId)
            : await Chat.findOne({ visitor: user._id });

        if (!chat) return;
        if (user.role !== "admin" && String(chat.visitor) !== String(user._id)) return;

        await Chat.updateOne(
          { _id: chat._id },
          { $set: { "messages.$[elem].seen": true, "messages.$[elem].seenAt": new Date() } },
          { arrayFilters: [{ "elem.sender": { $ne: user._id } }] }
        );

        const room = user.role === "admin" ? `chat:${visitorId ?? chat.visitor}` : "admin-room";
        io.to(room).emit("chat:seen", { chatId: chat._id, by: user._id });
      } catch (err) {
        socket.emit("chat:error", { message: "Failed to mark as seen" });
      }
    });

    socket.on("disconnect", async () => {
      user.isOnline = false;
      user.lastSeen = new Date();
      await user.save();
      io.emit("presence:update", { userId: user._id, isOnline: false, lastSeen: user.lastSeen });
    });
  });

  return io;
}
