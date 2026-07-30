"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface ChatUIContextValue {
  isOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
}

const ChatUIContext = createContext<ChatUIContextValue | undefined>(undefined);

/** Tracks only whether the chat widget is expanded — kept separate from
 * AuthContext/SocketContext so opening/closing the panel never triggers
 * an auth check or socket reconnect. */
export function ChatUIProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ChatUIContext.Provider
      value={{ isOpen, openChat: () => setIsOpen(true), closeChat: () => setIsOpen(false) }}
    >
      {children}
    </ChatUIContext.Provider>
  );
}

export function useChatUI(): ChatUIContextValue {
  const ctx = useContext(ChatUIContext);
  if (!ctx) throw new Error("useChatUI must be used within a ChatUIProvider");
  return ctx;
}
