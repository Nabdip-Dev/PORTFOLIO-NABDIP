import { apiClient } from "./apiClient";
import type { ChatData } from "@/types/chat";

export async function fetchAllChats(): Promise<ChatData[]> {
  const { data } = await apiClient.get("/chat");
  return data.data;
}
