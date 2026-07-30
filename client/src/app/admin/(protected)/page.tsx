"use client";

import { useQuery } from "@tanstack/react-query";
import { FiFolder, FiStar, FiMail, FiMessageCircle, FiEye } from "react-icons/fi";
import { fetchOverviewStats } from "@/services/api/statsService";

const CARDS = [
  { key: "totalProjects", label: "Projects", icon: FiFolder },
  { key: "pendingTestimonials", label: "Pending reviews", icon: FiStar },
  { key: "unreadMessages", label: "Unread messages", icon: FiMail },
  { key: "totalChats", label: "Chat conversations", icon: FiMessageCircle },
  { key: "totalProjectViews", label: "Total project views", icon: FiEye },
] as const;

export default function AdminOverviewPage() {
  const { data: stats, isLoading } = useQuery({ queryKey: ["admin-stats"], queryFn: fetchOverviewStats });

  return (
    <div>
      <h1 className="font-display text-xl font-semibold">Overview</h1>
      <p className="mt-1 text-sm text-[var(--foreground-muted)]">A snapshot of your site right now.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map(({ key, label, icon: Icon }) => (
          <div key={key} className="rounded-card glass p-5">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl"
              style={{ background: "var(--gradient-accent)" }}
            >
              <Icon size={16} className="text-white" />
            </div>
            <div className="font-display mt-3 text-2xl font-semibold">
              {isLoading || !stats ? "—" : (stats as any)[key]}
            </div>
            <div className="mt-1 text-xs text-[var(--foreground-muted)]">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
