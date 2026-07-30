import type { ReactNode } from "react";
import { AdminGuard } from "@/components/dashboard/AdminGuard";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";

// Everything under this route group requires an authenticated admin.
// /admin/login lives outside this group, so it renders without the guard
// or sidebar — otherwise a logged-out visitor would be redirect-looped.
export default function ProtectedAdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto p-6 sm:p-8">{children}</main>
      </div>
    </AdminGuard>
  );
}
