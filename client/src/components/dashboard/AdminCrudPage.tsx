"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import type { FieldConfig, ColumnConfig } from "./fieldTypes";
import { DynamicForm } from "./DynamicForm";
import { AdminModal } from "./AdminModal";

interface ResourceApi<T> {
  list: (params?: Record<string, unknown>) => Promise<{ data: T[] }>;
  create: (payload: Partial<T>) => Promise<T>;
  update: (id: string, payload: Partial<T>) => Promise<T>;
  remove: (id: string) => Promise<void>;
}

interface AdminCrudPageProps<T extends { _id: string }> {
  title: string;
  description?: string;
  queryKey: string;
  api: ResourceApi<T>;
  columns: ColumnConfig<T>[];
  fields: FieldConfig[];
  emptyItem: Partial<T>;
  /** Converts a loaded item into form values, for fields whose DB shape
   * doesn't match DynamicForm's plain types (e.g. an array of {text,included}
   * objects edited as a simple comma-separated list). */
  transformLoad?: (item: T) => Record<string, any>;
  /** Converts form values back into the shape the API expects, inverse of transformLoad. */
  transformSubmit?: (values: Record<string, any>) => Record<string, any>;
}

/**
 * One generic table + create/edit modal, reused for Projects, Skills,
 * Services, Experience, Education, Social Links, and FAQ. Each page just
 * supplies its column/field config and the matching resource API.
 */
export function AdminCrudPage<T extends { _id: string }>({
  title,
  description,
  queryKey,
  api,
  columns,
  fields,
  emptyItem,
  transformLoad,
  transformSubmit,
}: AdminCrudPageProps<T>) {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: [queryKey], queryFn: () => api.list({ limit: 100 }) });

  const [isModalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<Record<string, any>>(emptyItem);

  const invalidate = () => qc.invalidateQueries({ queryKey: [queryKey] });

  const createMutation = useMutation({
    mutationFn: (payload: Partial<T>) => api.create(payload),
    onSuccess: () => {
      toast.success(`${title.replace(/s$/, "")} created`);
      invalidate();
      setModalOpen(false);
    },
    onError: () => toast.error("Failed to create"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<T> }) => api.update(id, payload),
    onSuccess: () => {
      toast.success("Updated");
      invalidate();
      setModalOpen(false);
    },
    onError: () => toast.error("Failed to update"),
  });

  const removeMutation = useMutation({
    mutationFn: (id: string) => api.remove(id),
    onSuccess: () => {
      toast.success("Deleted");
      invalidate();
    },
    onError: () => toast.error("Failed to delete"),
  });

  function openCreate() {
    setEditingId(null);
    setFormValues(emptyItem);
    setModalOpen(true);
  }

  function openEdit(item: T) {
    setEditingId(item._id);
    setFormValues(transformLoad ? transformLoad(item) : (item as Record<string, any>));
    setModalOpen(true);
  }

  function handleSubmit() {
    const payload = (transformSubmit ? transformSubmit(formValues) : formValues) as Partial<T>;
    if (editingId) {
      updateMutation.mutate({ id: editingId, payload });
    } else {
      createMutation.mutate(payload);
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl font-semibold">{title}</h1>
          {description && <p className="mt-1 text-sm text-[var(--foreground-muted)]">{description}</p>}
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[var(--accent-foreground)]"
          style={{ background: "var(--gradient-accent)" }}
        >
          <FiPlus size={15} /> Add new
        </button>
      </div>

      <div className="overflow-x-auto rounded-card glass">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] text-xs text-[var(--foreground-muted)]">
              {columns.map((col) => (
                <th key={String(col.key)} className="px-4 py-3 font-medium">
                  {col.label}
                </th>
              ))}
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-6 text-center text-[var(--foreground-muted)]">
                  Loading...
                </td>
              </tr>
            ) : data?.data.length ? (
              data.data.map((item) => (
                <tr key={item._id} className="border-b border-[var(--border)] last:border-0">
                  {columns.map((col) => (
                    <td key={String(col.key)} className="max-w-[220px] truncate px-4 py-3">
                      {col.render ? col.render(item) : String((item as any)[col.key] ?? "—")}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEdit(item)}
                        aria-label="Edit"
                        className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-[var(--surface-elevated)]"
                      >
                        <FiEdit2 size={13} />
                      </button>
                      <button
                        onClick={() => confirm("Delete this item?") && removeMutation.mutate(item._id)}
                        aria-label="Delete"
                        className="flex h-7 w-7 items-center justify-center rounded-full text-red-400 hover:bg-[var(--surface-elevated)]"
                      >
                        <FiTrash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-6 text-center text-[var(--foreground-muted)]">
                  No items yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AdminModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title={editingId ? "Edit" : "Add new"}>
        <DynamicForm
          fields={fields}
          values={formValues}
          onChange={(name, value) => setFormValues((prev) => ({ ...prev, [name]: value }))}
        />
        <button
          onClick={handleSubmit}
          disabled={createMutation.isPending || updateMutation.isPending}
          className="mt-5 w-full rounded-full px-4 py-2.5 text-sm font-medium text-[var(--accent-foreground)] disabled:opacity-60"
          style={{ background: "var(--gradient-accent)" }}
        >
          {editingId ? "Save changes" : "Create"}
        </button>
      </AdminModal>
    </div>
  );
}
