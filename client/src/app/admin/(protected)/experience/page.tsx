"use client";

import { AdminCrudPage } from "@/components/dashboard/AdminCrudPage";
import { createResourceApi } from "@/utils/createResourceApi";
import type { ExperienceData } from "@/types/content";

const api = createResourceApi<ExperienceData>("/experience");

export default function AdminExperiencePage() {
  return (
    <AdminCrudPage<ExperienceData>
      title="Experience"
      description="Shown as a timeline on the public site."
      queryKey="admin-experience"
      api={api}
      columns={[
        { key: "role", label: "Role" },
        { key: "company", label: "Company" },
        { key: "startDate", label: "Start" },
      ]}
      fields={[
        { name: "role", label: "Role", type: "text", required: true },
        { name: "company", label: "Company", type: "text", required: true },
        { name: "location", label: "Location", type: "text" },
        { name: "startDate", label: "Start date", type: "date", required: true },
        { name: "endDate", label: "End date (leave blank if current)", type: "date" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "technologies", label: "Technologies", type: "array" },
      ]}
      emptyItem={{ role: "", company: "", startDate: "", technologies: [] } as any}
    />
  );
}
