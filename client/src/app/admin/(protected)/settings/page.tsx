"use client";

import { AdminSingletonPage } from "@/components/dashboard/AdminSingletonPage";
import { createSingletonApi } from "@/utils/createResourceApi";

interface SettingsData {
  siteTitle: string;
  siteDescription: string;
  seoKeywords: string[];
  contactEmail: string;
  whatsappNumber: string;
  maintenanceMode: boolean;
}
const api = createSingletonApi<SettingsData>("/settings");

export default function AdminSettingsPage() {
  return (
    <AdminSingletonPage<SettingsData>
      title="Website Settings"
      description="SEO defaults and general configuration."
      queryKey="admin-settings"
      api={api}
      fields={[
        { name: "siteTitle", label: "Site title", type: "text" },
        { name: "siteDescription", label: "Site description (SEO)", type: "textarea" },
        { name: "seoKeywords", label: "SEO keywords", type: "array" },
        { name: "contactEmail", label: "Contact email", type: "text" },
        { name: "whatsappNumber", label: "WhatsApp number (with country code, e.g. 8801XXXXXXXXX)", type: "text" },
        { name: "maintenanceMode", label: "Maintenance mode", type: "boolean" },
      ]}
    />
  );
}
