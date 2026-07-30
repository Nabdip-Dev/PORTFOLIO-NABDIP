"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { useAuth } from "@/contexts/AuthContext";

const schema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});
type FormValues = z.infer<typeof schema>;

export default function AdminLoginPage() {
  const { login, user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  // Already-logged-in admins skip straight to the dashboard.
  useEffect(() => {
    if (!isLoading && isAuthenticated && user?.role === "admin") {
      router.replace("/admin");
    }
  }, [isLoading, isAuthenticated, user, router]);

  async function onSubmit(values: FormValues) {
    try {
      await login(values.email, values.password);
      router.replace("/admin");
    } catch (err: any) {
      const message = err?.response?.data?.message;
      if (err?.response?.status === 401) {
        toast.error("Invalid email or password");
      } else {
        toast.error(message || "Login failed");
      }
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-6 text-[var(--foreground)]">
      <div className="w-full max-w-sm rounded-card glass p-8">
        <h1 className="font-display text-xl font-semibold">Admin sign in</h1>
        <p className="mt-1 text-sm text-[var(--foreground-muted)]">
          This page is intentionally not linked from the public site.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
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
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full px-4 py-2.5 text-sm font-medium text-[var(--accent-foreground)] disabled:opacity-60"
            style={{ background: "var(--gradient-accent)" }}
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
