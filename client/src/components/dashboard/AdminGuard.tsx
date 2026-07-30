"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Wraps every /admin page. Redirects to /admin/login if the visitor isn't
 * an authenticated admin — this is the actual security boundary on the
 * client; the real enforcement is server-side (requireRole("admin")) on
 * every mutating request, this just keeps non-admins off the UI.
 */
export function AdminGuard({ children }: { children: ReactNode }) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== "admin")) {
      router.replace("/admin/login");
    }
  }, [isLoading, isAuthenticated, user, router]);

  if (isLoading || !isAuthenticated || user?.role !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--background)] text-sm text-[var(--foreground-muted)]">
        Checking access...
      </div>
    );
  }

  return <>{children}</>;
}
