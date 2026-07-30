"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage();
  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label="Toggle language"
      className="font-mono-tag flex h-7 min-w-7 items-center justify-center rounded-full px-2 text-[11px] font-medium text-[var(--foreground-muted)] transition-colors hover:text-[var(--accent)]"
    >
      {language === "en" ? "বাং" : "EN"}
    </button>
  );
}
