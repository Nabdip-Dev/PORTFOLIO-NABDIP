"use client";

import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FiSend, FiImage, FiSmile } from "react-icons/fi";
import { useAuth } from "@/contexts/AuthContext";
import { useSocket } from "@/contexts/SocketContext";
import { fetchMyChat } from "@/services/api/chatService";
import { uploadChatImage } from "@/services/api/uploadService";
import type { ChatMessageData } from "@/types/chat";
import { EmojiPicker } from "./EmojiPicker";

function formatTime(iso?: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

export function ChatWindow() {
  const { user, logout } = useAuth();
  const socket = useSocket();
  const { data: history } = useQuery({ queryKey: ["chat", "me"], queryFn: fetchMyChat });

  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [chatId, setChatId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [isAdminTyping, setIsAdminTyping] = useState(false);
  const [adminOnline, setAdminOnline] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hydrate from REST history once, then let the socket take over live updates.
  useEffect(() => {
    if (history) {
      setMessages(history.messages);
      setChatId(history._id);
    }
  }, [history]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!socket) return;

    function onMessage({ chatId: incomingChatId, message }: { chatId: string; message: ChatMessageData }) {
      setChatId(incomingChatId);
      setMessages((prev) => [...prev, message]);
    }
    function onTyping({ isTyping }: { isTyping: boolean }) {
      setIsAdminTyping(isTyping);
    }
    function onPresence({ isOnline }: { isOnline: boolean }) {
      setAdminOnline(isOnline);
    }

    socket.on("chat:message", onMessage);
    socket.on("chat:typing", onTyping);
    socket.on("presence:update", onPresence);
    socket.emit("chat:seen", { chatId });

    return () => {
      socket.off("chat:message", onMessage);
      socket.off("chat:typing", onTyping);
      socket.off("presence:update", onPresence);
    };
  }, [socket, chatId]);

  function sendMessage(payload: { text?: string; image?: { url: string } }) {
    if (!socket) return;
    socket.emit("chat:message", { chatId, ...payload });
  }

  function handleSend() {
    const text = draft.trim();
    if (!text) return;
    sendMessage({ text });
    setDraft("");
    socket?.emit("chat:typing", { isTyping: false });
  }

  function handleDraftChange(value: string) {
    setDraft(value);
    socket?.emit("chat:typing", { isTyping: true });
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => socket?.emit("chat:typing", { isTyping: false }), 1500);
  }

  async function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    try {
      const { url } = await uploadChatImage(file);
      sendMessage({ image: { url } });
    } catch {
      // Upload errors surface as a failed send; the input stays usable to retry.
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-2">
        <div className="flex items-center gap-2 text-xs text-[var(--foreground-muted)]">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: adminOnline ? "#22c55e" : "var(--foreground-muted)" }}
          />
          {adminOnline ? "Online now" : "Usually replies within a day"}
        </div>
        <button onClick={logout} className="text-xs text-[var(--foreground-muted)] hover:text-[var(--foreground)]">
          Log out
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-2 overflow-y-auto px-4 py-3">
        {messages.length === 0 && (
          <p className="mt-8 text-center text-xs text-[var(--foreground-muted)]">
            Hi {user?.name?.split(" ")[0]}! Send a message to start the conversation.
          </p>
        )}
        {messages.map((m, i) => {
          const isMine = m.sender === user?._id;
          return (
            <div key={m._id ?? i} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
              <div className="max-w-[75%]">
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
                    <img src={m.image.url} alt="Shared attachment" className="max-h-48 rounded-lg" />
                  ) : (
                    m.text
                  )}
                </div>
                <div className={`mt-0.5 text-[10px] text-[var(--foreground-muted)] ${isMine ? "text-right" : ""}`}>
                  {formatTime(m.createdAt)} {isMine && m.seen ? "· Seen" : ""}
                </div>
              </div>
            </div>
          );
        })}
        {isAdminTyping && (
          <div className="w-fit rounded-2xl bg-[var(--surface-elevated)] px-3.5 py-2 text-sm text-[var(--foreground-muted)]">
            typing…
          </div>
        )}
      </div>

      <div className="relative border-t border-[var(--border)] p-3">
        {showEmoji && (
          <div className="absolute bottom-14 left-3">
            <EmojiPicker
              onSelect={(emoji) => {
                handleDraftChange(draft + emoji);
                setShowEmoji(false);
              }}
            />
          </div>
        )}
        <div className="flex items-center gap-2">
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            aria-label="Send image"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[var(--foreground-muted)] hover:bg-[var(--surface-elevated)]"
          >
            <FiImage size={16} />
          </button>
          <button
            type="button"
            onClick={() => setShowEmoji((v) => !v)}
            aria-label="Emoji"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[var(--foreground-muted)] hover:bg-[var(--surface-elevated)]"
          >
            <FiSmile size={16} />
          </button>
          <input
            value={draft}
            onChange={(e) => handleDraftChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Message..."
            className="flex-1 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2 text-sm outline-none focus:border-[var(--accent)]"
          />
          <button
            type="button"
            onClick={handleSend}
            aria-label="Send"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[var(--accent-foreground)]"
            style={{ background: "var(--gradient-accent)" }}
          >
            <FiSend size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
