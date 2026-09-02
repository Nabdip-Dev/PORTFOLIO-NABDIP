"use client";
import Image from "next/image";
import type { ComponentType } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { FiDownload, FiArrowRight, FiGithub, FiLinkedin, FiTwitter, FiMail } from "react-icons/fi";
import { fetchHero } from "@/services/api/heroService";
import { useTypewriter } from "@/hooks/useTypewriter";
import { toAttachmentUrl } from "@/utils/cloudinaryUrl";
import { ButtonLink } from "@/components/ui/Button";
import { HeroBackground } from "./HeroBackground";
import profile from "@/assets/pp.png";


// Maps a social link's `platform` field (stored in the DB) to an icon —
// keeps the schema free of frontend-only concerns like which icon component to render.
const SOCIAL_ICONS: Record<string, ComponentType<{ size?: number }>> = {
  github: FiGithub,
  linkedin: FiLinkedin,
  twitter: FiTwitter,
  email: FiMail,
};

function HeroSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="h-6 w-40 animate-pulse rounded-full bg-[var(--surface-elevated)]" />
      <div className="h-14 w-3/4 max-w-xl animate-pulse rounded-lg bg-[var(--surface-elevated)]" />
      <div className="h-8 w-64 animate-pulse rounded-lg bg-[var(--surface-elevated)]" />
      <div className="mt-4 flex gap-3">
        <div className="h-11 w-32 animate-pulse rounded-full bg-[var(--surface-elevated)]" />
        <div className="h-11 w-32 animate-pulse rounded-full bg-[var(--surface-elevated)]" />
      </div>
    </div>
  );
}

export function Hero() {
  const { data: hero, isLoading } = useQuery({ queryKey: ["hero"], queryFn: fetchHero });
  const typedTitle = useTypewriter({ words: hero?.titles?.length ? hero.titles : [""] });

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 text-center sm:px-10"
    >
      <HeroBackground />

      {isLoading || !hero ? (
        <HeroSkeleton />
      ) : (

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">


          {/* left side */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
            className="relative order-2 lg:order-1 z-10 flex max-w-3xl flex-col items-start gap-5 ]"
          >

            <motion.h1
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
              className="font-display text-4xl font-semibold leading-tight sm:text-6xl"
            >
              {hero.name}
            </motion.h1>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
              className="font-mono-tag flex h-8 items-center text-lg text-[var(--foreground-muted)] sm:text-xl"
            >
              {typedTitle}
              <span className="ml-0.5 inline-block h-5 w-[2px] animate-pulse" style={{ background: "var(--accent)" }} />
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
              className="mt-4 flex flex-wrap items-center justify-center gap-3"
            >
              <ButtonLink href="#contact" variant="primary">
                Hire Me <FiArrowRight size={15} />
              </ButtonLink>
              <ButtonLink href="#contact" variant="secondary">
                Contact
              </ButtonLink>
              {hero.resumeUrl && (
                <ButtonLink href={toAttachmentUrl(hero.resumeUrl)} download variant="secondary">
                  <FiDownload size={15} /> Resume
                </ButtonLink>
              )}
            </motion.div>

            {hero.socialLinks?.length > 0 && (
              <motion.div
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                className="mt-2 flex items-center gap-4"
              >
                {hero.socialLinks.map((link) => {
                  const Icon = SOCIAL_ICONS[link.icon] ?? FiGithub;
                  return (
                    <motion.a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.platform}
                      whileHover={{ scale: 1.12, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="flex h-10 w-10 items-center justify-center rounded-full glass text-[var(--foreground-muted)] transition-colors hover:text-[var(--accent)]"
                    >
                      <Icon size={16} />
                    </motion.a>
                  );
                })}
              </motion.div>
            )}
          </motion.div>

          {/* right side */}
          <div className="order-1 lg:order-2 flex justify-end ">

            <div className="relative mx-auto h-[500px] w-[340px] overflow-visible">

              {/* =====================================================
      ID LANYARD
      Short + flat woven strap + curved
  ====================================================== */}
              <svg
                viewBox="0 0 180 250"
                className="absolute left-1/2 top-0 z-0 h-[250px] w-[180px] -translate-x-1/2 overflow-visible"
              >
                <defs>

                  {/* EXACT same path used by strap + text */}
                  <path
                    id="lanyardCurve"
                    d="
          M90 0
          C87 28 92 45 82 63
          C71 82 74 99 84 116
          C94 133 94 149 85 166
          C78 180 78 194 88 213
        "
                  />

                  {/* Strap gradient */}
                  <linearGradient
                    id="strapGradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#080808" />
                    <stop offset="25%" stopColor="#181818" />
                    <stop offset="50%" stopColor="#292929" />
                    <stop offset="75%" stopColor="#151515" />
                    <stop offset="100%" stopColor="#060606" />
                  </linearGradient>

                  {/* Shadow */}
                  <filter id="lanyardShadow">
                    <feDropShadow
                      dx="2"
                      dy="4"
                      stdDeviation="3"
                      floodColor="#000"
                      floodOpacity=".8"
                    />
                  </filter>
                </defs>


                {/* -----------------------------------------------
        STRAP SHADOW
    ------------------------------------------------ */}
                <use
                  href="#lanyardCurve"
                  fill="none"
                  stroke="#000"
                  strokeWidth="19"
                  strokeLinecap="round"
                  opacity=".7"
                  filter="url(#lanyardShadow)"
                />


                {/* -----------------------------------------------
        ACTUAL FLAT WOVEN LANYARD
    ------------------------------------------------ */}
                <use
                  href="#lanyardCurve"
                  fill="none"
                  stroke="url(#strapGradient)"
                  strokeWidth="15"
                  strokeLinecap="round"
                />


                {/* -----------------------------------------------
        WOVEN EDGE
    ------------------------------------------------ */}
                <use
                  href="#lanyardCurve"
                  fill="none"
                  stroke="#444"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity=".65"
                />

                {/* Center fabric texture */}
                <use
                  href="#lanyardCurve"
                  fill="none"
                  stroke="#555"
                  strokeWidth="1"
                  strokeDasharray="1 4"
                  opacity=".35"
                />


                {/* -----------------------------------------------
        TEXT IS ATTACHED TO THE SAME CURVE
        This is the important part.
    ------------------------------------------------ */}
                <text
                  fill="#a5a5a5"
                  fontSize="7"
                  fontWeight="700"
                  letterSpacing="1.2"
                >
                  <textPath
                    href="#lanyardCurve"
                    startOffset="8%"
                  >
                    PORTFOLIO • FULL STACK • DEVELOPER •
                  </textPath>
                </text>

              </svg>


              {/* =====================================================
      METAL LANYARD CLIP
  ====================================================== */}
              <div
                className="
      absolute
      left-1/2
      top-[195px]
      z-30
      -translate-x-1/2
    "
              >

                {/* Small ring */}
                <div
                  className="
        absolute
        left-1/2
        top-[-13px]
        h-[20px]
        w-[16px]
        -translate-x-1/2
        rounded-t-full
        border-[3px]
        border-[#777]
        border-b-0
      "
                />

                {/* Metal clip */}
                <div
                  className="
        relative
        h-[38px]
        w-[25px]
        rounded-b-[9px]
        border
        border-white/30
        bg-gradient-to-r
        from-[#222]
        via-[#aaa]
        to-[#292929]
        shadow-[0_5px_10px_rgba(0,0,0,.7)]
      "
                >

                  {/* Clip hole */}
                  <div
                    className="
          absolute
          left-1/2
          top-[4px]
          h-[17px]
          w-[9px]
          -translate-x-1/2
          rounded-b-full
          bg-[#050505]
        "
                  />

                  {/* Metal shine */}
                  <div className="absolute left-[4px] top-1 h-[27px] w-[2px] rounded-full bg-white/30" />

                </div>
              </div>


              {/* =====================================================
      ID CARD
  ====================================================== */}
              <div
                className="
      absolute
      left-1/2
      top-[220px]
      z-20
      h-[275px]
      w-[205px]
      -translate-x-1/2
    "
                style={{
                  perspective: "1000px",
                }}
              >

                {/* Card thickness */}
                <div
                  className="
        absolute
        inset-0
        translate-x-[6px]
        translate-y-[7px]
        rounded-[18px]
        bg-[#050507]
        shadow-[0_20px_35px_rgba(0,0,0,.7)]
      "
                  style={{
                    transform: "rotateZ(-7deg)",
                  }}
                />

                {/* Card back edge */}
                <div
                  className="
        absolute
        inset-0
        translate-x-[3px]
        translate-y-[4px]
        rounded-[18px]
        border
        border-white/10
        bg-[#202228]
      "
                  style={{
                    transform: "rotateZ(-7deg)",
                  }}
                />


                {/* MAIN CARD */}
                <div
                  className="
        relative
        h-full
        w-full
        overflow-hidden
        rounded-[18px]
        border
        border-white/30
        bg-[#121419]
        shadow-[0_15px_30px_rgba(0,0,0,.7),inset_0_0_18px_rgba(255,255,255,.04)]
      "
                  style={{
                    transform:
                      "rotateX(3deg) rotateY(-4deg) rotateZ(-7deg)",
                  }}
                >

                  {/* Profile */}
                  <Image
                    src={profile}
                    alt="Profile"
                    fill
                    priority
                    className="object-cover object-top grayscale"
                  />


                  {/* Dark bottom */}
                  <div
                    className="
          absolute
          inset-0
          bg-gradient-to-t
          from-[#07080b]
          via-transparent
          to-transparent
        "
                  />


                  {/* Vignette */}
                  <div
                    className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,.45))]
        "
                  />


                  {/* Glass reflection */}
                  <div
                    className="
          pointer-events-none
          absolute
          -left-[35%]
          top-[-50%]
          h-[180%]
          w-[35%]
          rotate-[25deg]
          bg-gradient-to-r
          from-transparent
          via-white/[0.08]
          to-transparent
        "
                  />


                  {/* Inner border */}
                  <div
                    className="
          pointer-events-none
          absolute
          inset-[3px]
          rounded-[15px]
          border
          border-white/[0.08]
        "
                  />


                  {/* Badge */}
                  <div className="absolute bottom-7 left-0 z-30 w-full text-center">

                    <div
                      className="
            inline-block
            rounded-lg
            border
            border-white/20
            bg-gradient-to-b
            from-[#6255ff]
            to-[#4536d2]
            px-4
            py-[6px]
            shadow-[0_5px_14px_rgba(75,60,220,.5)]
          "
                    >
                      <span className="text-[11px] font-bold text-white">
                        Full Stack
                      </span>
                    </div>

                    <p className="mt-2 text-[10px] font-semibold text-white/90">
                      Web Development
                    </p>

                  </div>

                </div>
              </div>

            </div>

            <div className="relative mx-auto h-[520px] w-[340px] overflow-visible">

              {/* =========================================================
      REALISTIC ID LANYARD
      Two woven straps -> center join -> metal connector
  ========================================================= */}
              <svg
                viewBox="0 0 220 300"
                className="
      absolute
      left-1/2
      top-0
      z-30
      h-[300px]
      w-[220px]
      -translate-x-1/2
      overflow-visible
    "
              >
                <defs>

                  {/* Black woven fabric */}
                  <linearGradient
                    id="lanyardBlack"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#050505" />
                    <stop offset="25%" stopColor="#171717" />
                    <stop offset="50%" stopColor="#303030" />
                    <stop offset="70%" stopColor="#161616" />
                    <stop offset="100%" stopColor="#050505" />
                  </linearGradient>

                  {/* Metal */}
                  <linearGradient
                    id="metalGradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#222" />
                    <stop offset="22%" stopColor="#777" />
                    <stop offset="45%" stopColor="#e4e4e4" />
                    <stop offset="58%" stopColor="#8a8a8a" />
                    <stop offset="82%" stopColor="#333" />
                    <stop offset="100%" stopColor="#111" />
                  </linearGradient>

                  {/* Strap shadow */}
                  <filter id="strapShadow">
                    <feDropShadow
                      dx="2"
                      dy="5"
                      stdDeviation="3"
                      floodColor="#000"
                      floodOpacity=".8"
                    />
                  </filter>

                  {/* Metal shadow */}
                  <filter id="metalShadow">
                    <feDropShadow
                      dx="1"
                      dy="3"
                      stdDeviation="2"
                      floodColor="#000"
                      floodOpacity=".8"
                    />
                  </filter>

                </defs>


                {/* =====================================================
        LEFT SIDE OF NECK STRAP
    ===================================================== */}

                <path
                  d="
        M72 0
        C70 28 66 55 70 78
        C73 101 83 126 97 151
      "
                  fill="none"
                  stroke="#000"
                  strokeWidth="19"
                  strokeLinecap="round"
                  filter="url(#strapShadow)"
                />

                <path
                  d="
        M72 0
        C70 28 66 55 70 78
        C73 101 83 126 97 151
      "
                  fill="none"
                  stroke="url(#lanyardBlack)"
                  strokeWidth="15"
                  strokeLinecap="round"
                />

                {/* Left woven edge */}
                <path
                  d="
        M72 0
        C70 28 66 55 70 78
        C73 101 83 126 97 151
      "
                  fill="none"
                  stroke="#555"
                  strokeWidth="1"
                  opacity=".65"
                />


                {/* =====================================================
        RIGHT SIDE OF NECK STRAP
    ===================================================== */}

                <path
                  d="
        M148 0
        C150 28 154 55 150 78
        C147 101 137 126 123 151
      "
                  fill="none"
                  stroke="#000"
                  strokeWidth="19"
                  strokeLinecap="round"
                  filter="url(#strapShadow)"
                />

                <path
                  d="
        M148 0
        C150 28 154 55 150 78
        C147 101 137 126 123 151
      "
                  fill="none"
                  stroke="url(#lanyardBlack)"
                  strokeWidth="15"
                  strokeLinecap="round"
                />

                {/* Right woven edge */}
                <path
                  d="
        M148 0
        C150 28 154 55 150 78
        C147 101 137 126 123 151
      "
                  fill="none"
                  stroke="#555"
                  strokeWidth="1"
                  opacity=".65"
                />


                {/* =====================================================
        FABRIC TEXTURE
    ===================================================== */}

                <path
                  d="
        M72 0
        C70 28 66 55 70 78
        C73 101 83 126 97 151
      "
                  fill="none"
                  stroke="#777"
                  strokeWidth="1"
                  strokeDasharray="1 4"
                  opacity=".28"
                />

                <path
                  d="
        M148 0
        C150 28 154 55 150 78
        C147 101 137 126 123 151
      "
                  fill="none"
                  stroke="#777"
                  strokeWidth="1"
                  strokeDasharray="1 4"
                  opacity=".28"
                />


                {/* =====================================================
        CENTER STRAP JOIN
    ===================================================== */}

                <path
                  d="M96 151 Q110 164 124 151"
                  fill="none"
                  stroke="#000"
                  strokeWidth="19"
                  strokeLinecap="round"
                />

                <path
                  d="M96 151 Q110 164 124 151"
                  fill="none"
                  stroke="url(#lanyardBlack)"
                  strokeWidth="15"
                  strokeLinecap="round"
                />


                {/* =====================================================
        SMALL METAL RING
    ===================================================== */}

                <ellipse
                  cx="110"
                  cy="171"
                  rx="9"
                  ry="7"
                  fill="none"
                  stroke="#111"
                  strokeWidth="7"
                  filter="url(#metalShadow)"
                />

                <ellipse
                  cx="110"
                  cy="171"
                  rx="8"
                  ry="6"
                  fill="none"
                  stroke="url(#metalGradient)"
                  strokeWidth="3"
                />


                {/* =====================================================
        METAL SWIVEL NECK
    ===================================================== */}

                <rect
                  x="101"
                  y="174"
                  width="18"
                  height="23"
                  rx="5"
                  fill="url(#metalGradient)"
                  stroke="#111"
                  strokeWidth="1"
                  filter="url(#metalShadow)"
                />

                {/* Metal center reflection */}
                <rect
                  x="106"
                  y="176"
                  width="3"
                  height="18"
                  rx="2"
                  fill="#fff"
                  opacity=".28"
                />

                {/* Dark inner slot */}
                <rect
                  x="106"
                  y="179"
                  width="8"
                  height="12"
                  rx="4"
                  fill="#111"
                />


                {/* =====================================================
        HOOK / CLIP
    ===================================================== */}

                <path
                  d="
        M101 195
        L101 208
        C101 216 106 220 110 220
        C115 220 120 216 120 209
        L120 201
      "
                  fill="none"
                  stroke="#111"
                  strokeWidth="9"
                  strokeLinecap="round"
                  filter="url(#metalShadow)"
                />

                <path
                  d="
        M101 195
        L101 208
        C101 216 106 220 110 220
        C115 220 120 216 120 209
        L120 201
      "
                  fill="none"
                  stroke="url(#metalGradient)"
                  strokeWidth="6"
                  strokeLinecap="round"
                />

                {/* Hook opening */}
                <path
                  d="M120 201 L120 207"
                  stroke="#050505"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

              </svg>


              {/* =========================================================
      CARD
  ========================================================= */}
              <div
                className="
      absolute
      left-1/2
      top-[215px]
      z-20
      h-[275px]
      w-[205px]
      -translate-x-1/2
    "
                style={{
                  perspective: "1000px",
                }}
              >

                {/* Card thickness */}
                <div
                  className="
        absolute
        inset-0
        translate-x-[6px]
        translate-y-[7px]
        rounded-[18px]
        bg-[#030303]
        shadow-[0_20px_35px_rgba(0,0,0,.7)]
      "
                  style={{
                    transform: "rotateZ(-7deg)",
                  }}
                />


                {/* Card back */}
                <div
                  className="
        absolute
        inset-0
        translate-x-[3px]
        translate-y-[4px]
        rounded-[18px]
        border
        border-white/10
        bg-[#171717]
      "
                  style={{
                    transform: "rotateZ(-7deg)",
                  }}
                />


                {/* =====================================================
        MAIN CARD
    ===================================================== */}
                <div
                  className="
        relative
        h-full
        w-full
        overflow-hidden
        rounded-[18px]
        border
        border-white/25
        bg-[#101010]
        shadow-[0_15px_30px_rgba(0,0,0,.7),inset_0_0_18px_rgba(255,255,255,.04)]
      "
                  style={{
                    transform:
                      "rotateX(3deg) rotateY(-4deg) rotateZ(-7deg)",
                  }}
                >

                  {/* =================================================
          REAL CARD PUNCH HOLE
      ================================================= */}
                  <div
                    className="
          absolute
          left-1/2
          top-[8px]
          z-50
          h-[8px]
          w-[28px]
          -translate-x-1/2
          rounded-full
          border
          border-black/80
          bg-black/70
          shadow-[inset_0_1px_2px_rgba(255,255,255,.12)]
        "
                  />

                  {/* Hole highlight */}
                  <div
                    className="
          pointer-events-none
          absolute
          left-1/2
          top-[8px]
          z-[51]
          h-[2px]
          w-[17px]
          -translate-x-1/2
          rounded-full
          bg-white/10
        "
                  />


                  {/* Profile */}
                  <Image
                    src={profile}
                    alt="Profile"
                    fill
                    priority
                    className="object-cover object-top grayscale"
                  />


                  {/* Dark bottom */}
                  <div
                    className="
          absolute
          inset-0
          bg-gradient-to-t
          from-[#050505]
          via-transparent
          to-transparent
        "
                  />


                  {/* Vignette */}
                  <div
                    className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,.48))]
        "
                  />


                  {/* Glass reflection */}
                  <div
                    className="
          pointer-events-none
          absolute
          -left-[35%]
          top-[-50%]
          h-[180%]
          w-[35%]
          rotate-[25deg]
          bg-gradient-to-r
          from-transparent
          via-white/[0.08]
          to-transparent
        "
                  />


                  {/* Inner border */}
                  <div
                    className="
          pointer-events-none
          absolute
          inset-[3px]
          rounded-[15px]
          border
          border-white/[0.08]
        "
                  />


                  {/* =================================================
          RED BADGE
      ================================================= */}
                  <div
                    className="
          absolute
          bottom-7
          left-0
          z-30
          w-full
          text-center
        "
                  >

                    <div
                      className="
            inline-block
            rounded-lg
            border
            border-red-500/30
            bg-gradient-to-b
            from-[#ff1a25]
            to-[#b0000b]
            px-4
            py-[6px]
            shadow-[0_5px_14px_rgba(229,9,20,.4)]
          "
                    >
                      <span className="text-[11px] font-bold text-white">
                        Full Stack
                      </span>
                    </div>

                    <p className="mt-2 text-[10px] font-semibold text-white/90">
                      Web Development
                    </p>

                  </div>

                </div>
              </div>

            </div>


          </div>


        </div>

      )}
    </section>
  );
}
