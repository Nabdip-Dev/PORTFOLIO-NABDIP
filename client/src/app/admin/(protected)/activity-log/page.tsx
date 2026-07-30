"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchActivityLog } from "@/services/api/activityLogService";

const ACTION_COLORS: Record<string, string> = {
  create: "#22c55e",
  update: "#3b82f6",
  delete: "#ef4444",
  approve: "#22c55e",
  reject: "#ef4444",
};

function formatTime(iso: string) {
  return new Date(iso).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

export default function AdminActivityLogPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery({ queryKey: ["activity-log", page], queryFn: () => fetchActivityLog(page) });

  return (
    <div>
      <h1 className="font-display text-xl font-semibold">Activity Log</h1>
      <p className="mt-1 text-sm text-[var(--foreground-muted)]">
        Every admin content change, automatically recorded.
      </p>

      <div className="mt-6 overflow-hidden rounded-card glass">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] text-xs text-[var(--foreground-muted)]">
              <th className="px-4 py-3 font-medium">Admin</th>
              <th className="px-4 py-3 font-medium">Action</th>
              <th className="px-4 py-3 font-medium">Resource</th>
              <th className="px-4 py-3 font-medium">When</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-[var(--foreground-muted)]">Loading...</td>
              </tr>
            ) : data?.data.length ? (
              data.data.map((entry) => (
                <tr key={entry._id} className="border-b border-[var(--border)] last:border-0">
                  <td className="px-4 py-3">{entry.admin?.name ?? "—"}</td>
                  <td className="px-4 py-3">
                    <span
                      className="rounded-full px-2 py-0.5 text-xs font-medium capitalize"
                      style={{ background: "var(--surface-elevated)", color: ACTION_COLORS[entry.action] ?? "var(--foreground-muted)" }}
                    >
                      {entry.action}
                    </span>
                  </td>
                  <td className="px-4 py-3">{entry.resource}</td>
                  <td className="px-4 py-3 text-[var(--foreground-muted)]">{formatTime(entry.createdAt)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-[var(--foreground-muted)]">No activity yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {data && data.pagination.pages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {Array.from({ length: data.pagination.pages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium"
              style={
                page === i + 1
                  ? { background: "var(--gradient-accent)", color: "var(--accent-foreground)" }
                  : { background: "var(--surface-elevated)", color: "var(--foreground-muted)" }
              }
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
