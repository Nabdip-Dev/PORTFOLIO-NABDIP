import crypto from "crypto";

/** Generates a 6-digit numeric OTP and its SHA-256 hash for storage.
 * The plaintext OTP is only ever emailed, never persisted. */
export function generateOTP() {
  const otp = crypto.randomInt(100000, 999999).toString();
  const hash = crypto.createHash("sha256").update(otp).digest("hex");
  return { otp, hash };
}

export function hashOTP(otp) {
  return crypto.createHash("sha256").update(otp).digest("hex");
}

/** Generates a random reset token (sent in the email link) and its hash
 * (stored in the DB) — same pattern as OTP, so the raw token is never persisted. */
export function generateResetToken() {
  const token = crypto.randomBytes(32).toString("hex");
  const hash = crypto.createHash("sha256").update(token).digest("hex");
  return { token, hash };
}

export function hashResetToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}
