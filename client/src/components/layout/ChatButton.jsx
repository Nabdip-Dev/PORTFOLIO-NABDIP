"use client";

import { FiMessageCircle } from "react-icons/fi";
import { useChatUI } from "@/contexts/ChatUIContext";
import { useLanguage } from "@/contexts/LanguageContext";

export function ChatButton() {
  const { openChat } = useChatUI();
  const { t } = useLanguage();

  return (
    <button
      type="button"
      onClick={openChat}
      aria-label={t.buttons.chat}
      className="fixed bottom-20 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-110"
      style={{ background: "var(--gradient-accent)" }}
    >
      <FiMessageCircle size={20} />
    </button>
  );
}