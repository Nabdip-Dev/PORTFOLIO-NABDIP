import { apiClient } from "./apiClient";
import type { SkillData } from "@/types/content";

export async function fetchSkills(): Promise<SkillData[]> {
  const { data } = await apiClient.get("/skills", { params: { limit: 100 } });
  return data.data;
}
