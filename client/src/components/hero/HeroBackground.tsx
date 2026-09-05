export function HeroBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* =====================================================
          BASE GRADIENT
          Light / Dark — automatically changes with theme
      ====================================================== */}

      <div
        className="absolute inset-0"
        style={{
          background: "var(--hero-bg)",
        }}
      />

      {/* =====================================================
          DOT GRID
      ====================================================== */}

      <div
        className="absolute right-0 top-0 h-full w-[65%]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--hero-dot-color) 1px, transparent 1px)",

          backgroundSize: "28px 28px",

          opacity: "var(--hero-dot-opacity)",

          maskImage: `
            radial-gradient(
              ellipse 75% 65% at 65% 45%,
              black 0%,
              black 45%,
              rgba(0,0,0,0.8) 60%,
              transparent 82%
            )
          `,

          WebkitMaskImage: `
            radial-gradient(
              ellipse 75% 65% at 65% 45%,
              black 0%,
              black 45%,
              rgba(0,0,0,0.8) 60%,
              transparent 82%
            )
          `,
        }}
      />

      {/* =====================================================
          RED / ACCENT GLOW
      ====================================================== */}

      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[36rem]
          w-[36rem]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          blur-3xl
        "
        style={{
          background: "var(--hero-glow-color)",
          opacity: "var(--hero-glow-opacity)",
        }}
      />
    </div>
  );
}
