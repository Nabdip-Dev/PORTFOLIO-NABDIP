import { apiClient } from "./apiClient";
import type { FaqData } from "@/types/content";

export async function fetchFaqs(): Promise<FaqData[]> {
  const { data } = await apiClient.get("/faqs", { params: { limit: 100 } });
  return data.data;
}
