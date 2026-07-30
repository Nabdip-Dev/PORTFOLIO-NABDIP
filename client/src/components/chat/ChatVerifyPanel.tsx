"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/contexts/AuthContext";
import { verifyEmail, resendOtp } from "@/services/api/authService";

/**
 * Shown once someone is logged in but hasn't verified their email yet —
 * blocks the actual ChatWindow from mounting, matching the backend's
 * requireVerifiedEmail gate on both the REST history endpoint and the
 * Socket.IO handshake.
 */
export function ChatVerifyPanel() {
  const { user, refreshUser, logout } = useAuth();
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  async function handleVerify() {
    if (!user || otp.length !== 6) return;
    setIsSubmitting(true);
    try {
      await verifyEmail(user.email, otp);
      await refreshUser();
      toast.success("Email verified — welcome!");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Invalid or expired code");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleResend() {
    if (!user) return;
    setIsResending(true);
    try {
      await resendOtp(user.email);
      toast.success("A new code has been sent");
    } catch {
      toast.error("Failed to resend code");
    } finally {
      setIsResending(false);
    }
  }

  return (
    <div className="flex h-full flex-col items-center justify-center p-6 text-center">
      <p className="text-sm font-medium">Verify your email</p>
      <p className="mt-1 text-xs text-[var(--foreground-muted)]">
        We sent a 6-digit code to <span className="font-medium">{user?.email}</span>. Enter it below to
        start chatting.
      </p>

      <input
        value={otp}
        onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
        placeholder="000000"
        inputMode="numeric"
        className="font-mono-tag mt-5 w-32 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-center text-lg tracking-widest outline-none focus:border-[var(--accent)]"
      />

      <button
        type="button"
        onClick={handleVerify}
        disabled={otp.length !== 6 || isSubmitting}
        className="mt-4 w-40 rounded-full px-4 py-2.5 text-sm font-medium text-[var(--accent-foreground)] disabled:opacity-60"
        style={{ background: "var(--gradient-accent)" }}
      >
        {isSubmitting ? "Verifying..." : "Verify"}
      </button>

      <div className="mt-4 flex items-center gap-4 text-xs text-[var(--foreground-muted)]">
        <button type="button" onClick={handleResend} disabled={isResending} className="hover:text-[var(--foreground)]">
          {isResending ? "Sending..." : "Resend code"}
        </button>
        <button type="button" onClick={logout} className="hover:text-[var(--foreground)]">
          Log out
        </button>
      </div>
    </div>
  );
}
