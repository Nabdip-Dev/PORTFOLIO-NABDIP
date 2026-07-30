"use client";

import { AdminCrudPage } from "@/components/dashboard/AdminCrudPage";
import { createResourceApi } from "@/utils/createResourceApi";
import type { FaqData } from "@/types/content";

const api = createResourceApi<FaqData>("/faqs");

export default function AdminFaqsPage() {
  return (
    <AdminCrudPage<FaqData>
      title="FAQ"
      queryKey="admin-faqs"
      api={api}
      columns={[{ key: "question", label: "Question" }, { key: "category", label: "Category" }]}
      fields={[
        { name: "question", label: "Question", type: "text", required: true },
        { name: "answer", label: "Answer", type: "textarea", required: true },
        { name: "category", label: "Category", type: "text", placeholder: "general" },
      ]}
      emptyItem={{ question: "", answer: "", category: "general" } as any}
    />
  );
}
