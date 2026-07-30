"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import {
  type ThemeMode,
  type AccentColor,
  DEFAULT_THEME_MODE,
  DEFAULT_ACCENT,
  THEME_STORAGE_KEY,
} from "@/constants/theme";
import { fetchTheme } from "@/services/api/themeService";

interface ThemeContextValue {
  mode: ThemeMode;
  accent: AccentColor;
  setMode: (mode: ThemeMode) => void;
  setAccent: (accent: AccentColor) => void;
  toggleMode: () => void;
  isLoaded: boolean; // true once LocalStorage/DB read has resolved — avoids flash of wrong theme
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface StoredTheme {
  mode: ThemeMode;
  accent: AccentColor;
}

function readStoredTheme(): StoredTheme | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed?.mode && parsed?.accent) return parsed;
    return null;
  } catch {
    return null;
  }
}

function applyThemeToDocument(mode: ThemeMode, accent: AccentColor) {
  const root = document.documentElement;
  root.setAttribute("data-theme", mode);
  root.setAttribute("data-accent", accent);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(DEFAULT_THEME_MODE);
  const [accent, setAccentState] = useState<AccentColor>(DEFAULT_ACCENT);
  const [isLoaded, setIsLoaded] = useState(false);

  // Resolution order: LocalStorage (this visitor's explicit past choice)
  // > admin's DB default (for a first-time visitor) > hardcoded default.
  useEffect(() => {
    let cancelled = false;

    async function resolveInitialTheme() {
      const stored = readStoredTheme();
      if (stored) {
        if (!cancelled) {
          setModeState(stored.mode);
          setAccentState(stored.accent);
          applyThemeToDocument(stored.mode, stored.accent);
          setIsLoaded(true);
        }
        return;
      }

      try {
        const dbTheme = await fetchTheme();
        if (!cancelled) {
          setModeState(dbTheme.mode);
          setAccentState(dbTheme.accent);
          applyThemeToDocument(dbTheme.mode, dbTheme.accent);
        }
      } catch {
        // Backend unreachable — fall back to hardcoded defaults, already applied.
        if (!cancelled) applyThemeToDocument(DEFAULT_THEME_MODE, DEFAULT_ACCENT);
      } finally {
        if (!cancelled) setIsLoaded(true);
      }
    }

    resolveInitialTheme();
    return () => {
      cancelled = true;
    };
  }, []);

  const persist = useCallback((next: StoredTheme) => {
    window.localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(next));
  }, []);

  const setMode = useCallback(
    (next: ThemeMode) => {
      setModeState(next);
      applyThemeToDocument(next, accent);
      persist({ mode: next, accent });
    },
    [accent, persist]
  );

  const setAccent = useCallback(
    (next: AccentColor) => {
      setAccentState(next);
      applyThemeToDocument(mode, next);
      persist({ mode, accent: next });
    },
    [mode, persist]
  );

  const toggleMode = useCallback(() => {
    setMode(mode === "dark" ? "light" : "dark");
  }, [mode, setMode]);

  return (
    <ThemeContext.Provider value={{ mode, accent, setMode, setAccent, toggleMode, isLoaded }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
