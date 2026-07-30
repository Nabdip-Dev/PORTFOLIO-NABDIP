"use client";

import { AdminCrudPage } from "@/components/dashboard/AdminCrudPage";
import { createResourceApi } from "@/utils/createResourceApi";
import type { PricingPlanData } from "@/types/content";

const api = createResourceApi<PricingPlanData>("/pricing");

export default function AdminPricingPage() {
  return (
    <AdminCrudPage<PricingPlanData>
      title="Pricing Packages"
      description="Shown as a Basic/Standard/Premium comparison table under Services."
      queryKey="admin-pricing"
      api={api}
      columns={[
        { key: "name", label: "Name" },
        { key: "price", label: "Price", render: (p) => `$${p.price}` },
        { key: "highlighted", label: "Highlighted", render: (p) => (p.highlighted ? "Yes" : "No") },
      ]}
      fields={[
        { name: "name", label: "Name", type: "text", required: true, placeholder: "Standard" },
        { name: "price", label: "Price", type: "number", required: true },
        { name: "billingPeriod", label: "Billing period", type: "text", placeholder: "project" },
        { name: "description", label: "Short description", type: "text" },
        {
          name: "features",
          label: "Features (comma-separated — each becomes an included item)",
          type: "array",
        },
        { name: "highlighted", label: "Mark as \"Most Popular\"", type: "boolean" },
      ]}
      emptyItem={
        {
          name: "",
          price: 0,
          billingPeriod: "project",
          features: [],
          highlighted: false,
        } as any
      }
      transformLoad={(item) => ({
        ...item,
        features: item.features?.filter((f) => f.included).map((f) => f.text) ?? [],
      })}
      transformSubmit={(values) => ({
        ...values,
        features: (values.features ?? []).map((text: string) => ({ text, included: true })),
      })}
    />
  );
}
