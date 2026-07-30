import { apiClient } from "./apiClient";

export interface UploadResult {
  url: string;
  publicId: string;
}

async function uploadFile(endpoint: string, file: File): Promise<UploadResult> {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await apiClient.post(endpoint, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.data;
}

export const uploadChatImage = (file: File) => uploadFile("/uploads/chat-image", file);
export const uploadAvatar = (file: File) => uploadFile("/uploads/avatar", file);
export const uploadProjectImage = (file: File) => uploadFile("/uploads/project-image", file);
export const uploadProjectVideo = (file: File) => uploadFile("/uploads/project-video", file);
export const uploadResume = (file: File) => uploadFile("/uploads/resume", file);

export async function deleteUpload(publicId: string, resourceType: "image" | "video" | "raw" = "image") {
  await apiClient.delete("/uploads", { data: { publicId, resourceType } });
}
