"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import { ADMIN_NAV_GROUPS } from "@/constants/adminNav";
import { useAuth } from "@/contexts/AuthContext";
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";

export function AdminSidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-[var(--border)] bg-[var(--surface)] p-4">
      <div className="mb-6 px-2">
        <span className="font-display text-lg font-semibold">
          Admin<span style={{ color: "var(--accent)" }}>.</span>
        </span>
        <p className="mt-0.5 truncate text-xs text-[var(--foreground-muted)]">{user?.email}</p>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto">
        {ADMIN_NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="mb-2 px-2 text-[10px] font-medium uppercase tracking-widest text-[var(--foreground-muted)]">
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded-lg px-2.5 py-2 text-sm transition-colors"
                      style={
                        isActive
                          ? { background: "var(--surface-elevated)", color: "var(--accent)" }
                          : { color: "var(--foreground-muted)" }
                      }
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="mt-4 flex items-center justify-between border-t border-[var(--border)] pt-4">
        <ThemeSwitcher />
        <button
          onClick={logout}
          className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--foreground-muted)] hover:bg-[var(--surface-elevated)] hover:text-red-400"
          aria-label="Logout"
        >
          <FiLogOut size={16} />
        </button>
      </div>
    </aside>
  );
}
