"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FiCheck, FiX, FiTrash2, FiStar } from "react-icons/fi";
import {
  fetchAdminTestimonials,
  setTestimonialApproval,
  deleteTestimonial,
} from "@/services/api/adminTestimonialService";

export default function AdminTestimonialsPage() {
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("pending");
  const qc = useQueryClient();

  const { data: items, isLoading } = useQuery({
    queryKey: ["admin-testimonials", filter],
    queryFn: () => fetchAdminTestimonials(filter === "all" ? undefined : filter === "approved"),
  });

  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin-testimonials"] });

  const approveMutation = useMutation({
    mutationFn: ({ id, approved }: { id: string; approved: boolean }) => setTestimonialApproval(id, approved),
    onSuccess: () => {
      toast.success("Updated");
      invalidate();
    },
  });
  const deleteMutation = useMutation({
    mutationFn: deleteTestimonial,
    onSuccess: () => {
      toast.success("Deleted");
      invalidate();
    },
  });

  return (
    <div>
      <h1 className="font-display text-xl font-semibold">Testimonials</h1>
      <p className="mt-1 text-sm text-[var(--foreground-muted)]">
        Reviews only appear publicly once approved here.
      </p>

      <div className="mt-4 flex gap-2">
        {(["pending", "approved", "all"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="rounded-full px-3.5 py-1.5 text-xs font-medium capitalize"
            style={
              filter === f
                ? { background: "var(--gradient-accent)", color: "var(--accent-foreground)" }
                : { background: "var(--surface-elevated)", color: "var(--foreground-muted)" }
            }
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <p className="text-sm text-[var(--foreground-muted)]">Loading...</p>
        ) : items?.length ? (
          items.map((t) => (
            <div key={t._id} className="rounded-card glass p-5">
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FiStar
                      key={i}
                      size={12}
                      fill={i < t.rating ? "var(--accent)" : "none"}
                      color={i < t.rating ? "var(--accent)" : "var(--foreground-muted)"}
                    />
                  ))}
                </div>
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                  style={{
                    background: "var(--surface-elevated)",
                    color: (t as any).approved ? "#22c55e" : "var(--foreground-muted)",
                  }}
                >
                  {(t as any).approved ? "Approved" : "Pending"}
                </span>
              </div>
              <p className="mt-2 text-sm text-[var(--foreground-muted)]">&ldquo;{t.comment}&rdquo;</p>
              <p className="mt-2 text-xs font-medium">{t.name}</p>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => approveMutation.mutate({ id: t._id, approved: true })}
                  className="flex flex-1 items-center justify-center gap-1 rounded-full bg-[var(--surface-elevated)] py-1.5 text-xs text-green-500"
                >
                  <FiCheck size={13} /> Approve
                </button>
                <button
                  onClick={() => approveMutation.mutate({ id: t._id, approved: false })}
                  className="flex flex-1 items-center justify-center gap-1 rounded-full bg-[var(--surface-elevated)] py-1.5 text-xs text-[var(--foreground-muted)]"
                >
                  <FiX size={13} /> Reject
                </button>
                <button
                  onClick={() => confirm("Delete this review?") && deleteMutation.mutate(t._id)}
                  className="flex items-center justify-center rounded-full bg-[var(--surface-elevated)] px-2.5 text-red-400"
                >
                  <FiTrash2 size={13} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-[var(--foreground-muted)]">No reviews in this filter.</p>
        )}
      </div>
    </div>
  );
}
