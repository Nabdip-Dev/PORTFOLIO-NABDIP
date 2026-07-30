import { apiClient } from "./apiClient";

export interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function submitContactMessage(payload: ContactSubmission): Promise<void> {
  await apiClient.post("/messages", payload);
}
