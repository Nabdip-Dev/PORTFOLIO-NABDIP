"use client";

import { AdminCrudPage } from "@/components/dashboard/AdminCrudPage";
import { createResourceApi } from "@/utils/createResourceApi";
import type { SkillData } from "@/types/content";

const api = createResourceApi<SkillData>("/skills");

export default function AdminSkillsPage() {
  return (
    <AdminCrudPage<SkillData>
      title="Skills"
      description="Grouped by category on the public Skills section."
      queryKey="admin-skills"
      api={api}
      columns={[
        { key: "name", label: "Name" },
        { key: "category", label: "Category" },
        { key: "percentage", label: "Level", render: (s) => `${s.percentage}%` },
      ]}
      fields={[
        { name: "name", label: "Name", type: "text", required: true },
        { name: "icon", label: "Icon key", type: "text", placeholder: "SiReact" },
        { name: "percentage", label: "Percentage (0-100)", type: "number", required: true },
        { name: "description", label: "Description", type: "textarea" },
        {
          name: "category",
          label: "Category",
          type: "select",
          required: true,
          options: [
            { label: "Frontend", value: "frontend" },
            { label: "Backend", value: "backend" },
            { label: "Database", value: "database" },
            { label: "Deployment", value: "deployment" },
            { label: "Version Control", value: "version-control" },
            { label: "Tools", value: "tools" },
          ],
        },
      ]}
      emptyItem={{ name: "", icon: "", percentage: 50, category: "frontend" } as any}
    />
  );
}
