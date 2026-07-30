"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { useAuth } from "@/contexts/AuthContext";
import { forgotPassword } from "@/services/api/authService";
import { GoogleSignInButton } from "./GoogleSignInButton";

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});
const registerSchema = z.object({
  name: z.string().trim().min(2, "Name is too short"),
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().min(8, "At least 8 characters"),
});
const forgotSchema = z.object({ email: z.string().trim().email("Enter a valid email") });

type Mode = "login" | "register" | "forgot";

export function ChatAuthPanel() {
  const [mode, setMode] = useState<Mode>("login");
  const [forgotSent, setForgotSent] = useState(false);
  const { login, register: registerVisitor } = useAuth();

  const schema = mode === "login" ? loginSchema : mode === "register" ? registerSchema : forgotSchema;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<{ name?: string; email: string; password?: string }>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(values: { name?: string; email: string; password?: string }) {
    try {
      if (mode === "login") {
        await login(values.email, values.password!);
      } else if (mode === "register") {
        await registerVisitor(values.name ?? "", values.email, values.password!);
        toast.success("Account created — check your email for a verification code.");
      } else {
        await forgotPassword(values.email);
        setForgotSent(true);
      }
      reset();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong. Please try again.");
    }
  }

  if (mode === "forgot") {
    return (
      <div className="flex h-full flex-col justify-center p-6">
        {forgotSent ? (
          <p className="text-center text-sm text-[var(--foreground-muted)]">
            If an account exists for that email, a reset link has been sent. Check your inbox.
          </p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <p className="mb-2 text-center text-xs text-[var(--foreground-muted)]">
              Enter your email and we&apos;ll send a password reset link.
            </p>
            <div>
              <input
                {...register("email")}
                placeholder="Email"
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm outline-none focus:border-[var(--accent)]"
              />
              {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full px-4 py-2.5 text-sm font-medium text-[var(--accent-foreground)] disabled:opacity-60"
              style={{ background: "var(--gradient-accent)" }}
            >
              Send reset link
            </button>
          </form>
        )}
        <button
          type="button"
          onClick={() => {
            setMode("login");
            setForgotSent(false);
          }}
          className="mt-4 text-center text-xs text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
        >
          Back to login
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col justify-center p-6">
      <p className="mb-4 text-center text-xs text-[var(--foreground-muted)]">
        Chat is the only part of this site that needs an account — everything else stays public.
      </p>

      <GoogleSignInButton />

      <div className="my-4 flex items-center gap-3">
        <div className="h-px flex-1 bg-[var(--border)]" />
        <span className="text-[10px] uppercase tracking-widest text-[var(--foreground-muted)]">or</span>
        <div className="h-px flex-1 bg-[var(--border)]" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {mode === "register" && (
          <div>
            <input
              {...register("name")}
              placeholder="Your name"
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm outline-none focus:border-[var(--accent)]"
            />
            {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
          </div>
        )}
        <div>
          <input
            {...register("email")}
            placeholder="Email"
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm outline-none focus:border-[var(--accent)]"
          />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
        </div>
        <div>
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm outline-none focus:border-[var(--accent)]"
          />
          {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>}
        </div>

        {mode === "login" && (
          <button
            type="button"
            onClick={() => setMode("forgot")}
            className="block text-right text-xs text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
          >
            Forgot password?
          </button>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full px-4 py-2.5 text-sm font-medium text-[var(--accent-foreground)] transition-transform hover:scale-[1.02] disabled:opacity-60"
          style={{ background: "var(--gradient-accent)" }}
        >
          {mode === "login" ? "Log in" : "Create account"}
        </button>
      </form>

      <button
        type="button"
        onClick={() => setMode(mode === "login" ? "register" : "login")}
        className="mt-4 text-center text-xs text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
      >
        {mode === "login" ? "New here? Create an account" : "Already have an account? Log in"}
      </button>
    </div>
  );
}
