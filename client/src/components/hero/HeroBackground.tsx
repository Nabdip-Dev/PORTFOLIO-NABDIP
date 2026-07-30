/**
 * Deliberately minimal: a single soft, static radial glow behind the hero
 * content. No animated grid, no floating shapes, no mouse-follow effect —
 * those read as decorative rather than premium. This keeps just enough
 * depth to separate the hero from a flat background.
 */
export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute left-1/2 top-1/3 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "var(--gradient-accent)", opacity: 0.12 }}
      />
    </div>
  );
}
