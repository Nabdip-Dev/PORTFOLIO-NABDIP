import { Router } from "express";
import rateLimit from "express-rate-limit";

import {
  register,
  login,
  googleAuth,
  verifyEmail,
  resendOtp,
  forgotPassword,
  resetPassword,
  refresh,
  logout,
  me,
  updateProfile,
  changePassword,
} from "../controllers/authController.js";
import { validate } from "../middlewares/validate.js";
import { requireAuth } from "../middlewares/auth.js";
import {
  registerSchema,
  loginSchema,
  verifyEmailSchema,
  resendOtpSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  googleAuthSchema,
} from "../validators/authValidators.js";
import { updateProfileSchema, changePasswordSchema } from "../validators/profileValidators.js";

const router = Router();

// Tighter limit on login/register to slow down credential-stuffing / brute force.
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many attempts, please try again later" },
});

// Stricter still for OTP/reset requests — these trigger an email send each time.
const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests, please try again later" },
});

router.post("/register", authLimiter, validate(registerSchema), register);
router.post("/login", authLimiter, validate(loginSchema), login);
router.post("/google", authLimiter, validate(googleAuthSchema), googleAuth);

router.post("/verify-email", otpLimiter, validate(verifyEmailSchema), verifyEmail);
router.post("/resend-otp", otpLimiter, validate(resendOtpSchema), resendOtp);

router.post("/forgot-password", otpLimiter, validate(forgotPasswordSchema), forgotPassword);
router.post("/reset-password", otpLimiter, validate(resetPasswordSchema), resetPassword);

router.post("/refresh", refresh);
router.post("/logout", requireAuth, logout);
router.get("/me", requireAuth, me);
router.patch("/me", requireAuth, validate(updateProfileSchema), updateProfile);
router.post("/change-password", requireAuth, validate(changePasswordSchema), changePassword);

export default router;
