"use client";

import { AdminCrudPage } from "@/components/dashboard/AdminCrudPage";
import { createResourceApi } from "@/utils/createResourceApi";
import type { EducationData } from "@/types/content";

const api = createResourceApi<EducationData>("/education");

export default function AdminEducationPage() {
  return (
    <AdminCrudPage<EducationData>
      title="Education"
      queryKey="admin-education"
      api={api}
      columns={[
        { key: "degree", label: "Degree" },
        { key: "institution", label: "Institution" },
        { key: "startDate", label: "Start" },
      ]}
      fields={[
        { name: "degree", label: "Degree", type: "text", required: true },
        { name: "institution", label: "Institution", type: "text", required: true },
        { name: "startDate", label: "Start date", type: "date", required: true },
        { name: "endDate", label: "End date", type: "date" },
        { name: "description", label: "Description", type: "textarea" },
      ]}
      emptyItem={{ degree: "", institution: "", startDate: "" } as any}
    />
  );
}
