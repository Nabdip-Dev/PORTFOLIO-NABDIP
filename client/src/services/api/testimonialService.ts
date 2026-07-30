import { apiClient } from "./apiClient";
import type { TestimonialData, PaginatedResponse } from "@/types/content";

export async function fetchTestimonials(page = 1): Promise<PaginatedResponse<TestimonialData>> {
  const { data } = await apiClient.get("/testimonials", { params: { page, limit: 9 } });
  return data;
}

export interface TestimonialSubmission {
  name: string;
  country?: string;
  company?: string;
  rating: number;
  comment: string;
  honeypot?: string; // must stay empty — filled means a bot
}

export async function submitTestimonial(payload: TestimonialSubmission): Promise<void> {
  await apiClient.post("/testimonials", payload);
}
