"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { ACCENT_COLORS, ACCENT_LABELS, ACCENT_SWATCHES } from "@/constants/theme";
import { FiSun, FiMoon } from "react-icons/fi";

/**
 * Compact control meant for the navbar: a mode toggle plus three accent
 * swatches. Every color here reads from the live theme, so once the accent
 * changes this component (and every glass/accent-* surface on the page)
 * updates in the same render — no reload, no per-component color props.
 */
export function ThemeSwitcher() {
  const { mode, accent, toggleMode, setAccent, isLoaded } = useTheme();

  // Avoid rendering swatches with the wrong initial state before the
  // LocalStorage/DB resolution in ThemeContext finishes.
  if (!isLoaded) {
    return <div className="h-10 w-32 rounded-full glass animate-pulse" aria-hidden />;
  }

  return (
    <div className="flex items-center gap-3 rounded-full glass px-3 py-2">
      <button
        type="button"
        onClick={toggleMode}
        aria-label={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        className="flex h-7 w-5 items-center justify-center rounded-full text-[var(--foreground)] transition-colors hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
      >
        {mode === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
      </button>

      {/* <div className="h-5 w-px bg-[var(--border)]" aria-hidden /> */}

      {/* <div className="flex items-center gap-1.5" role="radiogroup" aria-label="Accent color">
        {ACCENT_COLORS.map((color) => {
          const isActive = accent === color;
          return (
            <button
              key={color}
              type="button"
              role="radio"
              aria-checked={isActive}
              aria-label={`${ACCENT_LABELS[color]} accent`}
              onClick={() => setAccent(color)}
              className="relative flex h-6 w-6 items-center justify-center rounded-full transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              style={{
                backgroundColor: ACCENT_SWATCHES[color],
                boxShadow: isActive ? `0 0 0 2px var(--surface), 0 0 0 4px ${ACCENT_SWATCHES[color]}` : "none",
              }}
            />
          );
        })}
      </div> */}
    </div>
  );
}
