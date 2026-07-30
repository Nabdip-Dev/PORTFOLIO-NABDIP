"use client";

import { AdminCrudPage } from "@/components/dashboard/AdminCrudPage";
import { createResourceApi } from "@/utils/createResourceApi";
import type { ServiceData } from "@/types/content";

const api = createResourceApi<ServiceData>("/services");

export default function AdminServicesPage() {
  return (
    <AdminCrudPage<ServiceData>
      title="Services"
      description="Shown in the public Services section."
      queryKey="admin-services"
      api={api}
      columns={[
        { key: "title", label: "Title" },
        { key: "price", label: "Price", render: (s) => (s.price ? `$${s.price}` : "—") },
        { key: "active", label: "Active", render: (s) => (s.active ? "Yes" : "No") },
      ]}
      fields={[
        { name: "title", label: "Title", type: "text", required: true },
        { name: "description", label: "Description", type: "textarea", required: true },
        { name: "icon", label: "Icon key", type: "text", placeholder: "FiCode" },
        { name: "features", label: "Features", type: "array" },
        { name: "price", label: "Price (optional)", type: "number" },
        { name: "active", label: "Active", type: "boolean" },
      ]}
      emptyItem={{ title: "", description: "", icon: "", features: [], active: true } as any}
    />
  );
}
