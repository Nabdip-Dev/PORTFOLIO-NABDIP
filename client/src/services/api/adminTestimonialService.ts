import { apiClient } from "./apiClient";
import type { TestimonialData } from "@/types/content";

export async function fetchAdminTestimonials(approved?: boolean): Promise<TestimonialData[]> {
  const { data } = await apiClient.get("/testimonials/admin", {
    params: approved === undefined ? undefined : { approved },
  });
  return data.data;
}

export async function setTestimonialApproval(id: string, approved: boolean): Promise<void> {
  await apiClient.patch(`/testimonials/${id}/approval`, { approved });
}

export async function deleteTestimonial(id: string): Promise<void> {
  await apiClient.delete(`/testimonials/${id}`);
}
