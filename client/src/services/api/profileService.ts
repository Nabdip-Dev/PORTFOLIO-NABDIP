import { apiClient } from "./apiClient";
import type { AuthUser } from "@/types/auth";

export async function updateProfile(payload: { name?: string; avatar?: { url: string; publicId?: string } }): Promise<AuthUser> {
  const { data } = await apiClient.patch("/auth/me", payload);
  return data.user;
}

export async function changePassword(payload: { currentPassword: string; newPassword: string }): Promise<void> {
  await apiClient.post("/auth/change-password", payload);
}
