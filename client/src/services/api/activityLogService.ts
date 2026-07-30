import { apiClient } from "./apiClient";

export interface ActivityLogEntry {
  _id: string;
  admin: { name: string; email: string } | null;
  action: string;
  resource: string;
  resourceId?: string;
  createdAt: string;
}

export async function fetchActivityLog(page = 1): Promise<{ data: ActivityLogEntry[]; pagination: { pages: number } }> {
  const { data } = await apiClient.get("/activity-log", { params: { page, limit: 30 } });
  return data;
}
