"use client";

import { AdminCrudPage } from "@/components/dashboard/AdminCrudPage";
import { createResourceApi } from "@/utils/createResourceApi";
import type { SocialLink } from "@/types/hero";

interface SocialLinkRecord extends SocialLink {
  _id: string;
}
const api = createResourceApi<SocialLinkRecord>("/social-links");

export default function AdminSocialLinksPage() {
  return (
    <AdminCrudPage<SocialLinkRecord>
      title="Social Links"
      queryKey="admin-social-links"
      api={api}
      columns={[
        { key: "platform", label: "Platform" },
        { key: "url", label: "URL" },
      ]}
      fields={[
        { name: "platform", label: "Platform", type: "text", required: true, placeholder: "github" },
        { name: "url", label: "URL", type: "text", required: true },
        { name: "icon", label: "Icon key", type: "text", placeholder: "github" },
      ]}
      emptyItem={{ platform: "", url: "", icon: "" } as any}
    />
  );
}
