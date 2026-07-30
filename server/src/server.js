import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import compression from "compression";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";

import { connectDB } from "./config/db.js";
import { initChatSocket } from "./sockets/chatSocket.js";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import experienceRoutes from "./routes/experienceRoutes.js";
import educationRoutes from "./routes/educationRoutes.js";
import socialLinkRoutes from "./routes/socialLinkRoutes.js";
import heroRoutes from "./routes/heroRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import themeRoutes from "./routes/themeRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import faqRoutes from "./routes/faqRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import pricingRoutes from "./routes/pricingRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import activityLogRoutes from "./routes/activityLogRoutes.js";

const app = express();
const server = http.createServer(app);

// --- Security & core middleware ---
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(compression());
app.use(mongoSanitize());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Global rate limit; stricter limits are applied per-route for sensitive
// endpoints (login, contact form, testimonial submission).
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", globalLimiter);

// --- Health check ---
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "API is running" });
});

// --- Public content + auth routes ---
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/social-links", socialLinkRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/theme", themeRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/pricing", pricingRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/activity-log", activityLogRoutes);

// Note: every route module above already gates its own admin-only mutations
// with requireAuth + requireRole("admin") internally, so there is no separate
// /api/admin/* prefix — the dashboard simply calls these same endpoints with
// its logged-in admin token.

// --- 404 handler ---
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// --- Global error handler ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

const PORT = process.env.PORT || 5000;

async function start() {
  await connectDB();
  initChatSocket(server);
  server.listen(PORT, () => {
    console.log(`[server] Listening on port ${PORT}`);
  });
}

start();

export { app, server };
