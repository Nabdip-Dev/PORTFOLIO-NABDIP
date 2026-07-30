import { apiClient } from "./apiClient";
import type { AboutData } from "@/types/content";

export async function fetchAbout(): Promise<AboutData> {
  const { data } = await apiClient.get("/about");
  return data.data;
}
