"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { FieldConfig } from "./fieldTypes";
import { DynamicForm } from "./DynamicForm";

interface SingletonApi<T> {
  get: () => Promise<T>;
  update: (payload: Partial<T>) => Promise<T>;
}

interface AdminSingletonPageProps<T> {
  title: string;
  description?: string;
  queryKey: string;
  api: SingletonApi<T>;
  fields: FieldConfig[];
}

/** One generic "edit the single document" page, reused for Hero, About,
 * Settings, and Theme — no list, no create/delete, just load + save. */
export function AdminSingletonPage<T extends Record<string, any>>({
  title,
  description,
  queryKey,
  api,
  fields,
}: AdminSingletonPageProps<T>) {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: [queryKey], queryFn: api.get });
  const [values, setValues] = useState<Record<string, any>>({});

  useEffect(() => {
    if (data) setValues(data);
  }, [data]);

  const mutation = useMutation({
    mutationFn: (payload: Partial<T>) => api.update(payload),
    onSuccess: () => {
      toast.success("Saved");
      qc.invalidateQueries({ queryKey: [queryKey] });
    },
    onError: () => toast.error("Failed to save"),
  });

  return (
    <div>
      <h1 className="font-display text-xl font-semibold">{title}</h1>
      {description && <p className="mt-1 text-sm text-[var(--foreground-muted)]">{description}</p>}

      <div className="mt-6 max-w-xl rounded-card glass p-6">
        {isLoading ? (
          <p className="text-sm text-[var(--foreground-muted)]">Loading...</p>
        ) : (
          <>
            <DynamicForm
              fields={fields}
              values={values}
              onChange={(name, value) => setValues((prev) => ({ ...prev, [name]: value }))}
            />
            <button
              onClick={() => mutation.mutate(values as Partial<T>)}
              disabled={mutation.isPending}
              className="mt-5 w-full rounded-full px-4 py-2.5 text-sm font-medium text-[var(--accent-foreground)] disabled:opacity-60"
              style={{ background: "var(--gradient-accent)" }}
            >
              {mutation.isPending ? "Saving..." : "Save changes"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
