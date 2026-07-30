"use client";

import { AdminSingletonPage } from "@/components/dashboard/AdminSingletonPage";
import { createSingletonApi } from "@/utils/createResourceApi";
import { uploadResume } from "@/services/api/uploadService";
import type { HeroData } from "@/types/hero";

const api = createSingletonApi<HeroData>("/hero");

export default function AdminHeroPage() {
  return (
    <AdminSingletonPage<HeroData>
      title="Hero Section"
      description="The first thing visitors see."
      queryKey="admin-hero"
      api={api}
      fields={[
        { name: "greeting", label: "Greeting", type: "text", placeholder: "Hello, I'm" },
        { name: "name", label: "Name", type: "text", required: true },
        { name: "titles", label: "Rotating titles", type: "array", placeholder: "Full Stack Developer, UI/UX Designer" },
        { name: "availability", label: "Available for work", type: "boolean" },
        { name: "resumeUrl", label: "Resume", type: "file", accept: "application/pdf", uploadFn: uploadResume },
      ]}
    />
  );
}
