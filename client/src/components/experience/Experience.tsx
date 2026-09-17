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
  const isActive = index === activeIndex;
  const isPrevious = index < activeIndex;
  const isHidden = index > activeIndex;

  const distance = activeIndex - index;

  return (
    <article
      aria-hidden={!isActive}
      className="absolute inset-0 transition-[transform,opacity,visibility] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
      style={{
        zIndex: index + 1,
        opacity: isActive ? 1 : isPrevious ? Math.max(0.12, 0.5 - distance * 0.1) : 0,
        visibility: isHidden ? "hidden" : "visible",
        pointerEvents: isActive ? "auto" : "none",
        transform: isActive
          ? "translate3d(0,0,0) scale(1)"
          : isPrevious
            ? `translate3d(0,${-distance * 12}px,0) scale(${Math.max(
              0.88,
              1 - distance * 0.025,
            )})`
            : "translate3d(110%,0,0) scale(0.96)",
      }}
    >
      <div
        className="
          relative mx-auto h-full w-[calc(100%-1rem)] max-w-[660px]
          overflow-hidden rounded-[1.25rem] border
          border-[var(--experience-card-border)]
          bg-[var(--experience-card-bg)]
          p-5 shadow-[0_25px_70px_-42px_rgba(0,0,0,0.32)]
          backdrop-blur-xl
          sm:rounded-[1.4rem] sm:p-6
          lg:p-7
          dark:shadow-[0_25px_70px_-38px_rgba(0,0,0,0.9)]
        "
      >
        {/* Accent line */}
        <div
          className="
            absolute left-6 right-6 top-0 h-px
            bg-gradient-to-r from-transparent
            via-[var(--accent)] to-transparent opacity-70
          "
        />

        {/* Card number */}
        <span
          className="
            absolute right-5 top-5 font-mono-tag text-[9px]
            tracking-[0.18em] text-black/20 dark:text-white/20
          "
        >
          {String(index + 1).padStart(2, "0")}
          <span className="mx-1 opacity-50">/</span>
          {String(total).padStart(2, "0")}
        </span>

        {/* Date */}
        <div
          className="
            inline-flex max-w-[calc(100%-2rem)] items-center
            rounded-full border border-[var(--accent)]/15
            bg-[var(--accent)]/[0.045] px-2.5 py-1.5
            font-mono-tag text-[9px] uppercase tracking-[0.08em]
            text-[var(--accent)]
          "
        >
          <span className="truncate">
            {formatMonthYear(item.startDate)}
          </span>

          <span className="mx-1.5 shrink-0 opacity-40">—</span>

          <span className="truncate">
            {formatMonthYear(item.endDate)}
          </span>
        </div>

        {/* Label */}
        <p
          className="
            mt-5 font-mono-tag text-[8px] uppercase
            tracking-[0.25em] text-black/40 dark:text-white/40
          "
        >
          Professional Experience
        </p>

        {/* Role */}
        <h3
          className="
            mt-2 max-w-[85%] font-display text-xl font-semibold
            leading-tight tracking-[-0.025em] text-[#111111]
            sm:text-2xl dark:text-white
          "
        >
          {item.role}
        </h3>

        {/* Company */}
        <div
          className="
            mt-2 flex min-w-0 items-center gap-2 text-xs
            text-[#555555] dark:text-white/55
          "
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
          <span className="truncate">{item.company}</span>
        </div>

        {/* Description */}
        {item.description && (
          <p
            className="
              mt-4 max-w-xl text-xs leading-6 text-[#555555]
              sm:text-[13px] dark:text-white/55
            "
          >
            {item.description}
          </p>
        )}

        {/* Technologies */}
        {item.technologies?.length ? (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {item.technologies.map((tech) => (
              <span
                key={tech}
                className="
                  rounded-full border border-black/[0.07]
                  bg-black/[0.025] px-2 py-1 font-mono-tag
                  text-[8px] text-[#555555]
                  dark:border-white/[0.08] dark:bg-white/[0.035]
                  dark:text-white/50
                "
              >
                {tech}
              </span>
            ))}
          </div>
        ) : null}

        {/* Decorative glow */}
        <div
          className="
            pointer-events-none absolute -bottom-20 -right-20
            h-40 w-40 rounded-full bg-[var(--accent)]/[0.035]
            blur-3xl dark:bg-[var(--accent)]/[0.07]
          "
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

  const experiences = (items ?? []) as ExperienceItem[];

  const stackRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(-1);
  const wheelLockedRef = useRef(false);

  const [activeIndex, setActiveIndex] = useState(-1);

  // Keep the ref in sync with React state.
  activeIndexRef.current = activeIndex;

  useEffect(() => {
    if (!experiences.length) return;

    let unlockTimer: ReturnType<typeof setTimeout> | undefined;

    const handleWheel = (event: WheelEvent) => {
      const stack = stackRef.current;
      if (!stack) return;

      const rect = stack.getBoundingClientRect();

      // Only handle scrolling while the experience stack is in view.
      const isInsideStack =
        rect.top <= 1 && rect.bottom > window.innerHeight;

      if (!isInsideStack) return;
      if (Math.abs(event.deltaY) < 2) return;
      if (wheelLockedRef.current) return;

      const current = activeIndexRef.current;
      const scrollingDown = event.deltaY > 0;
      const scrollingUp = event.deltaY < 0;

      // At the last card, let the browser continue down the page.
      if (scrollingDown && current >= experiences.length - 1) {
        return;
      }

      // Before the first card, allow normal upward page scrolling.
      if (scrollingUp && current < 0) {
        return;
      }

      event.preventDefault();

      wheelLockedRef.current = true;

      if (scrollingDown) {
        setActiveIndex((previous) =>
          Math.min(previous + 1, experiences.length - 1),
        );
      } else {
        setActiveIndex((previous) => Math.max(previous - 1, -1));
      }

      // One card step per wheel gesture.
      unlockTimer = setTimeout(() => {
        wheelLockedRef.current = false;
      }, 650);
    };

    window.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      window.removeEventListener("wheel", handleWheel);

      if (unlockTimer) {
        clearTimeout(unlockTimer);
      }

      wheelLockedRef.current = false;
    };
  }, [experiences.length]);

  return (
    <section
      id="experience"
      className="
        relative isolate overflow-x-clip
        bg-[var(--experience-bg)]
        py-24 sm:py-28 lg:py-32
      "
    >
      {/* Background glow */}
      <div
        className="
          pointer-events-none absolute right-[-120px] top-10
          h-80 w-80 rounded-full bg-[var(--accent)]/[0.035]
          blur-3xl dark:bg-[var(--accent)]/[0.075]
        "
      />

      <div
        className="
          pointer-events-none absolute bottom-0 left-[-120px]
          h-72 w-72 rounded-full bg-[var(--accent)]/[0.025]
          blur-3xl dark:bg-[var(--accent)]/[0.06]
        "
      />

      <Container>
        <div className="relative z-10 min-w-0">
          {/* Loading */}
          {isLoading ? (
            <>
              <SectionHeading
                eyebrow={t.sections.experience.eyebrow}
                title={t.sections.experience.title}
              />

              <div className="mx-auto mt-10 w-full max-w-[660px] space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className="h-[280px] w-full rounded-[1.25rem]"
                  />
                ))}
              </div>
            </>
          ) : experiences.length === 0 ? (
            <>
              <SectionHeading
                eyebrow={t.sections.experience.eyebrow}
                title={t.sections.experience.title}
              />

              <div
                className="
                  mx-auto mt-10 max-w-xl rounded-[1.25rem]
                  border border-black/10 bg-white/70 px-6 py-12
                  text-center dark:border-white/10
                  dark:bg-white/[0.035]
                "
              >
                <p className="text-sm text-[#555555] dark:text-white/55">
                  No experience added yet.
                </p>
              </div>
            </>
          ) : (
            /*
             * NEW SCROLL-STEP ANIMATION
             *
             * Each card has one scroll step.
             * An extra viewport gives the final card
             * room to remain sticky before leaving.
             */
            <div
              ref={stackRef}
              style={{
                height: `${(experiences.length + 1) * 30}vh`,
              }}
              className="relative w-full"
            >
              <div
                className="
                  sticky top-0 flex h-screen w-full
                  items-center overflow-hidden
                "
              >
                <div
                  className="
                    grid w-full grid-cols-1 items-center gap-8
                    lg:grid-cols-[0.8fr_1.2fr] lg:gap-10
                  "
                >
                  {/* Sticky left content */}
                  <div className="relative z-20">
                    <SectionHeading
                      eyebrow={t.sections.experience.eyebrow}
                      title={t.sections.experience.title}
                    />

                    <div
                      className="
                        mt-7 flex w-24 items-center gap-3
                      "
                    >
                      <span className="h-px flex-1 bg-black/10 dark:bg-white/10" />
                      <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-[var(--accent)]" />
                      <span className="h-px flex-1 bg-black/10 dark:bg-white/10" />
                    </div>

                    <p className="mt-6 max-w-sm text-sm leading-6 text-[#555555] dark:text-white/55">
                      Scroll to explore my professional journey.
                    </p>

                    <div className="mt-6 flex items-center gap-3">
                      <span
                        className="
                          font-mono-tag text-xs tracking-widest
                          text-[var(--accent)]
                        "
                      >
                        {String(Math.max(activeIndex + 1, 0)).padStart(2, "0")}
                        <span className="mx-1 opacity-40">/</span>
                        {String(experiences.length).padStart(2, "0")}
                      </span>

                      <div className="h-px w-24 overflow-hidden bg-black/10 dark:bg-white/10">
                        <div
                          className="h-full bg-[var(--accent)] transition-all duration-500"
                          style={{
                            width: `${((activeIndex + 1) / experiences.length) * 100
                              }%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card stage */}
                  <div className="relative mx-auto h-[330px] w-full max-w-[660px] sm:h-[350px] lg:h-[370px]">
                    {experiences.map((item, index) => (
                      <ExperienceCard
                        key={item._id}
                        item={item}
                        index={index}
                        activeIndex={activeIndex}
                        total={experiences.length}
                      />
                    ))}

                    {/* Initial hint */}
                    <div
                      className="
                        pointer-events-none absolute inset-0
                        flex items-center justify-center
                        transition-opacity duration-500
                      "
                      style={{
                        opacity: activeIndex === -1 ? 1 : 0,
                      }}
                    >
                      <span
                        className="
                          rounded-full border border-black/10
                          bg-white/70 px-5 py-3 text-xs
                          text-[#555555] shadow-sm
                          dark:border-white/10 dark:bg-black/20
                          dark:text-white/60
                        "
                      >
                        Scroll to reveal experience
                      </span>
                    </div>
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