import { apiClient } from "./apiClient";
import type { ExperienceData } from "@/types/content";

export async function fetchExperience(): Promise<ExperienceData[]> {
  const { data } = await apiClient.get("/experience", { params: { limit: 50 } });
  return data.data;
}
