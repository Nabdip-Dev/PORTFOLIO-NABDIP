"use client";

import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";
import { motion } from "framer-motion";

type Variant = "primary" | "secondary" | "ghost";

const VARIANT_STYLES: Record<Variant, React.CSSProperties> = {
  primary: { background: "var(--gradient-accent)", color: "var(--accent-foreground)" },
  secondary: { background: "var(--glass-bg)", border: "1px solid var(--glass-border)", color: "var(--foreground)" },
  ghost: { color: "var(--foreground-muted)" },
};

const baseClass =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] disabled:opacity-60 disabled:pointer-events-none";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

/**
 * The one button primitive for every primary CTA site-wide, replacing the
 * ad-hoc `style={{background: "var(--gradient-accent)"}}` scattered across
 * components. Consistent size, consistent hover/press motion (subtle lift +
 * scale-down on press, not a bounce), consistent focus ring.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", className = "", style, children, ...props },
  ref
) {
  return (
    <motion.button
      ref={ref}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className={`${baseClass} ${className}`}
      style={{ ...VARIANT_STYLES[variant], ...style }}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
});

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
}

/** Same visual system as Button, for CTAs that are actually links (anchor semantics matter for download/external links). */
export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(function ButtonLink(
  { variant = "primary", className = "", style, children, ...props },
  ref
) {
  return (
    <motion.a
      ref={ref}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className={`${baseClass} ${className}`}
      style={{ ...VARIANT_STYLES[variant], ...style }}
      {...(props as any)}
    >
      {children}
    </motion.a>
  );
});
