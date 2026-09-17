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
        right-3
        bottom-[calc(5rem+env(safe-area-inset-bottom))]
        z-[9999]
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-full
        text-white
        shadow-lg
        transition-transform
        duration-300

        sm:right-4
        sm:bottom-[calc(5rem+env(safe-area-inset-bottom))]
        sm:h-12
        sm:w-12

        md:right-5
        md:bottom-20
        md:h-12
        md:w-12

        lg:right-6
        lg:bottom-20

        hover:scale-110
        active:scale-95
      "
      style={{
        background: "var(--gradient-accent)",
      }}
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
        <FiMessageCircle
          className="
            h-[18px] w-[18px]
            sm:h-5 sm:w-5
          "
        />
      </span>
    </button>
  );
}
