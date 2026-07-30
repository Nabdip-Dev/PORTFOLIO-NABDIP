"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { resetPassword } from "@/services/api/authService";

const schema = z
  .object({
    newPassword: z.string().min(8, "At least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
type FormValues = z.infer<typeof schema>;

// This is the one page on the entire site that isn't the chat modal — a
// password-reset link arrives by email and opens directly in the browser,
// so it can't live inside a modal the way login/register do.
function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [done, setDone] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    if (!token) return;
    try {
      await resetPassword(token, values.newPassword);
      setDone(true);
      toast.success("Password reset — you can now log in via chat.");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "This reset link is invalid or has expired.");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-6 text-[var(--foreground)]">
      <div className="w-full max-w-sm rounded-card glass p-8">
        <h1 className="font-display text-xl font-semibold">Reset password</h1>

        {!token ? (
          <p className="mt-4 text-sm text-[var(--foreground-muted)]">
            This link is missing its reset token. Please use the link from your email exactly as sent.
          </p>
        ) : done ? (
          <div className="mt-4">
            <p className="text-sm text-[var(--foreground-muted)]">Your password has been updated.</p>
            <button
              onClick={() => router.push("/")}
              className="mt-4 w-full rounded-full px-4 py-2.5 text-sm font-medium text-[var(--accent-foreground)]"
              style={{ background: "var(--gradient-accent)" }}
            >
              Back to site
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <div>
              <input
                {...register("newPassword")}
                type="password"
                placeholder="New password"
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm outline-none focus:border-[var(--accent)]"
              />
              {errors.newPassword && <p className="mt-1 text-xs text-red-400">{errors.newPassword.message}</p>}
            </div>
            <div>
              <input
                {...register("confirmPassword")}
                type="password"
                placeholder="Confirm new password"
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm outline-none focus:border-[var(--accent)]"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-400">{errors.confirmPassword.message}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full px-4 py-2.5 text-sm font-medium text-[var(--accent-foreground)] disabled:opacity-60"
              style={{ background: "var(--gradient-accent)" }}
            >
              {isSubmitting ? "Resetting..." : "Reset password"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  );
}
