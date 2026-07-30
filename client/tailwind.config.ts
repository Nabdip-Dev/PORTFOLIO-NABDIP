import type { Config } from "tailwindcss";

// Accent colors are exposed as CSS variables (set at runtime by ThemeContext)
// so switching accent/theme requires no rebuild — see src/contexts/ThemeContext
// which we'll build in the theme-system step.
const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/layouts/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
          muted: "var(--accent-muted)",
        },
        surface: {
          DEFAULT: "var(--surface)",
          elevated: "var(--surface-elevated)",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backdropBlur: {
        glass: "16px",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.25)",
        soft: "0 2px 20px 0 rgba(0, 0, 0, 0.08)",
      },
      borderRadius: {
        card: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
