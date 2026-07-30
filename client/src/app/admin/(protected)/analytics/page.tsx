"use client";

import { useQuery } from "@tanstack/react-query";
import { FiEye, FiUsers, FiTrendingUp } from "react-icons/fi";
import { fetchAnalyticsSummary, fetchLiveVisitorCount } from "@/services/api/analyticsService";

export default function AdminAnalyticsPage() {
  const { data: summary, isLoading } = useQuery({
    queryKey: ["admin-analytics-summary"],
    queryFn: () => fetchAnalyticsSummary(14),
  });
  const { data: liveCount } = useQuery({
    queryKey: ["admin-analytics-live"],
    queryFn: fetchLiveVisitorCount,
    refetchInterval: 15000, // poll every 15s for a "live" feel without a socket
  });

  const maxDayCount = summary ? Math.max(1, ...summary.byDay.map((d) => d.count)) : 1;

  return (
    <div>
      <h1 className="font-display text-xl font-semibold">Analytics</h1>
      <p className="mt-1 text-sm text-[var(--foreground-muted)]">
        Traffic over the last 14 days. Country data only populates when deployed behind
        Vercel or Cloudflare — plain Node hosting has no reliable GeoIP without a paid service.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-card glass p-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: "var(--gradient-accent)" }}>
            <FiUsers size={16} className="text-white" />
          </div>
          <div className="font-display mt-3 flex items-center gap-2 text-2xl font-semibold">
            {liveCount ?? "—"}
            {typeof liveCount === "number" && liveCount > 0 && (
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            )}
          </div>
          <div className="mt-1 text-xs text-[var(--foreground-muted)]">Live visitors right now</div>
        </div>
        <div className="rounded-card glass p-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: "var(--gradient-accent)" }}>
            <FiEye size={16} className="text-white" />
          </div>
          <div className="font-display mt-3 text-2xl font-semibold">{isLoading ? "—" : summary?.totalViews}</div>
          <div className="mt-1 text-xs text-[var(--foreground-muted)]">Pageviews (14 days)</div>
        </div>
        <div className="rounded-card glass p-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: "var(--gradient-accent)" }}>
            <FiTrendingUp size={16} className="text-white" />
          </div>
          <div className="font-display mt-3 text-2xl font-semibold">
            {isLoading ? "—" : summary?.topProjects[0]?.title ?? "—"}
          </div>
          <div className="mt-1 text-xs text-[var(--foreground-muted)]">Most-viewed project</div>
        </div>
      </div>

      <div className="mt-6 rounded-card glass p-6">
        <h2 className="font-display text-sm font-semibold">Pageviews per day</h2>
        {isLoading ? (
          <p className="mt-4 text-sm text-[var(--foreground-muted)]">Loading...</p>
        ) : (
          <div className="mt-4 flex items-end gap-1.5" style={{ height: 140 }}>
            {summary?.byDay.map((d) => (
              <div key={d.date} className="flex flex-1 flex-col items-center gap-1" title={`${d.date}: ${d.count}`}>
                <div
                  className="w-full rounded-t"
                  style={{
                    height: `${(d.count / maxDayCount) * 110}px`,
                    background: "var(--gradient-accent)",
                    minHeight: d.count > 0 ? 4 : 0,
                  }}
                />
                <span className="font-mono-tag text-[9px] text-[var(--foreground-muted)]">
                  {d.date.slice(5)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-card glass p-5">
          <h2 className="font-display text-sm font-semibold">Top pages</h2>
          <ul className="mt-3 space-y-2">
            {summary?.topPaths.map((p) => (
              <li key={p.path} className="flex justify-between text-sm">
                <span className="truncate text-[var(--foreground-muted)]">{p.path}</span>
                <span className="font-mono-tag">{p.count}</span>
              </li>
            ))}
            {!isLoading && summary?.topPaths.length === 0 && (
              <li className="text-sm text-[var(--foreground-muted)]">No data yet.</li>
            )}
          </ul>
        </div>
        <div className="rounded-card glass p-5">
          <h2 className="font-display text-sm font-semibold">Top projects by views</h2>
          <ul className="mt-3 space-y-2">
            {summary?.topProjects.map((p) => (
              <li key={p.slug} className="flex justify-between text-sm">
                <span className="truncate text-[var(--foreground-muted)]">{p.title}</span>
                <span className="font-mono-tag">{p.views}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
