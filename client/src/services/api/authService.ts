import { apiClient } from "./apiClient";
import type { AuthUser } from "@/types/auth";

interface AuthResponse {
  accessToken: string;
  user: AuthUser;
}

export async function registerVisitor(payload: {
  name: string;
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const { data } = await apiClient.post("/auth/register", payload);
  return { accessToken: data.accessToken, user: data.user };
}

export async function login(payload: { email: string; password: string }): Promise<AuthResponse> {
  const { data } = await apiClient.post("/auth/login", payload);
  return { accessToken: data.accessToken, user: data.user };
}

export async function googleAuth(idToken: string): Promise<AuthResponse> {
  const { data } = await apiClient.post("/auth/google", { idToken });
  return { accessToken: data.accessToken, user: data.user };
}

export async function verifyEmail(email: string, otp: string): Promise<void> {
  await apiClient.post("/auth/verify-email", { email, otp });
}

export async function resendOtp(email: string): Promise<void> {
  await apiClient.post("/auth/resend-otp", { email });
}

export async function forgotPassword(email: string): Promise<void> {
  await apiClient.post("/auth/forgot-password", { email });
}

export async function resetPassword(token: string, newPassword: string): Promise<void> {
  await apiClient.post("/auth/reset-password", { token, newPassword });
}

/** Silently exchanges the httpOnly refresh cookie for a new access token. */
export async function refreshAccessToken(): Promise<string | null> {
  try {
    const { data } = await apiClient.post("/auth/refresh");
    return data.accessToken as string;
  } catch {
    return null;
  }
}

export async function fetchMe(): Promise<AuthUser> {
  const { data } = await apiClient.get("/auth/me");
  return data.user;
}

export async function logout(): Promise<void> {
  await apiClient.post("/auth/logout");
}
