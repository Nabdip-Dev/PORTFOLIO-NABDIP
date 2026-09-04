"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Image from "next/image";

import { fetchAbout } from "@/services/api/aboutService";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";
import { Skeleton } from "@/components/ui/Skeleton";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease,
    },
  },
};

export function About() {
  const {
    data: about,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["about"],
    queryFn: fetchAbout,
  });

  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="
        relative isolate
        overflow-visible
        py-24 sm:py-32 lg:py-40

        bg-[var(--background)]
        text-[var(--foreground)]

        transition-colors
        duration-700
      "
    >
      {/* =========================================================
          LUXURY THEME BACKGROUND

          IMPORTANT:
          overflow-hidden is only used here.
          It does NOT affect sticky photo.
      ========================================================= */}

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* -------------------------------------------------------
            LIGHT / DARK MAIN GRADIENT

            Add --about-gradient in globals.css
        ------------------------------------------------------- */}

        <div
          className="
            absolute
            inset-0
            bg-[var(--about-gradient)]

            transition-all
            duration-700
          "
        />

        {/* -------------------------------------------------------
            EXTRA RED AMBIENT GLOW
        ------------------------------------------------------- */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1.5,
            ease,
          }}
          className="
            absolute
            -left-40
            top-24
            h-[420px]
            w-[420px]
            rounded-full
            bg-red-500/[0.07]
            blur-[130px]

            dark:bg-red-600/[0.13]
          "
        />

        <div
          className="
            absolute
            -right-40
            top-[45%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-red-500/[0.05]
            blur-[150px]

            dark:bg-red-900/[0.16]
          "
        />

        {/* -------------------------------------------------------
            CENTER LIGHT
        ------------------------------------------------------- */}

        <div
          className="
            absolute
            left-1/2
            top-0
            h-[300px]
            w-[700px]
            -translate-x-1/2
            rounded-full
            bg-red-500/[0.035]
            blur-[130px]

            dark:bg-red-500/[0.07]
          "
        />

        {/* -------------------------------------------------------
            SUBTLE GRID
        ------------------------------------------------------- */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.025]

            [background-image:linear-gradient(rgba(0,0,0,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.45)_1px,transparent_1px)]
            [background-size:80px_80px]

            dark:opacity-[0.035]
            dark:[background-image:linear-gradient(rgba(255,255,255,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.45)_1px,transparent_1px)]
          "
        />

        {/* -------------------------------------------------------
            TOP RADIAL LIGHT
        ------------------------------------------------------- */}

        <div
          className="
            absolute
            inset-0

            bg-[radial-gradient(circle_at_50%_10%,rgba(229,9,20,0.035),transparent_35%)]

            dark:bg-[radial-gradient(circle_at_50%_10%,rgba(229,9,20,0.09),transparent_35%)]
          "
        />

        {/* -------------------------------------------------------
            BOTTOM FADE
        ------------------------------------------------------- */}

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-64

            bg-gradient-to-t
            from-black/[0.035]
            to-transparent

            dark:from-black/60
          "
        />
      </div>

      <Container>
        {/* =========================================================
            SECTION HEADING
        ========================================================= */}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.3,
          }}
        >
          <motion.div variants={fadeUp}>
            <SectionHeading
              eyebrow={t.sections.about.eyebrow}
              title={t.sections.about.title}
            />
          </motion.div>
        </motion.div>

        {/* =========================================================
            LOADING STATE
        ========================================================= */}

        {isLoading && (
          <div
            className="
              mt-16
              grid
              items-start
              gap-12
              lg:grid-cols-[380px_minmax(0,1fr)]
              lg:gap-20
            "
          >
            <Skeleton
              className="
                aspect-[4/5]
                w-full
                rounded-[2rem]
              "
            />

            <div className="space-y-5">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-11/12" />
              <Skeleton className="h-5 w-10/12" />
              <Skeleton className="h-5 w-8/12" />

              <div
                className="
                  grid
                  grid-cols-2
                  gap-4
                  pt-6
                  sm:grid-cols-4
                "
              >
                {[0, 1, 2, 3].map((item) => (
                  <Skeleton
                    key={item}
                    className="
                      h-28
                      w-full
                      rounded-2xl
                    "
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            ERROR STATE
        ========================================================= */}

        {!isLoading && (isError || !about) && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
              ease,
            }}
            className="
              mx-auto
              mt-16
              max-w-xl
              rounded-2xl
              border
              border-[var(--accent)]/20
              bg-[var(--accent)]/[0.04]
              p-8
              text-center
            "
          >
            <div
              className="
                mx-auto
                mb-4
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                border
                border-[var(--accent)]/30
                bg-[var(--accent)]/10
                text-lg
                font-semibold
                text-[var(--accent)]
              "
            >
              !
            </div>

            <p
              className="
                text-sm
                text-[var(--foreground-muted)]
              "
            >
              About data could not be loaded. Check API or network
              connection.
            </p>
          </motion.div>
        )}

        {/* =========================================================
            MAIN CONTENT
        ========================================================= */}

        {!isLoading && about && !isError && (
          <div
            className="
              mt-16
              grid
              items-start
              gap-14
              lg:grid-cols-[380px_minmax(0,1fr)]
              lg:gap-20
            "
          >
            {/* =====================================================
                STICKY PHOTO
            ====================================================== */}

            {about.photo?.url ? (
              <div
                className="
                  relative
                  lg:sticky
                  lg:top-24
                  lg:self-start
                "
              >
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 35,
                    scale: 0.96,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.9,
                    ease,
                  }}
                  className="group relative"
                >
                  {/* PHOTO GLOW */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      -inset-5
                      rounded-[2.5rem]
                      bg-[var(--accent)]
                      opacity-[0.10]
                      blur-2xl

                      transition-all
                      duration-700

                      group-hover:opacity-[0.20]
                      group-hover:blur-3xl
                    "
                  />

                  {/* PHOTO FRAME */}

                  <div
                    className="
                      relative
                      rounded-[2rem]
                      border
                      border-[var(--glass-border)]
                      bg-[var(--glass-bg)]
                      p-2

                      shadow-[0_30px_80px_rgba(0,0,0,0.12)]

                      backdrop-blur-xl

                      transition-all
                      duration-500

                      group-hover:border-[var(--accent)]/25

                      dark:shadow-[0_30px_90px_rgba(0,0,0,0.55)]
                    "
                  >
                    {/* IMAGE */}

                    <div
                      className="
                        relative
                        aspect-[4/5]
                        overflow-hidden
                        rounded-[1.5rem]
                        bg-[var(--surface)]
                      "
                    >
                      <Image
                        src={about.photo.url}
                        alt="Profile photo"
                        fill
                        sizes="(max-width: 1024px) 100vw, 380px"
                        className="
                          object-cover

                          grayscale-[15%]

                          transition-all
                          duration-[1200ms]
                          ease-out

                          group-hover:scale-105
                          group-hover:grayscale-0
                        "
                        priority
                      />

                      {/* CINEMATIC OVERLAY */}

                      <div
                        className="
                          absolute
                          inset-0
                          bg-gradient-to-t
                          from-black/65
                          via-black/5
                          to-transparent
                        "
                      />

                      {/* RED LIGHT */}

                      <div
                        className="
                          absolute
                          -right-24
                          -top-24
                          h-56
                          w-56
                          rounded-full
                          bg-[var(--accent)]/25
                          blur-3xl

                          transition-all
                          duration-700

                          group-hover:bg-[var(--accent)]/45
                        "
                      />

                      {/* LABEL */}

                      <div
                        className="
                          absolute
                          bottom-5
                          left-5
                          flex
                          items-center
                          gap-2
                          rounded-full
                          border
                          border-white/20
                          bg-black/35
                          px-4
                          py-2
                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-[0.25em]
                          text-white
                          backdrop-blur-md
                        "
                      >
                        <span
                          className="
                            h-1.5
                            w-1.5
                            rounded-full
                            bg-[var(--accent)]
                            shadow-[0_0_12px_rgba(229,9,20,1)]
                          "
                        />

                        About Me
                      </div>
                    </div>
                  </div>

                  {/* BOTTOM RIGHT DECORATION */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      -bottom-3
                      -right-3
                      h-20
                      w-20
                      rounded-br-[2rem]
                      border-b-2
                      border-r-2
                      border-[var(--accent)]/50

                      transition-all
                      duration-500

                      group-hover:border-[var(--accent)]
                    "
                  />

                  {/* TOP LEFT DECORATION */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      -left-3
                      -top-3
                      h-16
                      w-16
                      rounded-tl-[1.5rem]
                      border-l
                      border-t
                      border-[var(--border)]
                    "
                  />
                </motion.div>
              </div>
            ) : (
              <div className="hidden lg:block" />
            )}

            {/* =====================================================
                RIGHT SIDE CONTENT
            ====================================================== */}

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.08,
              }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.12,
                  },
                },
              }}
              className="min-w-0"
            >
              {/* =================================================
                  INTRODUCTION
              ================================================== */}

              <motion.div
                variants={fadeUp}
                className="mb-8"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="
                      h-px
                      w-10
                      bg-gradient-to-r
                      from-[var(--accent)]
                      to-transparent
                    "
                  />

                  <span
                    className="
                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-[0.3em]
                      text-[var(--accent)]
                    "
                  >
                    Introduction
                  </span>
                </div>
              </motion.div>

              {/* =================================================
                  BIOGRAPHY
              ================================================== */}

              <motion.div variants={fadeUp}>
                <p
                  className="
                    max-w-3xl
                    whitespace-pre-line
                    text-lg
                    leading-[1.9]
                    text-[var(--foreground-muted)]
                    sm:text-xl
                  "
                >
                  {about.biography}
                </p>
              </motion.div>

              {/* =================================================
                  ACHIEVEMENTS
              ================================================== */}

              {about.achievements &&
                about.achievements.length > 0 && (
                  <motion.div
                    variants={fadeUp}
                    className="mt-14"
                  >
                    {/* HEADING */}

                    <div className="mb-6 flex items-center gap-4">
                      <h3
                        className="
                          shrink-0
                          text-xs
                          font-semibold
                          uppercase
                          tracking-[0.25em]
                          text-[var(--foreground)]
                        "
                      >
                        Highlights
                      </h3>

                      <div
                        className="
                          h-px
                          flex-1
                          bg-gradient-to-r
                          from-[var(--border)]
                          to-transparent
                        "
                      />
                    </div>

                    {/* ITEMS */}

                    <div className="space-y-3">
                      {about.achievements.map(
                        (item, index) => (
                          <motion.div
                            key={`${item}-${index}`}
                            initial={{
                              opacity: 0,
                              x: -25,
                            }}
                            whileInView={{
                              opacity: 1,
                              x: 0,
                            }}
                            viewport={{
                              once: true,
                              amount: 0.25,
                            }}
                            transition={{
                              duration: 0.6,
                              delay: index * 0.08,
                              ease,
                            }}
                            whileHover={{
                              x: 7,
                              transition: {
                                duration: 0.25,
                              },
                            }}
                            className="
                              group
                              flex
                              items-start
                              gap-4
                              rounded-2xl
                              border
                              border-[var(--border)]
                              bg-[var(--glass-bg)]
                              p-4

                              transition-all
                              duration-300

                              hover:border-[var(--accent)]/30
                              hover:bg-[var(--accent)]/[0.04]
                              hover:shadow-[0_10px_35px_rgba(229,9,20,0.08)]
                            "
                          >
                            {/* NUMBER */}

                            <span
                              className="
                                flex
                                h-8
                                w-8
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-[var(--accent)]/30
                                bg-[var(--accent)]/10
                                text-[10px]
                                font-bold
                                text-[var(--accent)]

                                transition-all
                                duration-300

                                group-hover:border-[var(--accent)]
                                group-hover:bg-[var(--accent)]
                                group-hover:text-white
                              "
                            >
                              {String(index + 1).padStart(
                                2,
                                "0",
                              )}
                            </span>

                            {/* TEXT */}

                            <span
                              className="
                                pt-1
                                text-sm
                                leading-7
                                text-[var(--foreground-muted)]
                              "
                            >
                              {item}
                            </span>
                          </motion.div>
                        ),
                      )}
                    </div>
                  </motion.div>
                )}

              {/* =================================================
                  STATS
              ================================================== */}

              {about.stats &&
                about.stats.length > 0 && (
                  <motion.div
                    variants={fadeUp}
                    className="mt-14"
                  >
                    {/* HEADING */}

                    <div className="mb-6 flex items-center gap-4">
                      <h3
                        className="
                          shrink-0
                          text-xs
                          font-semibold
                          uppercase
                          tracking-[0.25em]
                          text-[var(--foreground)]
                        "
                      >
                        By The Numbers
                      </h3>

                      <div
                        className="
                          h-px
                          flex-1
                          bg-gradient-to-r
                          from-[var(--border)]
                          to-transparent
                        "
                      />
                    </div>

                    {/* STATS */}

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {about.stats.map(
                        (stat, index) => (
                          <motion.div
                            key={`${stat.label}-${index}`}
                            initial={{
                              opacity: 0,
                              y: 25,
                            }}
                            whileInView={{
                              opacity: 1,
                              y: 0,
                            }}
                            viewport={{
                              once: true,
                              amount: 0.35,
                            }}
                            transition={{
                              duration: 0.65,
                              delay: index * 0.1,
                              ease,
                            }}
                            whileHover={{
                              y: -7,
                              transition: {
                                duration: 0.25,
                              },
                            }}
                            className="
                              group
                              relative
                              overflow-hidden
                              rounded-2xl
                              border
                              border-[var(--border)]
                              bg-[var(--glass-bg)]
                              p-5
                              backdrop-blur-xl

                              transition-all
                              duration-300

                              hover:border-[var(--accent)]/30
                              hover:shadow-[0_20px_45px_rgba(229,9,20,0.12)]
                            "
                          >
                            {/* HOVER GLOW */}

                            <div
                              className="
                                pointer-events-none
                                absolute
                                -right-10
                                -top-10
                                h-24
                                w-24
                                rounded-full
                                bg-[var(--accent)]/10
                                blur-2xl
                                opacity-0

                                transition-opacity
                                duration-500

                                group-hover:opacity-100
                              "
                            />

                            <div className="relative">
                              {/* VALUE */}

                              <div
                                className="
                                  font-display
                                  text-3xl
                                  font-semibold
                                  tracking-tight
                                  text-[var(--foreground)]
                                "
                              >
                                <span className="text-[var(--accent)]">
                                  {stat.value}
                                </span>
                              </div>

                              {/* LABEL */}

                              <div
                                className="
                                  mt-2
                                  text-[10px]
                                  font-medium
                                  uppercase
                                  tracking-[0.16em]
                                  text-[var(--foreground-muted)]
                                "
                              >
                                {stat.label}
                              </div>
                            </div>
                          </motion.div>
                        ),
                      )}
                    </div>
                  </motion.div>
                )}

              {/* =================================================
                  BOTTOM ACCENT
              ================================================== */}

              <motion.div
                variants={fadeUp}
                className="mt-14 flex items-center gap-4"
              >
                <div
                  className="
                    h-px
                    w-20
                    bg-gradient-to-r
                    from-[var(--accent)]
                    to-transparent
                  "
                />

                <div
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-[var(--accent)]
                    shadow-[0_0_12px_rgba(229,9,20,0.9)]
                  "
                />

                <div
                  className="
                    h-px
                    flex-1
                    bg-gradient-to-r
                    from-[var(--accent)]/30
                    to-transparent
                  "
                />
              </motion.div>
            </motion.div>
          </div>
        )}
      </Container>
    </section>
  );
}
