"use client";

import { AdminCrudPage } from "@/components/dashboard/AdminCrudPage";
import { createResourceApi } from "@/utils/createResourceApi";
import { createAdminPostApi } from "@/services/api/postService";
import { uploadProjectImage } from "@/services/api/uploadService";
import type { PostData } from "@/types/content";

const resourceApi = createResourceApi<PostData>("/posts");
const api = { ...resourceApi, list: createAdminPostApi().list };

export default function AdminBlogPage() {
  return (
    <AdminCrudPage<PostData>
      title="Blog"
      description="Articles shown at /blog once published."
      queryKey="admin-posts"
      api={api}
      columns={[
        { key: "title", label: "Title" },
        { key: "published", label: "Published", render: (p) => (p.published ? "Yes" : "Draft") },
        { key: "views", label: "Views", render: (p) => String(p.views) },
      ]}
      fields={[
        { name: "title", label: "Title", type: "text", required: true },
        { name: "slug", label: "Slug", type: "text", required: true, placeholder: "my-article" },
        { name: "excerpt", label: "Excerpt", type: "textarea" },
        { name: "coverImage", label: "Cover image", type: "image", uploadFn: uploadProjectImage },
        { name: "content", label: "Content", type: "textarea", required: true },
        { name: "tags", label: "Tags", type: "array" },
        { name: "published", label: "Published", type: "boolean" },
      ]}
      emptyItem={{ title: "", slug: "", excerpt: "", content: "", tags: [], published: false } as any}
    />
  );
}
