import { apiClient } from "./apiClient";

export async function trackPageView(path: string, referrer?: string): Promise<void> {
  try {
    await apiClient.post("/analytics/pageview", { path, referrer });
  } catch {
    // Never let analytics failures affect the visitor's experience.
  }
}

export async function sendHeartbeat(sessionId: string): Promise<void> {
  try {
    await apiClient.post("/analytics/heartbeat", { sessionId });
  } catch {
    // Same — silent no-op on failure.
  }
}

export interface AnalyticsSummary {
  byDay: { date: string; count: number }[];
  topPaths: { path: string; count: number }[];
  topProjects: { title: string; views: number; slug: string }[];
  totalViews: number;
}

export async function fetchAnalyticsSummary(days = 14): Promise<AnalyticsSummary> {
  const { data } = await apiClient.get("/analytics/summary", { params: { days } });
  return data.data;
}

export async function fetchLiveVisitorCount(): Promise<number> {
  const { data } = await apiClient.get("/analytics/live");
  return data.data.liveVisitors;
}
