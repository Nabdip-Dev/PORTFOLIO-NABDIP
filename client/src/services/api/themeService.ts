import { apiClient } from "./apiClient";
import type { ThemeMode, AccentColor } from "@/constants/theme";

export interface ThemeSettings {
  mode: ThemeMode;
  accent: AccentColor;
  primaryColor?: string;
  secondaryColor?: string;
  backgroundStyle?: "solid" | "gradient" | "mesh";
}

/** Public read — used to paint the admin's chosen defaults for first-time visitors. */
export async function fetchTheme(): Promise<ThemeSettings> {
  const { data } = await apiClient.get("/theme");
  return data.data;
}

/** Admin-only write — requires an auth token to already be set on apiClient. */
export async function updateTheme(payload: Partial<ThemeSettings>): Promise<ThemeSettings> {
  const { data } = await apiClient.patch("/theme", payload);
  return data.data;
}
