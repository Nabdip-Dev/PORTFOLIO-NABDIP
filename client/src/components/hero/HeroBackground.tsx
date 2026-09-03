export function HeroBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Black + Red Gradient — ORIGINAL */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              circle at 70% 40%,
              rgba(255, 0, 0, 0.45) 0%,
              rgba(120, 0, 0, 0.2) 35%,
              rgba(0, 0, 0, 1) 75%
            ),
            linear-gradient(
              135deg,
              #000000 0%,
              #0a0000 50%,
              #1a0000 100%
            )
          `,
        }}
      />

      {/* Dot Grid — শুধু এটুকুই change */}
      <div
        className="absolute right-0 top-0 h-full w-[65%]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255, 255, 255, 0.75) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.35,

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

      {/* Red Glow — ORIGINAL */}
      <div
        className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background: "#ff0000",
          opacity: 0.08,
        }}
      />
    </div>
  );
}
