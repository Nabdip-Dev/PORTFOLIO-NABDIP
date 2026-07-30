import { apiClient } from "./apiClient";

export interface SettingsData {
  siteTitle: string;
  siteDescription: string;
  seoKeywords: string[];
  ogImage?: { url: string };
  contactEmail?: string;
  whatsappNumber?: string;
}

export async function fetchSettings(): Promise<SettingsData> {
  const { data } = await apiClient.get("/settings");
  return data.data;
}
