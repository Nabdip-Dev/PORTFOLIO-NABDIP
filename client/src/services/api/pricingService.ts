import { apiClient } from "./apiClient";
import type { PricingPlanData } from "@/types/content";

export async function fetchPricingPlans(): Promise<PricingPlanData[]> {
  const { data } = await apiClient.get("/pricing", { params: { limit: 20 } });
  return data.data;
}
