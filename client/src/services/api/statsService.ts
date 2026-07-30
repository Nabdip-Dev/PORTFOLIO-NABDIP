import { apiClient } from "./apiClient";

export interface OverviewStats {
  totalProjects: number;
  pendingTestimonials: number;
  unreadMessages: number;
  totalChats: number;
  totalProjectViews: number;
}

export async function fetchOverviewStats(): Promise<OverviewStats> {
  const { data } = await apiClient.get("/stats/overview");
  return data.data;
}
