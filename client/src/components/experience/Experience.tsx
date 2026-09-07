"use client";

import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

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
  total,
  progress,
}: {
  item: ExperienceItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  /*
   * Each card gets a dedicated portion of scroll.
   *
   * Example:
   * 3 cards
   *
   * Card 1: 0.00 → 0.33
   * Card 2: 0.33 → 0.66
   * Card 3: 0.66 → 1.00
   */

  const step = 1 / total;

  const start = index * step;
  const enterStart = start;
  const enterEnd = start + step * 0.28;

  /*
   * =========================================
   * ENTER FROM RIGHT
   * =========================================
   *
   * First state:
   * 110% → completely outside right
   *
   * Final:
   * 0% → center
   */

  const x = useTransform(
    progress,
    [enterStart, enterEnd],
    ["110%", "0%"],
  );

  /*
   * Fade in.
   */

  const opacity = useTransform(
    progress,
    [
      enterStart,
      enterStart + step * 0.08,
      enterEnd,
    ],
    [0, 0.35, 1],
  );

  /*
   * Slight rotation while coming in.
   */

  const rotate = useTransform(
    progress,
    [enterStart, enterEnd],
    [2.5, 0],
  );

  /*
   * =========================================
   * OLD CARD STACK
   * =========================================
   *
   * When NEXT card starts,
   * current card moves slightly up
   * and becomes smaller.
   */

  const stackStart = start + step;

  const stackEnd =
    stackStart + step * 0.28;

  const stackProgress = useTransform(
    progress,
    [stackStart, stackEnd],
    [0, 1],
  );

  const y = useTransform(
    stackProgress,
    [0, 1],
    [0, -18],
  );

  const scale = useTransform(
    stackProgress,
    [0, 1],
    [1, 0.94],
  );

  const stackOpacity = useTransform(
    stackProgress,
    [0, 1],
    [1, 0.78],
  );

  return (
    <motion.article
      style={{
        x,
        y,
        scale,
        rotate,
        opacity: stackOpacity,
        zIndex: index + 1,
      }}
      className="
        absolute
        left-0
        top-0

        h-full
        w-full

        will-change-transform
      "
    >
      <div
        className="
          relative
          mx-auto

          h-full
          w-[calc(100%-1rem)]
          max-w-[660px]

          overflow-hidden

          rounded-[1.25rem]
          sm:rounded-[1.4rem]

          border
          border-[var(--experience-card-border)]

          bg-[var(--experience-card-bg)]

          p-5
          sm:p-6
          lg:p-7

          shadow-[0_25px_70px_-42px_rgba(0,0,0,0.32)]

          backdrop-blur-xl

          dark:shadow-[0_25px_70px_-38px_rgba(0,0,0,0.9)]
        "
      >
        {/* =====================================
            TOP RED LINE
        ===================================== */}

        <div
          className="
            absolute
            left-6
            right-6
            top-0

            h-px

            bg-gradient-to-r
            from-transparent
            via-[var(--accent)]
            to-transparent

            opacity-70
          "
        />

        {/* =====================================
            CARD NUMBER
        ===================================== */}

        <span
          className="
            absolute
            right-5
            top-5

            font-mono-tag
            text-[9px]
            tracking-[0.18em]

            text-black/20
            dark:text-white/20
          "
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* =====================================
            DATE
        ===================================== */}

        <div
          className="
            inline-flex
            max-w-full
            items-center

            rounded-full

            border
            border-[var(--accent)]/15

            bg-[var(--accent)]/[0.045]

            px-2.5
            py-1.5

            font-mono-tag
            text-[9px]
            uppercase
            tracking-[0.08em]

            text-[var(--accent)]
          "
        >
          <span className="truncate">
            {formatMonthYear(item.startDate)}
          </span>

          <span className="mx-1.5 shrink-0 opacity-40">
            —
          </span>

          <span className="truncate">
            {formatMonthYear(item.endDate)}
          </span>
        </div>

        {/* =====================================
            LABEL
        ===================================== */}

        <p
          className="
            mt-5

            font-mono-tag
            text-[8px]
            uppercase
            tracking-[0.25em]

            text-black/40
            dark:text-white/40
          "
        >
          Professional Experience
        </p>

        {/* =====================================
            ROLE
        ===================================== */}

        <h3
          className="
            mt-2
            max-w-[85%]

            font-display

            text-xl
            font-semibold
            leading-tight
            tracking-[-0.025em]

            text-[#111111]

            sm:text-2xl

            dark:text-white
          "
        >
          {item.role}
        </h3>

        {/* =====================================
            COMPANY
        ===================================== */}

        <div
          className="
            mt-2

            flex
            min-w-0
            items-center
            gap-2

            text-xs

            text-[#555555]

            dark:text-white/55
          "
        >
          <span
            className="
              h-1.5
              w-1.5
              shrink-0
              rounded-full

              bg-[var(--accent)]
            "
          />

          <span className="truncate">
            {item.company}
          </span>
        </div>

        {/* =====================================
            DESCRIPTION
        ===================================== */}

        {item.description && (
          <p
            className="
              mt-4

              max-w-xl

              text-xs
              leading-6

              text-[#555555]

              sm:text-[13px]

              dark:text-white/55
            "
          >
            {item.description}
          </p>
        )}

        {/* =====================================
            TECHNOLOGIES
        ===================================== */}

        {item.technologies?.length ? (
          <div
            className="
              mt-4

              flex
              flex-wrap
              gap-1.5
            "
          >
            {item.technologies.map((tech) => (
              <span
                key={tech}
                className="
                  rounded-full

                  border
                  border-black/[0.07]

                  bg-black/[0.025]

                  px-2
                  py-1

                  font-mono-tag
                  text-[8px]

                  text-[#555555]

                  dark:border-white/[0.08]
                  dark:bg-white/[0.035]
                  dark:text-white/50
                "
              >
                {tech}
              </span>
            ))}
          </div>
        ) : null}

        {/* =====================================
            DECORATIVE GLOW
        ===================================== */}

        <div
          className="
            pointer-events-none

            absolute
            -bottom-20
            -right-20

            h-40
            w-40

            rounded-full

            bg-[var(--accent)]/[0.035]

            blur-3xl

            dark:bg-[var(--accent)]/[0.07]
          "
        />
      </div>
    </motion.article>
  );
}

export function Experience() {
  const { data: items, isLoading } =
    useQuery({
      queryKey: ["experience"],
      queryFn: fetchExperience,
    });

  const { t } = useLanguage();

  const experiences =
    (items ?? []) as ExperienceItem[];

  const stackRef =
    useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: stackRef,

    /*
     * When stack reaches viewport top:
     * progress = 0
     *
     * When stack finishes:
     * progress = 1
     */
    offset: [
      "start start",
      "end end",
    ],
  });

  return (
    <section
      id="experience"
      className="
        relative
        isolate

        overflow-x-clip

        bg-[var(--experience-bg)]

        py-24
        sm:py-28
        lg:py-32
      "
    >
      {/* =====================================
          BACKGROUND
      ===================================== */}

      <div
        className="
          pointer-events-none

          absolute
          right-[-120px]
          top-10

          h-80
          w-80

          rounded-full

          bg-[var(--accent)]/[0.035]

          blur-3xl

          dark:bg-[var(--accent)]/[0.075]
        "
      />

      <div
        className="
          pointer-events-none

          absolute
          bottom-0
          left-[-120px]

          h-72
          w-72

          rounded-full

          bg-[var(--accent)]/[0.025]

          blur-3xl

          dark:bg-[var(--accent)]/[0.06]
        "
      />

      <Container>
        <div className="relative z-10 min-w-0">

          {/* ===================================
              HEADING
          =================================== */}

          <SectionHeading
            eyebrow={
              t.sections.experience.eyebrow
            }
            title={
              t.sections.experience.title
            }
          />

          {/* ===================================
              DIVIDER
          =================================== */}

          <div
            className="
              mx-auto
              mb-14
              mt-7

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
                bg-black/10
                dark:bg-white/10
              "
            />

            <span
              className="
                h-1.5
                w-1.5
                shrink-0
                rotate-45

                bg-[var(--accent)]
              "
            />

            <span
              className="
                h-px
                flex-1
                bg-black/10
                dark:bg-white/10
              "
            />
          </div>

          {/* ===================================
              LOADING
          =================================== */}

          {isLoading ? (
            <div
              className="
                mx-auto
                w-full
                max-w-[660px]
                space-y-4
              "
            >
              {Array.from({
                length: 3,
              }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="
                    h-[280px]
                    w-full

                    rounded-[1.25rem]
                  "
                />
              ))}
            </div>
          ) : experiences.length === 0 ? (
            <div
              className="
                mx-auto
                max-w-xl

                rounded-[1.25rem]

                border
                border-black/10

                bg-white/70

                px-6
                py-12

                text-center

                dark:border-white/10
                dark:bg-white/[0.035]
              "
            >
              <p
                className="
                  text-sm

                  text-[#555555]

                  dark:text-white/55
                "
              >
                No experience added yet.
              </p>
            </div>
          ) : (
            /*
             * =================================
             * SCROLL STACK
             * =================================
             *
             * Each card gets 100vh.
             *
             * 3 cards = 300vh
             *
             * This means the user must scroll
             * through all cards before leaving
             * this section.
             */

            <div
              ref={stackRef}
              style={{
                height: `${
                  experiences.length * 100
                }vh`,
              }}
              className="
                relative
                w-full
              "
            >
              {/* =================================
                  STICKY AREA
              ================================= */}

              <div
                className="
                  sticky
                  top-0

                  flex
                  h-screen
                  w-full

                  items-center
                  justify-center

                  overflow-hidden
                "
              >
                {/*
                 * FIXED CARD STAGE
                 *
                 * No translate-y class here.
                 * This is important because Framer
                 * controls transform itself.
                 */}

                <div
                  className="
                    relative

                    h-[300px]
                    w-full

                    sm:h-[320px]

                    lg:h-[330px]
                  "
                >
                  {experiences.map(
                    (item, index) => (
                      <ExperienceCard
                        key={item._id}
                        item={item}
                        index={index}
                        total={
                          experiences.length
                        }
                        progress={
                          scrollYProgress
                        }
                      />
                    ),
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
