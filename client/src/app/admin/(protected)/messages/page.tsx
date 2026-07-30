"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FiTrash2, FiMail, FiMailOpen } from "react-icons/fi";
import { fetchMessages, markMessageRead, deleteMessage } from "@/services/api/adminMessageService";

export default function AdminMessagesPage() {
  const qc = useQueryClient();
  const { data: messages, isLoading } = useQuery({ queryKey: ["admin-messages"], queryFn: () => fetchMessages() });

  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin-messages"] });
  const readMutation = useMutation({ mutationFn: markMessageRead, onSuccess: invalidate });
  const deleteMutation = useMutation({
    mutationFn: deleteMessage,
    onSuccess: () => {
      toast.success("Deleted");
      invalidate();
    },
  });

  return (
    <div>
      <h1 className="font-display text-xl font-semibold">Contact Messages</h1>
      <p className="mt-1 text-sm text-[var(--foreground-muted)]">Submissions from the public contact form.</p>

      <div className="mt-6 space-y-3">
        {isLoading ? (
          <p className="text-sm text-[var(--foreground-muted)]">Loading...</p>
        ) : messages?.length ? (
          messages.map((m) => (
            <div key={m._id} className="rounded-card glass p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    {m.read ? (
                      <FiMailOpen size={14} className="text-[var(--foreground-muted)]" />
                    ) : (
                      <FiMail size={14} style={{ color: "var(--accent)" }} />
                    )}
                    <span className="text-sm font-medium">{m.subject}</span>
                  </div>
                  <p className="mt-1 text-xs text-[var(--foreground-muted)]">
                    {m.name} · {m.email}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  {!m.read && (
                    <button
                      onClick={() => readMutation.mutate(m._id)}
                      className="rounded-full bg-[var(--surface-elevated)] px-3 py-1 text-xs"
                    >
                      Mark read
                    </button>
                  )}
                  <button
                    onClick={() => confirm("Delete this message?") && deleteMutation.mutate(m._id)}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--surface-elevated)] text-red-400"
                    aria-label="Delete"
                  >
                    <FiTrash2 size={13} />
                  </button>
                </div>
              </div>
              <p className="mt-3 text-sm text-[var(--foreground-muted)]">{m.message}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-[var(--foreground-muted)]">No messages yet.</p>
        )}
      </div>
    </div>
  );
}
