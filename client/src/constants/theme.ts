export type ThemeMode = "dark" | "light";
export type AccentColor = "purple" | "blue" | "black";

export const THEME_MODES: ThemeMode[] = ["dark", "light"];
export const ACCENT_COLORS: AccentColor[] = ["purple", "blue", "black"];

export const DEFAULT_THEME_MODE: ThemeMode = "dark";
export const DEFAULT_ACCENT: AccentColor = "purple";

export const THEME_STORAGE_KEY = "portfolio-theme";

// Swatch shown in the accent picker UI — matches the --accent value defined
// for that accent in the *dark* mode variant of globals.css (the default).
export const ACCENT_SWATCHES: Record<AccentColor, string> = {
  purple: "#8b5cf6",
  blue: "#3b82f6",
  black: "#e4e4e7",
};

export const ACCENT_LABELS: Record<AccentColor, string> = {
  purple: "Purple",
  blue: "Blue",
  black: "Black",
};
