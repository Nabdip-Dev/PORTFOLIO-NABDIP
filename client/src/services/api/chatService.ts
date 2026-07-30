import { apiClient } from "./apiClient";
import type { ChatData } from "@/types/chat";

/** Fetches (or lazily creates, server-side) the current visitor's chat history. */
export async function fetchMyChat(): Promise<ChatData> {
  const { data } = await apiClient.get("/chat/me");
  return data.data;
}
