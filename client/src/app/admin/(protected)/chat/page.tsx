"use client";

import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FiSend } from "react-icons/fi";
import { useAuth } from "@/contexts/AuthContext";
import { useSocket } from "@/contexts/SocketContext";
import { fetchAllChats } from "@/services/api/adminChatService";
import type { ChatData, ChatMessageData } from "@/types/chat";

function formatTime(iso?: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

export default function AdminChatPage() {
  const { user } = useAuth();
  const socket = useSocket();
  const { data: chats, isLoading } = useQuery({ queryKey: ["admin-chats"], queryFn: fetchAllChats });

  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [threads, setThreads] = useState<Record<string, ChatMessageData[]>>({});
  const [draft, setDraft] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Seed local thread state from the initial REST fetch.
  useEffect(() => {
    if (!chats) return;
    const map: Record<string, ChatMessageData[]> = {};
    chats.forEach((c) => (map[c._id] = c.messages));
    setThreads(map);
    if (!selectedChatId && chats.length > 0) setSelectedChatId(chats[0]._id);
  }, [chats]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [threads, selectedChatId]);

  useEffect(() => {
    if (!socket) return;
    function onMessage({ chatId, message }: { chatId: string; message: ChatMessageData }) {
      setThreads((prev) => ({ ...prev, [chatId]: [...(prev[chatId] ?? []), message] }));
    }
    socket.on("chat:message", onMessage);
    return () => {
      socket.off("chat:message", onMessage);
    };
  }, [socket]);

  const selectedChat = chats?.find((c) => c._id === selectedChatId);
  const visitor = typeof selectedChat?.visitor === "object" ? selectedChat.visitor : null;

  function handleSend() {
    const text = draft.trim();
    if (!text || !socket || !visitor) return;
    socket.emit("chat:message", { chatId: selectedChatId, visitorId: visitor._id, text });
    setDraft("");
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] gap-4">
      <div className="w-72 shrink-0 overflow-y-auto rounded-card glass">
        <div className="border-b border-[var(--border)] p-4">
          <h1 className="font-display text-base font-semibold">Conversations</h1>
        </div>
        {isLoading ? (
          <p className="p-4 text-sm text-[var(--foreground-muted)]">Loading...</p>
        ) : chats?.length ? (
          chats.map((c: ChatData) => {
            const v = typeof c.visitor === "object" ? c.visitor : null;
            const lastMsg = (threads[c._id] ?? c.messages).slice(-1)[0];
            return (
              <button
                key={c._id}
                onClick={() => setSelectedChatId(c._id)}
                className="block w-full border-b border-[var(--border)] p-4 text-left"
                style={selectedChatId === c._id ? { background: "var(--surface-elevated)" } : undefined}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{v?.name ?? "Visitor"}</span>
                  {v?.isOnline && <span className="h-2 w-2 rounded-full bg-green-500" />}
                </div>
                <p className="mt-1 truncate text-xs text-[var(--foreground-muted)]">
                  {lastMsg?.text || (lastMsg?.image ? "📷 Image" : "No messages yet")}
                </p>
              </button>
            );
          })
        ) : (
          <p className="p-4 text-sm text-[var(--foreground-muted)]">No conversations yet.</p>
        )}
      </div>

      <div className="flex flex-1 flex-col rounded-card glass">
        {selectedChat ? (
          <>
            <div className="border-b border-[var(--border)] p-4">
              <span className="text-sm font-medium">{visitor?.name ?? "Visitor"}</span>
              <span className="ml-2 text-xs text-[var(--foreground-muted)]">{visitor?.email}</span>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-2 overflow-y-auto p-4">
              {(threads[selectedChat._id] ?? []).map((m, i) => {
                const isMine = m.sender === user?._id;
                return (
                  <div key={m._id ?? i} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                    <div className="max-w-[60%]">
                      <div
                        className="rounded-2xl px-3.5 py-2 text-sm"
                        style={
                          isMine
                            ? { background: "var(--gradient-accent)", color: "var(--accent-foreground)" }
                            : { background: "var(--surface-elevated)" }
                        }
                      >
                        {m.image?.url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={m.image.url} alt="Attachment" className="max-h-40 rounded-lg" />
                        ) : (
                          m.text
                        )}
                      </div>
                      <div className={`mt-0.5 text-[10px] text-[var(--foreground-muted)] ${isMine ? "text-right" : ""}`}>
                        {formatTime(m.createdAt)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-2 border-t border-[var(--border)] p-3">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Reply..."
                className="flex-1 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2 text-sm outline-none focus:border-[var(--accent)]"
              />
              <button
                onClick={handleSend}
                aria-label="Send"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[var(--accent-foreground)]"
                style={{ background: "var(--gradient-accent)" }}
              >
                <FiSend size={14} />
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center text-sm text-[var(--foreground-muted)]">
            Select a conversation
          </div>
        )}
      </div>
    </div>
  );
}
