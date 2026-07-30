import { apiClient } from "./apiClient";
import type { HeroData } from "@/types/hero";

export async function fetchHero(): Promise<HeroData> {
  const { data } = await apiClient.get("/hero");
  return data.data;
}
