"use client";

import Image from "next/image";
import type { ComponentType } from "react";
import {
  motion, useAnimationControls, useScroll,
  useVelocity,
  useTransform,
  useSpring
} from "framer-motion";
import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FiDownload,
  FiArrowRight,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiMail,
} from "react-icons/fi";
import CircularText from './CircularText';
import CurvedLoop from './CurvedLoop';

import { fetchHero } from "@/services/api/heroService";
import { useTypewriter } from "@/hooks/useTypewriter";
import { toAttachmentUrl } from "@/utils/cloudinaryUrl";
import { ButtonLink } from "@/components/ui/Button";
import { HeroBackground } from "./HeroBackground";
import profile from "@/assets/pp.png";


// =========================================================
// SOCIAL ICONS
// =========================================================

const SOCIAL_ICONS: Record<
  string,
  ComponentType<{ size?: number }>
> = {
  github: FiGithub,
  linkedin: FiLinkedin,
  twitter: FiTwitter,
  email: FiMail,
};

// =========================================================
// HERO SKELETON
// =========================================================

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

// =========================================================
// HERO
// =========================================================

export function Hero() {
  const {
    data: hero,
    isLoading,
  } = useQuery({
    queryKey: ["hero"],
    queryFn: fetchHero,
  });

  const typedTitle = useTypewriter({
    words: hero?.titles?.length ? hero.titles : [""],
  });

  // =========================================================
  // ANIMATION CONTROLS
  // =========================================================

  const swingControls = useAnimationControls();
  const cardControls = useAnimationControls();
  const hasInitialAnimationPlayed = useRef(false);
  const isHovering = useRef(false);


  useEffect(() => {
    if (isLoading || !hero) return;
    if (hasInitialAnimationPlayed.current) return;

    hasInitialAnimationPlayed.current = true;
    let cancelled = false;

    const playInitialDrop = async () => {
      swingControls.set({
        y: -850,
        rotate: -2,
      });

      cardControls.set({
        rotate: -3,
      });

      await new Promise((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(resolve);
        });
      });

      if (cancelled || isHovering.current) return;

      // =======================================================
      // PHASE 1: FAST FALL (await ছাড়া শুরু করা হলো)
      // =======================================================
      const fallPromise = swingControls.start({
        y: 0,
        transition: {
          type: "spring",
          stiffness: 55,
          damping: 11,
          mass: 1.15,
        },
      });

      // =======================================================
      // OVERLAP DELAY
      // ড্রপ শেষ হওয়ার আগেই স্যুইং শুরু করার জন্য বিরতি
      // (প্রয়োজন অনুযায়ী 350-600ms বাড়িয়ে বা কমিয়ে নিতে পারেন)
      // =======================================================
      await new Promise((res) => setTimeout(res, 450));

      if (cancelled || isHovering.current) return;

      // =======================================================
      // PHASE 2: ROPE & CARD SWING
      // =======================================================
      const ropeSwing = swingControls.start({
        rotate: [0, 9, -7, 5, -3.5, 2.2, -1.2, 0.6, -0.25, 0],
        transition: {
          duration: 3.8,
          ease: "easeOut",
          times: [0, 0.14, 0.3, 0.45, 0.58, 0.7, 0.81, 0.9, 0.96, 1],
        },
      });

      const cardSwing = cardControls.start({
        rotate: [-3, 12, -10, 7, -5, 3.2, -1.8, 0.8, -0.3, 0],
        transition: {
          duration: 4.3,
          ease: "easeOut",
          times: [0, 0.14, 0.3, 0.45, 0.58, 0.7, 0.81, 0.9, 0.96, 1],
        },
      });

      // সব অ্যানিমেশন শেষ হওয়া পর্যন্ত অপেক্ষা
      await Promise.all([fallPromise, ropeSwing, cardSwing]);

      // =======================================================
      // FINAL SETTLE
      // =======================================================
      if (!cancelled && !isHovering.current) {
        await Promise.all([
          swingControls.start({
            y: 0,
            rotate: 0,
            transition: {
              type: "spring",
              stiffness: 70,
              damping: 14,
              mass: 0.9,
            },
          }),
          cardControls.start({
            rotate: 0,
            transition: {
              type: "spring",
              stiffness: 65,
              damping: 13,
              mass: 0.9,
            },
          }),
        ]);
      }
    };

    playInitialDrop();

    return () => {
      cancelled = true;
    };
  }, [hero, isLoading, swingControls, cardControls]);



  // scroll trcking
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 40,
    stiffness: 250,
  });

  const ropeScrollRotate = useTransform(
    smoothVelocity,
    [-1500, 0, 1500],
    [-12, 0, 12]
  );

  const cardScrollRotate = useTransform(
    smoothVelocity,
    [-1500, 0, 1500],
    [-18, 0, 18]
  );

  // =========================================================
  // HOVER START
  //
  // NEVER DROPS FROM TOP AGAIN.
  // =========================================================

  const handleHoverStart = () => {
    isHovering.current = true;

    // ---------------------------------------------------------
    // LANYARD / WHOLE BODY SWING
    // ---------------------------------------------------------

    swingControls.start({
      y: [
        0,
        3,
        -2,
        2.5,
        -1.5,
        1,
        -0.5,
        0,
      ],

      rotate: [
        0,
        -7,
        6,
        -5,
        3.8,
        -2.5,
        1.2,
        0,
      ],

      transition: {
        duration: 3.8,
        ease: "easeInOut",

        times: [
          0,
          0.14,
          0.30,
          0.46,
          0.61,
          0.75,
          0.88,
          1,
        ],
      },
    });

    // ---------------------------------------------------------
    // CARD EXTRA SWING
    // ---------------------------------------------------------

    cardControls.start({
      rotate: [
        0,
        -11,
        9,
        -7,
        5,
        -3,
        1.5,
        0,
      ],

      transition: {
        duration: 4.2,
        ease: "easeInOut",

        times: [
          0,
          0.14,
          0.30,
          0.46,
          0.61,
          0.75,
          0.88,
          1,
        ],
      },
    });
  };

  // =========================================================
  // HOVER END
  // =========================================================

  const handleHoverEnd = () => {
    isHovering.current = false;

    swingControls.start({
      y: 0,
      rotate: 0,

      transition: {
        duration: 1.8,
        ease: [0.22, 1, 0.36, 1],
      },
    });

    cardControls.start({
      rotate: 0,

      transition: {
        duration: 2.1,
        ease: [0.22, 1, 0.36, 1],
      },
    });
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <section
      id="home"
      className="
        relative
        flex
        min-h-screen
        flex-col
        items-center
        justify-center
        overflow-hidden
        px-6
        pt-24
        text-center
        sm:px-10
      "
    >
      <HeroBackground />

      {isLoading || !hero ? (
        <HeroSkeleton />
      ) : (
        <div className="z-50 grid grid-cols-1 gap-10 lg:grid-cols-2">

          {/* left side */}
          <motion.div
            initial="hidden" animate="show" variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.12,
                },
              },
            }}
            className="
              relative
              z-10
              order-2
              flex
              max-w-3xl
              flex-col
              items-start justify-center
              gap-5
              lg:order-1
            "
          >
            {/* NAME */}

            <div>


              <CircularText
                text="REACT*BITS*COMPONENTS*"
                onHover="speedUp"
                spinDuration={20}
                className="custom-class"
              />
            </div>

            <motion.h1
              variants={{
                hidden: {
                  opacity: 0,
                  y: 12,
                },
                show: {
                  opacity: 1,
                  y: 0,
                },
              }}
              className="
                font-display
                text-4xl
                
                text-[var(--accent)]
                font-semibold
                leading-tight
                sm:text-6xl
              "
            >
              {hero.name}
            </motion.h1>

            {/* TYPEWRITER */}

            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: 12,
                },
                show: {
                  opacity: 1,
                  y: 0,
                },
              }}
              className="
                font-mono-tag
                flex
                h-8
                items-center
                text-lg
                text-[var(--foreground-muted)]
                sm:text-xl
              "
            >
              {typedTitle}

              <span
                className="
                  ml-0.5
                  inline-block
                  h-5
                  w-[2px]
                  animate-pulse
                "
                style={{
                  background: "var(--accent)",
                }}
              />
            </motion.div>

            {/* BUTTONS */}

            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: 12,
                },
                show: {
                  opacity: 1,
                  y: 0,
                },
              }}
              className="
                mt-4
                flex
                flex-wrap
                items-center
                justify-center
                gap-3
              "
            >
              <ButtonLink
                href="#contact"
                variant="primary"
              >
                Hire Me <FiArrowRight size={15} />
              </ButtonLink>

              <ButtonLink
                href="#contact"
                variant="secondary"
              >
                Contact
              </ButtonLink>

              {hero.resumeUrl && (
                <ButtonLink
                  href={toAttachmentUrl(hero.resumeUrl)}
                  download
                  variant="secondary"
                >
                  <FiDownload size={15} />
                  Resume
                </ButtonLink>
              )}
            </motion.div>

            {/* SOCIAL LINKS */}

            {hero.socialLinks?.length > 0 && (
              <motion.div
                variants={{
                  hidden: {
                    opacity: 0,
                  },
                  show: {
                    opacity: 1,
                  },
                }}
                className="
                  mt-2
                  flex
                  items-center
                  gap-4
                "
              >
                {hero.socialLinks.map((link) => {
                  const Icon =
                    SOCIAL_ICONS[link.icon] ?? FiGithub;

                  return (
                    <motion.a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.platform}
                      whileHover={{
                        scale: 1.12,
                        y: -2,
                      }}
                      whileTap={{
                        scale: 0.95,
                      }}
                      transition={{
                        duration: 0.15,
                      }}
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        glass
                        text-[var(--foreground-muted)]
                        transition-colors
                        hover:text-[var(--accent)]
                      "
                    >
                      <Icon size={16} />
                    </motion.a>
                  );
                })}
              </motion.div>
            )}
          </motion.div>

          {/*right side*/}
          <div
            className="
              order-1
              flex
              justify-end
              lg:order-2
              max-h-90
            "
          >
            <div
              className="
                relative
                mx-auto
                top-[-150px]
                h-[520px]
                w-[340px]
                overflow-visible
              "
              onMouseEnter={handleHoverStart}
              onMouseLeave={handleHoverEnd}
            >

              {/* =================================================
                  ENTIRE HANGING OBJECT
              ================================================= */}

              <motion.div
                animate={swingControls}
                className="absolute left-1/2 top-0 z-30 h-[500px] w-[220px] -translate-x-1/2 overflow-visible"
                style={{
                  transformOrigin: "50% 0%",
                  rotate: ropeScrollRotate, // <-- স্ক্রোলের ওপর ভিত্তি করে দুলবে
                }}
              >

                {/* =================================================
                    LANYARD
                ================================================= */}

                <svg
                  viewBox="0 0 220 300"
                  className="
                    absolute
                    left-0
                    top-0
                    h-[300px]
                    w-[220px]
                    overflow-visible
                  "
                >
                  <defs>

                    {/* BLACK WOVEN FABRIC */}

                    <linearGradient
                      id="lanyardBlack"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop
                        offset="0%"
                        stopColor="#050505"
                      />

                      <stop
                        offset="25%"
                        stopColor="#171717"
                      />

                      <stop
                        offset="50%"
                        stopColor="#303030"
                      />

                      <stop
                        offset="70%"
                        stopColor="#161616"
                      />

                      <stop
                        offset="100%"
                        stopColor="#050505"
                      />
                    </linearGradient>

                    {/* METAL */}

                    <linearGradient
                      id="metalGradient"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop
                        offset="0%"
                        stopColor="#222"
                      />

                      <stop
                        offset="22%"
                        stopColor="#777"
                      />

                      <stop
                        offset="45%"
                        stopColor="#e4e4e4"
                      />

                      <stop
                        offset="58%"
                        stopColor="#8a8a8a"
                      />

                      <stop
                        offset="82%"
                        stopColor="#333"
                      />

                      <stop
                        offset="100%"
                        stopColor="#111"
                      />
                    </linearGradient>

                    {/* STRAP SHADOW */}

                    <filter id="strapShadow">
                      <feDropShadow
                        dx="2"
                        dy="5"
                        stdDeviation="3"
                        floodColor="#000"
                        floodOpacity=".8"
                      />
                    </filter>

                    {/* METAL SHADOW */}

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

                  {/* =================================================
                      LEFT STRAP
                  ================================================= */}

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

                  {/* =================================================
                      RIGHT STRAP
                  ================================================= */}

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

                  {/* =================================================
                      FABRIC TEXTURE
                  ================================================= */}

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

                  {/* =================================================
                      CENTER JOIN
                  ================================================= */}

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

                  {/* =================================================
                      METAL RING
                  ================================================= */}

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

                  {/* =================================================
                      METAL SWIVEL
                  ================================================= */}

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

                  <rect
                    x="106"
                    y="176"
                    width="3"
                    height="18"
                    rx="2"
                    fill="#fff"
                    opacity=".28"
                  />

                  <rect
                    x="106"
                    y="179"
                    width="8"
                    height="12"
                    rx="4"
                    fill="#111"
                  />

                  {/* =================================================
                      HOOK / CLIP
                  ================================================= */}

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

                  <path
                    d="M120 201 L120 207"
                    stroke="#050505"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>

                {/* =================================================
                    ID CARD
                ================================================= */}

                <motion.div
                  animate={cardControls}
                  className="absolute left-1/2 top-[215px] z-20 h-[275px] w-[205px] -translate-x-1/2"
                  style={{
                    transformOrigin: "50% 0%",
                    perspective: "1000px",
                    rotate: cardScrollRotate, // <-- কার্ড আলাদাভাবে বেশি দুলবে
                  }}
                >

                  {/* CARD THICKNESS */}

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
                  />

                  {/* CARD BACK */}

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
                      border-white/25
                      bg-[#101010]
                      shadow-[0_15px_30px_rgba(0,0,0,.7),inset_0_0_18px_rgba(255,255,255,.04)]
                    "
                    style={{
                      transform:
                        "rotateX(3deg) rotateY(-4deg)",
                    }}
                  >

                    {/* PUNCH HOLE */}

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

                    {/* PROFILE */}

                    <Image
                      src={profile}
                      alt="Profile"
                      fill
                      priority
                      className="
                        object-cover
                        object-top
                        grayscale
                      "
                    />

                    {/* DARK BOTTOM */}

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

                    {/* VIGNETTE */}

                    <div
                      className="
                        absolute
                        inset-0
                        bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,.48))]
                      "
                    />

                    {/* GLASS REFLECTION */}

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

                    {/* INNER BORDER */}

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

                    {/* RED BADGE */}

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
                        <span
                          className="
                            text-[11px]
                            font-bold
                            text-white
                          "
                        >
                          Full Stack
                        </span>
                      </div>

                      <p
                        className="
                          mt-2
                          text-[10px]
                          font-semibold
                          text-white/90
                        "
                      >
                        Web Development
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>

        </div>


      )}

      <div className="w-full z-50 justify-center items-end-safe -mt-15">
        <CurvedLoop marqueeText="Welcome to React Bits ✦" />
        <CurvedLoop
          marqueeText="Be ✦ Creative ✦ With ✦ React ✦ Bits ✦ loremjkhsfhkjsdffhkjsfhkjsdhfkjsdfhkjsfh"
          speed={2}
          curveAmount={400}
          direction="right"
          interactive
          className="custom-text-style"
        />
        <CurvedLoop
        />
      </div>
    </section>
  );
}
