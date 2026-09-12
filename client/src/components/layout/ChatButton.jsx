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
      className="
        group
        fixed
        bottom-20
        right-5
        z-50
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-full
        text-white
        shadow-lg
        transition-transform
        duration-300
        hover:scale-110
      "
      style={{ background: "var(--gradient-accent)" }}
    >

      {/* Soft Live Pulse */}
      <span
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-full
          bg-[var(--accent)]
          opacity-30
          animate-[ping_2.2s_ease-out_infinite]
        "
      />

      {/* Outer Glow */}
      <span
        className="
          pointer-events-none
          absolute
          -inset-1
          rounded-full
          border
          border-[var(--accent)]/40
          opacity-70
          transition-all
          duration-500
          group-hover:border-[var(--accent)]
          group-hover:opacity-100
          group-hover:shadow-[0_0_25px_var(--accent)]
        "
      />

      {/* Rotating Ring */}
      <span
        className="
          pointer-events-none
          absolute
          -inset-[3px]
          rounded-full
          border
          border-transparent
          border-t-white/90
          border-r-white/40
          animate-[spin_4s_linear_infinite]
        "
      />

      {/* Icon */}
      <span
        className="
          relative
          z-10
          flex
          items-center
          justify-center
          transition-transform
          duration-300
          group-hover:rotate-[-8deg]
        "
      >
        <FiMessageCircle size={20} />
      </span>

    </button>
  );
}
