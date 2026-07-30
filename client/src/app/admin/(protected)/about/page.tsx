"use client";

import { AdminSingletonPage } from "@/components/dashboard/AdminSingletonPage";
import { createSingletonApi } from "@/utils/createResourceApi";
import { uploadProjectImage } from "@/services/api/uploadService";
import type { AboutData } from "@/types/content";

const api = createSingletonApi<AboutData>("/about");

export default function AdminAboutPage() {
  return (
    <AdminSingletonPage<AboutData>
      title="About Section"
      queryKey="admin-about"
      api={api}
      fields={[
        { name: "photo", label: "Photo", type: "image", uploadFn: uploadProjectImage },
        { name: "biography", label: "Biography", type: "textarea", required: true },
        { name: "achievements", label: "Achievements", type: "array" },
      ]}
    />
  );
}
