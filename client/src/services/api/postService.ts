import { apiClient } from "./apiClient";
import type { PostData, PaginatedResponse } from "@/types/content";

export async function fetchPosts(params: { page?: number; search?: string; tag?: string } = {}): Promise<PaginatedResponse<PostData>> {
  const { data } = await apiClient.get("/posts", { params });
  return data;
}

export async function fetchPostBySlug(slug: string): Promise<PostData> {
  const { data } = await apiClient.get(`/posts/${slug}`);
  return data.data;
}

export async function fetchAllPostsAdmin(): Promise<PostData[]> {
  const { data } = await apiClient.get("/posts/admin/all", { params: { limit: 100 } });
  return data.data;
}

/** Admin-only variant of the resource API's `list`, pointed at the
 * admin listing endpoint (includes drafts, not just published posts). */
export function createAdminPostApi() {
  return {
    list: async () => ({ data: await fetchAllPostsAdmin() }),
  };
}
