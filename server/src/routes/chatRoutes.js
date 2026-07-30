import { Router } from "express";
import { getMyChat, getAllChats, getChatById } from "../controllers/chatController.js";
import { requireAuth, requireRole, requireVerifiedEmail } from "../middlewares/auth.js";

const router = Router();

// Note: actual message sending happens over Socket.IO (see sockets/chatSocket.js).
// These REST routes only serve chat history for hydrating the UI on load.
// requireVerifiedEmail blocks unverified visitors from chat, per spec.
router.get("/me", requireAuth, requireVerifiedEmail, getMyChat);
router.get("/", requireAuth, requireRole("admin"), getAllChats);
router.get("/:id", requireAuth, requireRole("admin"), getChatById);

export default router;
