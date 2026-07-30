import { apiClient } from "./apiClient";
import type { EducationData } from "@/types/content";

export async function fetchEducation(): Promise<EducationData[]> {
  const { data } = await apiClient.get("/education", { params: { limit: 50 } });
  return data.data;
}
