import { apiClient } from "@/services/api/apiClient";

/**
 * Mirrors the backend's crudFactory on the frontend: one function generates
 * list/create/update/remove calls for any resource path, instead of hand
 * writing near-identical service files for Projects, Skills, Services,
 * Experience, Education, SocialLinks, and FAQ.
 */
export function createResourceApi<T extends { _id: string }>(path: string) {
  return {
    list: async (params?: Record<string, unknown>) => {
      const { data } = await apiClient.get(path, { params });
      return data as { data: T[]; pagination?: { page: number; pages: number; total: number } };
    },
    create: async (payload: Partial<T>) => {
      const { data } = await apiClient.post(path, payload);
      return data.data as T;
    },
    update: async (id: string, payload: Partial<T>) => {
      const { data } = await apiClient.patch(`${path}/${id}`, payload);
      return data.data as T;
    },
    remove: async (id: string) => {
      await apiClient.delete(`${path}/${id}`);
    },
  };
}

/** Same idea for singleton resources (Hero, About, Settings, Theme). */
export function createSingletonApi<T>(path: string) {
  return {
    get: async () => {
      const { data } = await apiClient.get(path);
      return data.data as T;
    },
    update: async (payload: Partial<T>) => {
      const { data } = await apiClient.patch(path, payload);
      return data.data as T;
    },
  };
}
