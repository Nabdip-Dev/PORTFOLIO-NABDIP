import { apiClient } from "./apiClient";

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export async function fetchMessages(read?: boolean): Promise<ContactMessage[]> {
  const { data } = await apiClient.get("/messages", { params: read === undefined ? undefined : { read } });
  return data.data;
}

export async function markMessageRead(id: string): Promise<void> {
  await apiClient.patch(`/messages/${id}/read`);
}

export async function deleteMessage(id: string): Promise<void> {
  await apiClient.delete(`/messages/${id}`);
}
