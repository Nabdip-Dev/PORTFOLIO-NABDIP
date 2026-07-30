"use client";

import { AdminCrudPage } from "@/components/dashboard/AdminCrudPage";
import { createResourceApi } from "@/utils/createResourceApi";
import { uploadProjectImage } from "@/services/api/uploadService";
import type { ProjectData } from "@/types/content";

const api = createResourceApi<ProjectData>("/projects");

export default function AdminProjectsPage() {
  return (
    <AdminCrudPage<ProjectData>
      title="Projects"
      description="Shown in the public Portfolio section."
      queryKey="admin-projects"
      api={api}
      columns={[
        { key: "title", label: "Title" },
        { key: "category", label: "Category" },
        { key: "status", label: "Status" },
        { key: "featured", label: "Featured", render: (p) => (p.featured ? "Yes" : "No") },
      ]}
      fields={[
        { name: "title", label: "Title", type: "text", required: true },
        { name: "slug", label: "Slug", type: "text", required: true, placeholder: "my-project" },
        {
          name: "images",
          label: "Cover image",
          type: "image",
          arrayWrap: true,
          uploadFn: uploadProjectImage,
        },
        { name: "shortDescription", label: "Short description", type: "text" },
        { name: "description", label: "Description", type: "textarea", required: true },
        { name: "category", label: "Category", type: "text", required: true },
        { name: "technologies", label: "Technologies", type: "array" },
        { name: "features", label: "Features", type: "array" },
        { name: "githubLink", label: "GitHub link", type: "text" },
        { name: "liveLink", label: "Live link", type: "text" },
        {
          name: "status",
          label: "Status",
          type: "select",
          options: [
            { label: "Completed", value: "completed" },
            { label: "In progress", value: "in-progress" },
            { label: "Planned", value: "planned" },
          ],
        },
        { name: "featured", label: "Featured", type: "boolean" },
      ]}
      emptyItem={{ title: "", slug: "", description: "", category: "", technologies: [], features: [], images: [], status: "completed", featured: false } as any}
    />
  );
}
