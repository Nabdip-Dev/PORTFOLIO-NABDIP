"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FiUpload, FiCheck } from "react-icons/fi";
import type { FieldConfig } from "./fieldTypes";

interface DynamicFormProps {
  fields: FieldConfig[];
  values: Record<string, any>;
  onChange: (name: string, value: any) => void;
}

/**
 * Renders a form from a field-config array instead of hand-writing a form
 * per collection. Powers every admin CRUD/singleton page. Array-type fields
 * are edited as a comma-separated line and split/joined at the boundary —
 * simple, and matches how "technologies", "features", etc. are naturally typed.
 */
export function DynamicForm({ fields, values, onChange }: DynamicFormProps) {
  const [uploading, setUploading] = useState<Record<string, boolean>>({});

  async function handleUpload(field: FieldConfig, file: File) {
    if (!field.uploadFn) return;
    setUploading((prev) => ({ ...prev, [field.name]: true }));
    try {
      const result = await field.uploadFn(file);
      if (field.type === "file") {
        // Resume-style fields are a plain URL string in the schema, not an object.
        onChange(field.name, result.url);
      } else {
        onChange(field.name, field.arrayWrap ? [result] : result);
      }
      toast.success("Uploaded");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading((prev) => ({ ...prev, [field.name]: false }));
    }
  }

  return (
    <div className="space-y-4">
      {fields.map((field) => {
        const value = values[field.name];

        if (field.type === "image") {
          const current = field.arrayWrap ? value?.[0] : value;
          return (
            <div key={field.name}>
              <label className="mb-1 block text-xs font-medium text-[var(--foreground-muted)]">{field.label}</label>
              <div className="flex items-center gap-3">
                {current?.url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={current.url} alt={field.label} className="h-12 w-12 rounded-lg object-cover" />
                )}
                <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-[var(--border)] px-3 py-2 text-xs text-[var(--foreground-muted)] hover:border-[var(--accent)]">
                  {uploading[field.name] ? (
                    "Uploading..."
                  ) : (
                    <>
                      <FiUpload size={13} /> {current?.url ? "Replace image" : "Upload image"}
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploading[field.name]}
                    onChange={(e) => e.target.files?.[0] && handleUpload(field, e.target.files[0])}
                  />
                </label>
              </div>
            </div>
          );
        }

        if (field.type === "file") {
          return (
            <div key={field.name}>
              <label className="mb-1 block text-xs font-medium text-[var(--foreground-muted)]">{field.label}</label>
              <div className="flex items-center gap-3">
                {value && (
                  <span className="flex items-center gap-1 text-xs" style={{ color: "var(--accent)" }}>
                    <FiCheck size={13} /> File attached
                  </span>
                )}
                <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-[var(--border)] px-3 py-2 text-xs text-[var(--foreground-muted)] hover:border-[var(--accent)]">
                  {uploading[field.name] ? (
                    "Uploading..."
                  ) : (
                    <>
                      <FiUpload size={13} /> {value ? "Replace file" : "Upload file"}
                    </>
                  )}
                  <input
                    type="file"
                    accept={field.accept}
                    className="hidden"
                    disabled={uploading[field.name]}
                    onChange={(e) => e.target.files?.[0] && handleUpload(field, e.target.files[0])}
                  />
                </label>
              </div>
            </div>
          );
        }

        if (field.type === "boolean") {
          return (
            <label key={field.name} className="flex items-center justify-between text-sm">
              {field.label}
              <input
                type="checkbox"
                checked={Boolean(value)}
                onChange={(e) => onChange(field.name, e.target.checked)}
                className="h-4 w-4 accent-[var(--accent)]"
              />
            </label>
          );
        }

        if (field.type === "textarea") {
          return (
            <div key={field.name}>
              <label className="mb-1 block text-xs font-medium text-[var(--foreground-muted)]">{field.label}</label>
              <textarea
                value={value ?? ""}
                onChange={(e) => onChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                rows={4}
                className="w-full resize-none rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
              />
            </div>
          );
        }

        if (field.type === "select") {
          return (
            <div key={field.name}>
              <label className="mb-1 block text-xs font-medium text-[var(--foreground-muted)]">{field.label}</label>
              <select
                value={value ?? ""}
                onChange={(e) => onChange(field.name, e.target.value)}
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
              >
                <option value="" disabled>
                  Select...
                </option>
                {field.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          );
        }

        if (field.type === "array") {
          const arrayValue = Array.isArray(value) ? value.join(", ") : "";
          return (
            <div key={field.name}>
              <label className="mb-1 block text-xs font-medium text-[var(--foreground-muted)]">
                {field.label} <span className="text-[10px]">(comma-separated)</span>
              </label>
              <input
                value={arrayValue}
                onChange={(e) =>
                  onChange(
                    field.name,
                    e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                  )
                }
                placeholder={field.placeholder}
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
              />
            </div>
          );
        }

        return (
          <div key={field.name}>
            <label className="mb-1 block text-xs font-medium text-[var(--foreground-muted)]">{field.label}</label>
            <input
              type={field.type === "number" ? "number" : field.type === "date" ? "date" : "text"}
              value={value ?? ""}
              onChange={(e) =>
                onChange(field.name, field.type === "number" ? Number(e.target.value) : e.target.value)
              }
              placeholder={field.placeholder}
              required={field.required}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
            />
          </div>
        );
      })}
    </div>
  );
}
