import { apiClient } from "./apiClient";
import type { ServiceData } from "@/types/content";

export async function fetchServices(): Promise<ServiceData[]> {
  const { data } = await apiClient.get("/services", { params: { limit: 100 } });
  return data.data;
}
