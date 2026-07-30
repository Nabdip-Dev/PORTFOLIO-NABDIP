"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { useAuth } from "@/contexts/AuthContext";
import { useChatUI } from "@/contexts/ChatUIContext";
import { ChatAuthPanel } from "./ChatAuthPanel";
import { ChatVerifyPanel } from "./ChatVerifyPanel";
import { ChatWindow } from "./ChatWindow";

/**
 * Floating panel, bottom-right. This is the ONLY place on the whole site
 * that ever shows a login/register form — every other page stays public,
 * per spec. Which inner view renders depends purely on auth state:
 * signed out -> ChatAuthPanel, signed in but unverified -> ChatVerifyPanel,
 * fully verified -> ChatWindow.
 */
export function ChatWidget() {
  const { isOpen, closeChat } = useChatUI();
  const { user, isAuthenticated, isLoading } = useAuth();

  const needsVerification = isAuthenticated && user?.role !== "admin" && !user?.isEmailVerified;

  function renderBody() {
    if (isLoading) {
      return (
        <div className="flex h-full items-center justify-center text-sm text-[var(--foreground-muted)]">
          Loading...
        </div>
      );
    }
    if (!isAuthenticated) return <ChatAuthPanel />;
    if (needsVerification) return <ChatVerifyPanel />;
    return <ChatWindow />;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-5 right-5 z-[60] flex h-[560px] w-[360px] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-card glass shadow-glass"
        >
          <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
            <span className="font-display text-sm font-semibold">
              {!isAuthenticated ? "Sign in to chat" : needsVerification ? "Verify email" : "Chat"}
            </span>
            <button
              type="button"
              onClick={closeChat}
              aria-label="Close chat"
              className="flex h-7 w-7 items-center justify-center rounded-full text-[var(--foreground-muted)] hover:bg-[var(--surface-elevated)]"
            >
              <FiX size={16} />
            </button>
          </div>

          <div className="flex-1 overflow-hidden">{renderBody()}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
