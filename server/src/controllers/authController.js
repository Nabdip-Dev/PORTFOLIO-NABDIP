import { OAuth2Client } from "google-auth-library";
import { User } from "../models/User.js";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/tokens.js";
import { generateOTP, hashOTP, generateResetToken, hashResetToken } from "../utils/otp.js";
import { sendVerificationEmail, sendPasswordResetEmail } from "../utils/mailer.js";

const REFRESH_COOKIE_NAME = "portfolio_refresh_token";
const OTP_TTL_MS = 10 * 60 * 1000; // 10 minutes
const RESET_TOKEN_TTL_MS = 30 * 60 * 1000; // 30 minutes

const refreshCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/api/auth",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days, matches JWT_REFRESH_EXPIRES_IN default
};

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function issueOTP(user) {
  const { otp, hash } = generateOTP();
  user.emailVerificationOTPHash = hash;
  user.emailVerificationOTPExpires = new Date(Date.now() + OTP_TTL_MS);
  await user.save();
  await sendVerificationEmail(user.email, otp);
}

/**
 * Registers a new user. Public visitors register here only when they click
 * "Chat" — this is never a site-wide login. Role always defaults to "visitor";
 * the admin account is seeded separately, not created through this endpoint.
 * The account is created immediately (so tokens are issued and the modal can
 * close), but chat access itself is gated on isEmailVerified elsewhere.
 */
export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ success: false, message: "Email is already registered" });
    }

    const user = await User.create({ name, email, password, role: "visitor", authProvider: "local" });
    await issueOTP(user);

    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);

    res.cookie(REFRESH_COOKIE_NAME, refreshToken, refreshCookieOptions);
    res.status(201).json({ success: true, accessToken, user: user.toSafeJSON() });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);

    user.isOnline = true;
    user.lastSeen = new Date();
    await user.save();

    res.cookie(REFRESH_COOKIE_NAME, refreshToken, refreshCookieOptions);
    res.json({ success: true, accessToken, user: user.toSafeJSON() });
  } catch (err) {
    next(err);
  }
}

/**
 * "Continue with Google" — verifies the ID token issued by Google Identity
 * Services on the frontend (no server-side redirect flow, so this fits the
 * modal UI). Google has already verified the email, so these accounts start
 * as isEmailVerified: true and skip the OTP step entirely.
 */
export async function googleAuth(req, res, next) {
  try {
    const { idToken } = req.body;

    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload?.email) {
      return res.status(401).json({ success: false, message: "Invalid Google token" });
    }

    let user = await User.findOne({ $or: [{ googleId: payload.sub }, { email: payload.email }] });

    if (!user) {
      user = await User.create({
        name: payload.name || payload.email.split("@")[0],
        email: payload.email,
        googleId: payload.sub,
        authProvider: "google",
        isEmailVerified: true,
        role: "visitor",
        avatar: payload.picture ? { url: payload.picture } : undefined,
      });
    } else if (!user.googleId) {
      // An existing local account signing in with Google for the first time —
      // link the accounts rather than creating a duplicate.
      user.googleId = payload.sub;
      user.isEmailVerified = true;
      await user.save();
    }

    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);

    user.isOnline = true;
    user.lastSeen = new Date();
    await user.save();

    res.cookie(REFRESH_COOKIE_NAME, refreshToken, refreshCookieOptions);
    res.json({ success: true, accessToken, user: user.toSafeJSON() });
  } catch (err) {
    return res.status(401).json({ success: false, message: "Google sign-in failed" });
  }
}

/** Verifies the 6-digit OTP emailed on registration. Chat access is blocked until this succeeds. */
export async function verifyEmail(req, res, next) {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email }).select(
      "+emailVerificationOTPHash +emailVerificationOTPExpires"
    );
    if (!user) return res.status(404).json({ success: false, message: "Account not found" });
    if (user.isEmailVerified) {
      return res.json({ success: true, message: "Email already verified" });
    }

    const expired = !user.emailVerificationOTPExpires || user.emailVerificationOTPExpires < new Date();
    const matches = user.emailVerificationOTPHash === hashOTP(otp);

    if (expired || !matches) {
      return res.status(400).json({ success: false, message: "Invalid or expired code" });
    }

    user.isEmailVerified = true;
    user.emailVerificationOTPHash = undefined;
    user.emailVerificationOTPExpires = undefined;
    await user.save();

    res.json({ success: true, message: "Email verified" });
  } catch (err) {
    next(err);
  }
}

export async function resendOtp(req, res, next) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "Account not found" });
    if (user.isEmailVerified) {
      return res.json({ success: true, message: "Email already verified" });
    }
    await issueOTP(user);
    res.json({ success: true, message: "Verification code resent" });
  } catch (err) {
    next(err);
  }
}

/** Always responds with the same generic message, whether or not the email
 * exists — prevents leaking which addresses are registered. */
export async function forgotPassword(req, res, next) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email, authProvider: "local" });

    if (user) {
      const { token, hash } = generateResetToken();
      user.passwordResetTokenHash = hash;
      user.passwordResetExpires = new Date(Date.now() + RESET_TOKEN_TTL_MS);
      await user.save();

      const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";
      await sendPasswordResetEmail(user.email, `${clientUrl}/reset-password?token=${token}`);
    }

    res.json({
      success: true,
      message: "If an account exists for that email, a reset link has been sent.",
    });
  } catch (err) {
    next(err);
  }
}

export async function resetPassword(req, res, next) {
  try {
    const { token, newPassword } = req.body;
    const hash = hashResetToken(token);

    const user = await User.findOne({
      passwordResetTokenHash: hash,
      passwordResetExpires: { $gt: new Date() },
    }).select("+passwordResetTokenHash +passwordResetExpires");

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or expired reset link" });
    }

    user.password = newPassword;
    user.passwordResetTokenHash = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.json({ success: true, message: "Password reset — you can now log in" });
  } catch (err) {
    next(err);
  }
}

/**
 * Issues a new access token from the refresh token cookie, so the client
 * can silently re-authenticate without asking the user to log in again.
 */
export async function refresh(req, res, next) {
  try {
    const token = req.cookies?.[REFRESH_COOKIE_NAME];
    if (!token) {
      return res.status(401).json({ success: false, message: "No refresh token provided" });
    }

    const payload = verifyRefreshToken(token);
    const user = await User.findById(payload.sub);
    if (!user) {
      return res.status(401).json({ success: false, message: "User no longer exists" });
    }

    const accessToken = signAccessToken(user);
    res.json({ success: true, accessToken });
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired refresh token" });
  }
}

export async function logout(req, res, next) {
  try {
    if (req.user) {
      req.user.isOnline = false;
      req.user.lastSeen = new Date();
      await req.user.save();
    }
    res.clearCookie(REFRESH_COOKIE_NAME, { path: "/api/auth" });
    res.json({ success: true, message: "Logged out" });
  } catch (err) {
    next(err);
  }
}

/** Returns the currently authenticated user (used to hydrate client state on load). */
export async function me(req, res) {
  res.json({ success: true, user: req.user.toSafeJSON() });
}

/** Admin: update own profile (name / avatar). Email changes are intentionally excluded
 * here to avoid silently breaking login without re-verification. */
export async function updateProfile(req, res, next) {
  try {
    const { name, avatar } = req.body;
    const updates = {};
    if (name) updates.name = name;
    if (avatar) updates.avatar = avatar;

    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true });
    res.json({ success: true, user: user.toSafeJSON() });
  } catch (err) {
    next(err);
  }
}

/** Admin: change password — requires the current password to confirm identity. */
export async function changePassword(req, res, next) {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id).select("+password");

    if (!(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ success: false, message: "Current password is incorrect" });
    }

    user.password = newPassword;
    await user.save();
    res.json({ success: true, message: "Password updated" });
  } catch (err) {
    next(err);
  }
}
