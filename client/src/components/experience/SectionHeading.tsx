"use client";

import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchExperience } from "@/services/api/experienceService";
import { formatMonthYear } from "@/utils/formatDate";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Skeleton } from "@/components/ui/Skeleton";

import { useLanguage } from "@/contexts/LanguageContext";

type ExperienceItem = {
  _id: string;
  role: string;
  company: string;
  description?: string;
  startDate: string;
  endDate: string;
  technologies?: string[];
};

function ExperienceCard({
  item,
  index,
  activeIndex,
  total,
}: {
  item: ExperienceItem;
  index: number;
  activeIndex: number;
  total: number;
}) {
  const active = index === activeIndex;
  const previous = index < activeIndex;
  const future = index > activeIndex;

  const distance = activeIndex - index;

  return (
    <article
      aria-hidden={!active}
      className="
        absolute inset-0
        transition-all
        duration-700
        ease-[cubic-bezier(0.22,1,0.36,1)]
        will-change-transform
      "
      style={{
        zIndex: index + 1,

        opacity: active
          ? 1
          : previous
            ? Math.max(
                0.15,
                0.55 - distance * 0.1,
              )
            : 0,

        visibility: future
          ? "hidden"
          : "visible",

        pointerEvents: active
          ? "auto"
          : "none",

        transform: active
          ? "translate3d(0,0,0) scale(1)"
          : previous
            ? `translate3d(0,${-distance * 12}px,0) scale(${Math.max(
                0.9,
                1 - distance * 0.025,
              )})`
            : "translate3d(105%,0,0) scale(0.96)",
      }}
    >
      <div
        className={`
          relative mx-auto
          h-full
          w-[calc(100%-1rem)]
          max-w-[660px]
          overflow-hidden
          rounded-[1.25rem]
          border
          p-5
          backdrop-blur-xl

          transition-[background-color,border-color,box-shadow]
          duration-700
          ease-[cubic-bezier(0.22,1,0.36,1)]

          sm:rounded-[1.4rem]
          sm:p-6
          lg:p-7

          ${
            active
              ? `
                border-white/30
                bg-[#FD1843]
                shadow-[0_30px_90px_-40px_rgba(253,24,67,0.95)]
              `
              : `
                border-white/15
                bg-[#080808]
                shadow-[0_30px_90px_-35px_rgba(0,0,0,0.8)]
              `
          }
        `}
      >
        {/* =====================================================
            CARD TOP SHINE
        ====================================================== */}
        <div
          className="
            pointer-events-none
            absolute
            left-8
            right-8
            top-0
            h-[2px]
            bg-gradient-to-r
            from-transparent
            via-white
            to-transparent
            opacity-80
          "
        />

        {/* =====================================================
            CARD INNER RED GLOW
        ====================================================== */}
        <div
          className="
            pointer-events-none
            absolute
            -right-24
            -top-24
            h-56
            w-56
            rounded-full
            bg-[#FD1843]/25
            blur-[70px]
          "
        />

        {/* =====================================================
            NUMBER
        ====================================================== */}
        <span
          className={`
            absolute
            right-5
            top-5
            font-mono-tag
            text-[9px]
            tracking-[0.18em]
            transition-colors
            duration-700
            ${
              active
                ? "text-black/45"
                : "text-white/35"
            }
          `}
        >
          {String(index + 1).padStart(2, "0")}

          <span className="mx-1 opacity-50">
            /
          </span>

          {String(total).padStart(2, "0")}
        </span>

        {/* =====================================================
            DATE
        ====================================================== */}
        <div
          className={`
            inline-flex
            max-w-[calc(100%-2rem)]
            items-center
            rounded-full
            border
            px-2.5
            py-1.5
            font-mono-tag
            text-[9px]
            uppercase
            tracking-[0.08em]
            transition-all
            duration-700

            ${
              active
                ? `
                  border-white/35
                  bg-black/[0.10]
                  text-white
                `
                : `
                  border-[#FD1843]/45
                  bg-[#FD1843]/10
                  text-[#FD1843]
                `
            }
          `}
        >
          <span className="truncate">
            {formatMonthYear(item.startDate)}
          </span>

          <span className="mx-1.5 shrink-0 opacity-50">
            —
          </span>

          <span className="truncate">
            {formatMonthYear(item.endDate)}
          </span>
        </div>

        {/* =====================================================
            LABEL
        ====================================================== */}
        <p
          className={`
            mt-5
            font-mono-tag
            text-[8px]
            uppercase
            tracking-[0.25em]
            transition-colors
            duration-700

            ${
              active
                ? "text-black/55"
                : "text-white/45"
            }
          `}
        >
          Professional Experience
        </p>

        {/* =====================================================
            ROLE — CHROME / 3D TEXT
        ====================================================== */}
        <h3
          className="
            mt-2
            max-w-[88%]

            font-display
            text-xl
            font-black
            leading-[0.95]
            tracking-[-0.04em]

            bg-clip-text
            text-transparent

            sm:text-2xl

            transition-all
            duration-700
          "
          style={{
            backgroundImage: active
              ? `
                linear-gradient(
                  180deg,
                  #050505 0%,
                  #050505 18%,
                  #ffffff 42%,
                  #ffffff 55%,
                  #151515 78%,
                  #000000 100%
                )
              `
              : `
                linear-gradient(
                  180deg,
                  #ffffff 0%,
                  #ffffff 25%,
                  #FD1843 48%,
                  #ffffff 70%,
                  #999999 100%
                )
              `,

            textShadow: active
              ? `
                0 1px 0 rgba(255,255,255,0.8),
                0 2px 0 rgba(0,0,0,0.18),
                0 4px 8px rgba(0,0,0,0.18)
              `
              : `
                0 1px 0 rgba(255,255,255,0.15),
                0 3px 8px rgba(0,0,0,0.6)
              `,
          }}
        >
          {item.role}
        </h3>

        {/* =====================================================
            COMPANY
        ====================================================== */}
        <div className="mt-2 flex min-w-0 items-center gap-2">
          <span
            className={`
              h-1.5
              w-1.5
              shrink-0
              rounded-full
              transition-all
              duration-700

              ${
                active
                  ? `
                    bg-white
                    shadow-[0_0_14px_rgba(255,255,255,0.9)]
                  `
                  : `
                    bg-[#FD1843]
                    shadow-[0_0_14px_rgba(253,24,67,0.9)]
                  `
              }
            `}
          />

          <span
            className="
              truncate
              bg-gradient-to-r
              from-black
              via-white
              to-black
              bg-clip-text
              text-transparent
              font-semibold
            "
          >
            {item.company}
          </span>
        </div>

        {/* =====================================================
            DESCRIPTION
        ====================================================== */}
        {item.description && (
          <p
            className="
              mt-4
              max-w-xl

              text-xs
              font-medium
              leading-6

              bg-gradient-to-r
              from-black
              via-white
              to-black

              bg-clip-text
              text-transparent

              sm:text-[13px]
            "
          >
            {item.description}
          </p>
        )}

        {/* =====================================================
            TECHNOLOGIES
        ====================================================== */}
        {item.technologies?.length ? (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {item.technologies.map((tech) => (
              <span
                key={tech}
                className={`
                  rounded-full
                  border
                  px-2
                  py-1
                  font-mono-tag
                  text-[8px]
                  transition-all
                  duration-700

                  ${
                    active
                      ? `
                        border-white/30
                        bg-black/[0.08]
                        text-black/75
                      `
                      : `
                        border-white/15
                        bg-white/[0.04]
                        text-white/65
                      `
                  }
                `}
              >
                {tech}
              </span>
            ))}
          </div>
        ) : null}

        {/* =====================================================
            BOTTOM GLOW
        ====================================================== */}
        <div
          className={`
            pointer-events-none
            absolute
            -bottom-24
            -right-24
            h-52
            w-52
            rounded-full
            blur-[80px]
            transition-all
            duration-700

            ${
              active
                ? "bg-white/15"
                : "bg-[#FD1843]/25"
            }
          `}
        />
      </div>
    </article>
  );
}

export function Experience() {
  const { data: items, isLoading } = useQuery({
    queryKey: ["experience"],
    queryFn: fetchExperience,
  });

  const { t } = useLanguage();

  const experiences =
    (items ?? []) as ExperienceItem[];

  const sectionRef =
    useRef<HTMLElement | null>(null);

  const activeRef = useRef(-1);

  const lockedRef = useRef(false);

  const insideRef = useRef(false);

  const [activeIndex, setActiveIndex] =
    useState(-1);

  /*
   * ------------------------------------------
   * OBSERVE WHEN EXPERIENCE IS IN VIEW
   * ------------------------------------------
   */
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          insideRef.current =
            entry.isIntersecting &&
            entry.intersectionRatio >= 0.65;
        },
        {
          threshold: [0, 0.65, 1],
        },
      );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  /*
   * ------------------------------------------
   * WHEEL
   * ------------------------------------------
   */
  useEffect(() => {
    if (!experiences.length) return;

    let timer:
      | ReturnType<typeof setTimeout>
      | undefined;

    const handleWheel = (
      event: WheelEvent,
    ) => {
      if (!insideRef.current) {
        return;
      }

      if (Math.abs(event.deltaY) < 3) {
        return;
      }

      if (lockedRef.current) {
        event.preventDefault();
        return;
      }

      const current = activeRef.current;

      const down = event.deltaY > 0;
      const up = event.deltaY < 0;

      /*
       * DOWN
       */
      if (down) {
        if (
          current <
          experiences.length - 1
        ) {
          event.preventDefault();

          lockedRef.current = true;

          const next = current + 1;

          activeRef.current = next;

          setActiveIndex(next);

          timer = setTimeout(() => {
            lockedRef.current = false;
          }, 750);

          return;
        }

        return;
      }

      /*
       * UP
       */
      if (up) {
        if (current >= 0) {
          event.preventDefault();

          lockedRef.current = true;

          const previous =
            current - 1;

          activeRef.current =
            previous;

          setActiveIndex(previous);

          timer = setTimeout(() => {
            lockedRef.current = false;
          }, 750);

          return;
        }

        return;
      }
    };

    window.addEventListener(
      "wheel",
      handleWheel,
      {
        passive: false,
      },
    );

    return () => {
      window.removeEventListener(
        "wheel",
        handleWheel,
      );

      if (timer) {
        clearTimeout(timer);
      }

      lockedRef.current = false;
    };
  }, [experiences.length]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="
        relative
        isolate
        h-screen
        w-full
        overflow-hidden
      "
      style={{
        background: `
          radial-gradient(
            ellipse 80% 70% at 8% 12%,
            rgba(253, 24, 67, 0.95) 0%,
            rgba(253, 24, 67, 0.55) 18%,
            transparent 48%
          ),

          radial-gradient(
            ellipse 75% 80% at 92% 88%,
            rgba(0, 0, 0, 0.92) 0%,
            rgba(0, 0, 0, 0.55) 24%,
            transparent 58%
          ),

          radial-gradient(
            ellipse 85% 65% at 50% 45%,
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 255, 255, 0.96) 30%,
            transparent 72%
          ),

          conic-gradient(
            from 210deg at 50% 50%,
            #000000 0deg,
            #000000 52deg,
            #FD1843 118deg,
            #ffffff 185deg,
            #ffffff 235deg,
            #FD1843 292deg,
            #000000 360deg
          )
        `,
        backgroundBlendMode:
          "screen, screen, normal, soft-light",
      }}
    >
      {/* =====================================================
          BACKGROUND GLASS / LIGHT VEIL
      ====================================================== */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-white/[0.18]
          backdrop-blur-[1px]
        "
      />

      {/* =====================================================
          RED ORB
      ====================================================== */}
      <div
        className="
          pointer-events-none
          absolute
          -left-32
          top-[-140px]
          h-[520px]
          w-[520px]
          rounded-full
          bg-[#FD1843]/25
          blur-[100px]
        "
      />

      {/* =====================================================
          BLACK ORB
      ====================================================== */}
      <div
        className="
          pointer-events-none
          absolute
          -bottom-40
          right-[-120px]
          h-[500px]
          w-[500px]
          rounded-full
          bg-black/20
          blur-[110px]
        "
      />

      {/* =====================================================
          WHITE CENTER LIGHT
      ====================================================== */}
      <div
        className="
          pointer-events-none
          absolute
          left-[32%]
          top-[18%]
          h-[420px]
          w-[420px]
          rounded-full
          bg-white/65
          blur-[130px]
        "
      />

      <Container>
        <div
          className="
            relative
            z-10
            flex
            h-screen
            w-full
            items-center
          "
        >
          {/* Loading */}
          {isLoading ? (
            <div className="w-full">
              <SectionHeading
                eyebrow={
                  t.sections.experience.eyebrow
                }
                title={
                  t.sections.experience.title
                }
              />

              <div
                className="
                  mx-auto
                  mt-6
                  max-w-[660px]
                "
              >
                <Skeleton
                  className="
                    h-[330px]
                    w-full
                    rounded-[1.25rem]
                  "
                />
              </div>
            </div>
          ) : experiences.length === 0 ? (
            <div className="w-full">
              <SectionHeading
                eyebrow={
                  t.sections.experience.eyebrow
                }
                title={
                  t.sections.experience.title
                }
              />

              <div
                className="
                  mx-auto
                  mt-6
                  max-w-xl
                  rounded-[1.25rem]
                  border
                  border-black/10
                  bg-white/70
                  px-6
                  py-10
                  text-center
                  backdrop-blur-xl
                "
              >
                <p className="text-sm text-black/60">
                  No experience added yet.
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full">
              <div
                className="
                  grid
                  w-full
                  grid-cols-1
                  items-center
                  gap-8
                  lg:grid-cols-[0.8fr_1.2fr]
                  lg:gap-10
                "
              >
                {/* LEFT */}
                <div className="relative z-20">
                  {/* 
                    Wrapper targets the h2 inside SectionHeading.
                    No change to SectionHeading component required.
                  */}
                  <div
                    className="
                      [&_h2]:bg-[linear-gradient(105deg,#000_0%,#000_18%,#FD1843_38%,#fff_50%,#FD1843_62%,#000_82%,#000_100%)]
                      [&_h2]:bg-clip-text
                      [&_h2]:text-transparent
                      [&_h2]:font-black
                      [&_h2]:drop-shadow-[0_2px_0_rgba(255,255,255,0.9)]
                      [&_h2]:drop-shadow-[0_7px_16px_rgba(253,24,67,0.22)]
                    "
                  >
                    <SectionHeading
                      eyebrow={
                        t.sections.experience.eyebrow
                      }
                      title={
                        t.sections.experience.title
                      }
                    />
                  </div>

                  <div
                    className="
                      mt-5
                      flex
                      w-24
                      items-center
                      gap-3
                    "
                  >
                    <span
                      className="
                        h-px
                        flex-1
                        bg-gradient-to-r
                        from-black/20
                        via-[#FD1843]/50
                        to-transparent
                      "
                    />

                    <span
                      className="
                        h-1.5
                        w-1.5
                        rotate-45
                        bg-[#FD1843]
                        shadow-[0_0_14px_rgba(253,24,67,0.8)]
                      "
                    />

                    <span
                      className="
                        h-px
                        flex-1
                        bg-gradient-to-r
                        from-transparent
                        via-[#FD1843]/50
                        to-black/20
                      "
                    />
                  </div>

                  <p
                    className="
                      mt-5
                      max-w-sm
                      text-sm
                      font-medium
                      leading-6

                      bg-[linear-gradient(
                        105deg,
                        #000000 0%,
                        #000000 30%,
                        #ffffff 48%,
                        #ffffff 55%,
                        #000000 75%,
                        #FD1843 100%
                      )]

                      bg-clip-text
                      text-transparent

                      drop-shadow-[0_1px_0_rgba(255,255,255,0.7)]
                    "
                  >
                    Scroll to explore my
                    professional journey.
                  </p>

                  {/* Progress */}
                  <div
                    className="
                      mt-5
                      flex
                      items-center
                      gap-3
                    "
                  >
                    <span
                      className="
                        font-mono-tag
                        text-xs
                        font-bold
                        tracking-widest
                        text-[#FD1843]
                      "
                    >
                      {String(
                        Math.max(
                          activeIndex + 1,
                          0,
                        ),
                      ).padStart(2, "0")}

                      <span className="mx-1 text-black/40">
                        /
                      </span>

                      {String(
                        experiences.length,
                      ).padStart(2, "0")}
                    </span>

                    <div
                      className="
                        h-[2px]
                        w-24
                        overflow-hidden
                        rounded-full
                        bg-black/15
                      "
                    >
                      <div
                        className="
                          h-full
                          bg-gradient-to-r
                          from-black
                          via-[#FD1843]
                          to-white

                          transition-all
                          duration-500
                        "
                        style={{
                          width: `${
                            activeIndex < 0
                              ? 0
                              : ((activeIndex + 1) /
                                  experiences.length) *
                                100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* RIGHT / CARDS */}
                <div
                  className="
                    relative
                    mx-auto
                    h-[330px]
                    w-full
                    max-w-[660px]
                    sm:h-[350px]
                    lg:h-[370px]
                  "
                >
                  {experiences.map(
                    (item, index) => (
                      <ExperienceCard
                        key={item._id}
                        item={item}
                        index={index}
                        activeIndex={
                          activeIndex
                        }
                        total={
                          experiences.length
                        }
                      />
                    ),
                  )}

                  {/* Initial state */}
                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      z-[999]
                      flex
                      items-center
                      justify-center
                      transition-all
                      duration-500
                    "
                    style={{
                      opacity:
                        activeIndex === -1
                          ? 1
                          : 0,

                      visibility:
                        activeIndex === -1
                          ? "visible"
                          : "hidden",
                    }}
                  >
                    <span
                      className="
                        rounded-full
                        border
                        border-[#FD1843]/30
                        bg-black/90
                        px-5
                        py-3
                        text-xs
                        font-semibold
                        shadow-[0_15px_50px_-20px_rgba(253,24,67,0.8)]
                        backdrop-blur-md

                        bg-gradient-to-r
                        from-white
                        via-[#FD1843]
                        to-white

                        bg-clip-text
                        text-transparent
                      "
                    >
                      Scroll to reveal
                      experience
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
