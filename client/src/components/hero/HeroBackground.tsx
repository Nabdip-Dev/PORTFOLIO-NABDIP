
export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Dot grid layer */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(var(--foreground-muted) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.12,
        }}
      />

      {/* Green glow */}
      <div
        className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background: "#ef4444",
          opacity: 0.2,
        }}
      />
    </div>
  );
}