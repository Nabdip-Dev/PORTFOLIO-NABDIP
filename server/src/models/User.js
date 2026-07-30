import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema, model } = mongoose;

/**
 * Users collection covers two purposes:
 *  - the single admin account that owns the dashboard
 *  - visitors who register only to use the live chat (no login required
 *    anywhere else on the site)
 */
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
    },
    password: {
      type: String,
      // Only required for local (email/password) accounts — Google-authenticated
      // users never set one, since Google already verified their identity.
      required: [
        function passwordRequired() {
          return this.authProvider === "local";
        },
        "Password is required",
      ],
      minlength: 8,
      select: false, // never returned by default in queries
    },
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // allows many docs with no googleId at all
      select: false,
    },
    role: {
      type: String,
      enum: ["admin", "visitor"],
      default: "visitor",
    },
    avatar: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" }, // Cloudinary public_id, for deletion
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    lastSeen: {
      type: Date,
      default: Date.now,
    },
    refreshTokenHash: {
      type: String,
      select: false,
    },

    // --- Email verification (required before chat access) ---
    isEmailVerified: { type: Boolean, default: false },
    emailVerificationOTPHash: { type: String, select: false },
    emailVerificationOTPExpires: { type: Date, select: false },

    // --- Password reset ---
    passwordResetTokenHash: { type: String, select: false },
    passwordResetExpires: { type: Date, select: false },
  },
  { timestamps: true }
);

userSchema.index({ role: 1 });

// Hash password before saving, only if it was modified
userSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("password") || !this.password) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Instance method to compare a plaintext password against the stored hash
userSchema.methods.comparePassword = function comparePassword(candidate) {
  if (!this.password) return Promise.resolve(false); // Google-only account
  return bcrypt.compare(candidate, this.password);
};

// Never leak sensitive fields even if select() is misused elsewhere
userSchema.methods.toSafeJSON = function toSafeJSON() {
  const obj = this.toObject();
  delete obj.password;
  delete obj.refreshTokenHash;
  delete obj.googleId;
  delete obj.emailVerificationOTPHash;
  delete obj.emailVerificationOTPExpires;
  delete obj.passwordResetTokenHash;
  delete obj.passwordResetExpires;
  delete obj.__v;
  return obj;
};

export const User = model("User", userSchema);
export default User;
