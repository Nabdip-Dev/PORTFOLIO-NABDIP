import { apiClient } from "./apiClient";
import type { ProjectData, PaginatedResponse } from "@/types/content";

export interface ProjectQuery {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}

export async function fetchProjects(query: ProjectQuery = {}): Promise<PaginatedResponse<ProjectData>> {
  const { data } = await apiClient.get("/projects", { params: query });
  return data;
}

export async function fetchProjectBySlug(slug: string): Promise<ProjectData> {
  const { data } = await apiClient.get(`/projects/${slug}`);
  return data.data;
}
