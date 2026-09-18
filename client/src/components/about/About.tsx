"use client";

import { memo } from "react";
import type { CSSProperties } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Image from "next/image";

import { fetchAbout } from "@/services/api/aboutService";
import { Container } from "@/components/ui/Container";
import { useLanguage } from "@/contexts/LanguageContext";
import { Skeleton } from "@/components/ui/Skeleton";
import CircularText from "./CircularText";
import ParticleText from "./ParticleText";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease,
    },
  },
};

const contentContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

/* -------------------------------------------------------------------------- */
/* Achievement                                                               */
/* -------------------------------------------------------------------------- */

const AchievementItem = memo(function AchievementItem({
  item,
  index,
}: {
  item: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -18,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease,
      }}
      whileHover={{
        x: 5,
      }}
      className="
        group
        flex
        min-w-0
        items-start
        gap-2.5
        rounded-2xl
        border
        border-[var(--border)]
        bg-[var(--glass-bg)]
        p-3
        transition-[transform,border-color,background-color]
        duration-300
        ease-out
        hover:border-[var(--accent)]/30
        hover:bg-[var(--accent)]/[0.04]
        xs:gap-3
        sm:gap-4
        sm:p-4
      "
      style={{
        backfaceVisibility: "hidden",
        transform: "translateZ(0)",
      }}
    >
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
          transition-[background-color,border-color,color]
          duration-300
          group-hover:border-[var(--accent)]
          group-hover:bg-[var(--accent)]
          group-hover:text-white
        "
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <span
        className="
          min-w-0
          break-words
          pt-1
          text-xs
          leading-5
          text-[var(--foreground-muted)]
          sm:text-sm
          sm:leading-7
        "
      >
        {item}
      </span>
    </motion.div>
  );
});

/* -------------------------------------------------------------------------- */
/* Stats                                                                      */
/* -------------------------------------------------------------------------- */

const StatCard = memo(function StatCard({
  stat,
  index,
}: {
  stat: {
    value: string;
    label: string;
  };
  index: number;
}) {
  return (
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
        amount: 0.25,
      }}
      transition={{
        duration: 0.55,
        delay: index * 0.07,
        ease,
      }}
      whileHover={{
        y: -5,
      }}
      className="
        group
        relative
        min-w-0
        rounded-2xl
        border
        border-[var(--border)]
        bg-[var(--glass-bg)]
        p-3
        transition-[transform,border-color]
        duration-300
        ease-out
        hover:border-[var(--accent)]/30
        xs:p-3.5
        sm:p-5
      "
      style={{
        backfaceVisibility: "hidden",
        transform: "translateZ(0)",
      }}
    >
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

      <div className="relative min-w-0">
        <div
          className="
            font-display
            text-xl
            font-semibold
            tracking-tight
            text-[var(--foreground)]
            xs:text-2xl
            sm:text-3xl
          "
        >
          <span
            className="
              block
              break-words
              text-[var(--accent)]
            "
          >
            {stat.value}
          </span>
        </div>

        <div
          className="
            mt-1.5
            break-words
            text-[8px]
            font-medium
            uppercase
            leading-4
            tracking-[0.08em]
            text-[var(--foreground-muted)]
            xs:text-[9px]
            sm:mt-2
            sm:text-[10px]
            sm:tracking-[0.16em]
          "
        >
          {stat.label}
        </div>
      </div>
    </motion.div>
  );
});

/* -------------------------------------------------------------------------- */
/* About                                                                      */
/* -------------------------------------------------------------------------- */

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
        relative
        isolate
        bg-[var(--background)]
        py-12
        text-[var(--foreground)]
        transition-colors
        duration-700
        xs:py-14
        sm:py-20
        md:py-24
        lg:py-16
        xl:py-20
      "
    >
      {/* ------------------------------------------------------------------ */}
      {/* BACKGROUND                                                         */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          contain: "paint",
        }}
      >
        <div className="absolute inset-0 bg-[var(--about-gradient)]" />

        <div
          className="
            absolute
            -left-40
            top-20
            h-[300px]
            w-[300px]
            rounded-full
            bg-red-500/[0.07]
            blur-[100px]
            dark:bg-red-600/[0.13]
            sm:h-[380px]
            sm:w-[380px]
            sm:blur-[120px]
            lg:h-[420px]
            lg:w-[420px]
            lg:blur-[130px]
          "
        />

        <div
          className="
            absolute
            -right-40
            top-[45%]
            h-[360px]
            w-[360px]
            rounded-full
            bg-red-500/[0.05]
            blur-[110px]
            dark:bg-red-900/[0.16]
            sm:h-[440px]
            sm:w-[440px]
            sm:blur-[135px]
            lg:h-[500px]
            lg:w-[500px]
            lg:blur-[150px]
          "
        />

        <div
          className="
            absolute
            left-1/2
            top-0
            h-[220px]
            w-[500px]
            -translate-x-1/2
            rounded-full
            bg-red-500/[0.035]
            blur-[100px]
            dark:bg-red-500/[0.07]
            sm:h-[260px]
            sm:w-[600px]
            sm:blur-[115px]
            lg:h-[300px]
            lg:w-[700px]
            lg:blur-[130px]
          "
        />

        <div
          className="
            absolute
            inset-0
            opacity-[0.02]
            [background-image:linear-gradient(rgba(0,0,0,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.45)_1px,transparent_1px)]
            [background-size:60px_60px]
            dark:opacity-[0.03]
            dark:[background-image:linear-gradient(rgba(255,255,255,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.45)_1px,transparent_1px)]
            sm:[background-size:70px_70px]
            lg:[background-size:80px_80px]
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_50%_10%,rgba(229,9,20,0.035),transparent_35%)]
            dark:bg-[radial-gradient(circle_at_50%_10%,rgba(229,9,20,0.09),transparent_35%)]
          "
        />

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-48
            bg-gradient-to-t
            from-black/[0.035]
            to-transparent
            dark:from-black/60
            sm:h-56
            lg:h-64
          "
        />
      </div>

      <Container>
        {/* ---------------------------------------------------------------- */}
        {/* HEADING                                                          */}
        {/* ---------------------------------------------------------------- */}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.3,
          }}
          className="w-full min-w-0"
        >
          <motion.div
            variants={fadeUp}
            className="
              mx-auto
              w-full
              max-w-5xl
              -mt-4
              xs:-mt-6
              sm:-mt-12
              md:-mt-16
              lg:-mt-10
              xl:-mt-16
            "
          >
            <div
              className="
                relative
                -top-12
                h-[105px]
                w-full
                xs:h-[125px]
                sm:h-[175px]
                md:h-[215px]
                lg:h-[230px]
                xl:h-[280px]
              "
              style={
                {
                  "--particle-color": "var(--foreground)",
                  "--particle-accent": "var(--accent)",
                } as CSSProperties
              }
            >
              <ParticleText
                text={t.sections.about.title}
                particleSize={2.2}
                density={4}
                color="var(--foreground)"
                highlightColor="var(--accent)"
                scatter={190}
                gatherDuration={1600}
                stagger={420}
                pointerRepel={42}
                repelRadius={120}
                idleDrift={0.8}
                trigger="mount"
                fontSize="clamp(1.75rem, 10vw, 4rem)"
                fontWeight={800}
                fontFamily="inherit"
                glow
              />
            </div>
          </motion.div>
        </motion.div>

        {/* ---------------------------------------------------------------- */}
        {/* LOADING                                                          */}
        {/* ---------------------------------------------------------------- */}

        {isLoading && (
          <div
            className="
              mt-6
              grid
              min-w-0
              items-start
              gap-8
              xs:mt-8
              sm:mt-10
              md:gap-10
              lg:grid-cols-[minmax(280px,380px)_minmax(0,1fr)]
              lg:gap-16
              xl:gap-20
            "
          >
            <Skeleton
              className="
                mx-auto
                aspect-[4/5]
                w-full
                max-w-[420px]
                rounded-[1.5rem]
                sm:rounded-[2rem]
              "
            />

            <div className="min-w-0 space-y-5">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-11/12" />
              <Skeleton className="h-5 w-10/12" />
              <Skeleton className="h-5 w-8/12" />

              <div
                className="
                  grid
                  grid-cols-2
                  gap-2.5
                  pt-5
                  sm:gap-4
                  sm:pt-6
                  md:grid-cols-4
                "
              >
                {[0, 1, 2, 3].map((item) => (
                  <Skeleton
                    key={item}
                    className="h-20 w-full rounded-2xl sm:h-28"
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* ERROR                                                            */}
        {/* ---------------------------------------------------------------- */}

        {!isLoading && (isError || !about) && (
          <motion.div
            initial={{
              opacity: 0,
              y: 18,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
              ease,
            }}
            className="
              mx-auto
              mt-6
              max-w-xl
              rounded-2xl
              border
              border-[var(--accent)]/20
              bg-[var(--accent)]/[0.04]
              p-5
              text-center
              xs:mt-8
              xs:p-6
              sm:mt-12
              sm:p-8
              lg:mt-8
            "
          >
            <div
              className="
                mx-auto
                mb-4
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                border
                border-[var(--accent)]/30
                bg-[var(--accent)]/10
                text-lg
                font-semibold
                text-[var(--accent)]
                sm:h-12
                sm:w-12
              "
            >
              !
            </div>

            <p
              className="
                text-xs
                leading-5
                text-[var(--foreground-muted)]
                sm:text-sm
              "
            >
              About data could not be loaded. Check API or network connection.
            </p>
          </motion.div>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* MAIN CONTENT                                                     */}
        {/* ---------------------------------------------------------------- */}

        {!isLoading && about && !isError && (
          <div
            className="
              relative
              mx-auto
              grid
              min-w-0
              grid-cols-1
              items-start
              gap-10

              lg:grid-cols-[minmax(320px,380px)_minmax(0,1fr)]
              lg:gap-16

              xl:grid-cols-[minmax(360px,420px)_minmax(0,1fr)]
              xl:gap-20
            "
          >
            {/* ============================================================ */}
            {/* LEFT SIDE                                                     */}
            {/* ============================================================ */}

            {about.photo?.url ? (
              <aside
                className="
                  relative
                  z-20
                  w-full
                  min-w-0
                  self-start

                  lg:sticky
                  lg:top-10
                "
              >
                {/* Circular Text */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-4
                    -top-4
                    z-0
                    xs:-right-6
                    xs:-top-6
                    sm:-right-9
                    sm:-top-9
                    md:-right-11
                    md:-top-11
                    lg:-right-14
                    lg:-top-14
                    xl:-right-15
                    xl:-top-15
                  "
                >
                  <CircularText
                    text="BUILD*CREATE*DESIGN*DEVELOP*REACT*"
                    onHover="speedUp"
                    spinDuration={20}
                    className="custom-class"
                  />
                </div>

                {/* Flip Card */}

                <div
                  className="
                    group
                    relative
                    z-10
                    mx-auto
                    w-full
                    max-w-[420px]
                    [perspective:1600px]
                    sm:w-[92%]
                    lg:w-full
                  "
                >
                  <div
                    className="
                      relative
                      aspect-[5/6]
                      w-full
                      transform-gpu
                      transition-transform
                      duration-[900ms]
                      ease-[cubic-bezier(0.22,1,0.36,1)]
                      [transform-style:preserve-3d]
                      group-hover:[transform:rotateY(180deg)]
                    "
                  >
                    {/* ---------------------------------------------------- */}
                    {/* FRONT                                                */}
                    {/* ---------------------------------------------------- */}

                    <div
                      className="
                        absolute
                        inset-0
                        h-full
                        w-full
                        [backface-visibility:hidden]
                        [-webkit-backface-visibility:hidden]
                      "
                    >
                      <div
                        className="
                          pointer-events-none
                          absolute
                          -inset-2
                          rounded-[2rem]
                          bg-[var(--accent)]
                          opacity-[0.10]
                          blur-xl
                          transition-opacity
                          duration-500
                          group-hover:opacity-[0.18]
                          xs:-inset-2.5
                          sm:-inset-4
                          sm:rounded-[2.5rem]
                          sm:blur-2xl
                        "
                      />

                      <div
                        className="
                          relative
                          h-full
                          w-full
                          rounded-[1.25rem]
                          border
                          border-[var(--glass-border)]
                          bg-[var(--glass-bg)]
                          p-1
                          shadow-[0_20px_55px_rgba(0,0,0,0.12)]
                          transition-[border-color,box-shadow]
                          duration-500
                          group-hover:border-[var(--accent)]/25
                          xs:rounded-[1.5rem]
                          xs:p-1.5
                          sm:rounded-[2rem]
                          sm:p-2
                          sm:shadow-[0_30px_80px_rgba(0,0,0,0.12)]
                          dark:shadow-[0_30px_90px_rgba(0,0,0,0.55)]
                        "
                      >
                        <div
                          className="
                            relative
                            h-full
                            w-full
                            
                            rounded-[1rem]
                            bg-[var(--surface)]
                            xs:rounded-[1.15rem]
                            sm:rounded-[1.5rem]
                          "
                        >
                          <Image
                            src={about.photo.url}
                            alt="Profile photo"
                            fill
                            sizes="
                              (max-width: 480px) 90vw,
                              (max-width: 640px) 86vw,
                              (max-width: 1024px) 70vw,
                              (max-width: 1280px) 380px,
                              420px
                            "
                            priority
                            className="
                              object-cover
                              grayscale-[15%]
                              transform-gpu
                              transition-[transform,filter]
                              duration-[900ms]
                              ease-out
                              group-hover:scale-105
                              group-hover:grayscale-0
                            "
                          />

                          <div
                            className="
                              pointer-events-none
                              absolute
                              inset-0
                              bg-gradient-to-t
                              from-black/65
                              via-black/5
                              to-transparent
                            "
                          />

                          <div
                            className="
                              pointer-events-none
                              absolute
                              -right-16
                              -top-16
                              h-36
                              w-36
                              rounded-full
                              bg-[var(--accent)]/25
                              blur-2xl
                              transition-[background-color]
                              duration-500
                              group-hover:bg-[var(--accent)]/40
                              xs:-right-20
                              xs:-top-20
                              xs:h-44
                              xs:w-44
                              sm:-right-24
                              sm:-top-24
                              sm:h-56
                              sm:w-56
                              sm:blur-3xl
                            "
                          />

                          <div
                            className="
                              absolute
                              bottom-3
                              left-3
                              flex
                              max-w-[calc(100%-1.5rem)]
                              items-center
                              gap-1.5
                              rounded-full
                              border
                              border-white/20
                              bg-black/35
                              px-2.5
                              py-1.5
                              text-[8px]
                              font-semibold
                              uppercase
                              tracking-[0.16em]
                              text-white
                              backdrop-blur-md
                              xs:bottom-4
                              xs:left-4
                              xs:gap-2
                              xs:px-3
                              sm:bottom-5
                              sm:left-5
                              sm:px-4
                              sm:py-2
                              sm:text-[10px]
                              sm:tracking-[0.25em]
                            "
                          >
                            <span
                              className="
                                h-1.5
                                w-1.5
                                shrink-0
                                rounded-full
                                bg-[var(--accent)]
                                shadow-[0_0_12px_rgba(229,9,20,1)]
                              "
                            />

                            About Me
                          </div>
                        </div>
                      </div>

                      <div
                        className="
                          pointer-events-none
                          absolute
                          -bottom-1.5
                          -right-1.5
                          h-10
                          w-10
                          rounded-br-[1.25rem]
                          border-b-2
                          border-r-2
                          border-[var(--accent)]/50
                          transition-[border-color]
                          duration-500
                          group-hover:border-[var(--accent)]
                          xs:-bottom-2
                          xs:-right-2
                          xs:h-12
                          xs:w-12
                          sm:-bottom-3
                          sm:-right-3
                          sm:h-20
                          sm:w-20
                          sm:rounded-br-[2rem]
                        "
                      />

                      <div
                        className="
                          pointer-events-none
                          absolute
                          -left-1.5
                          -top-1.5
                          h-9
                          w-9
                          rounded-tl-[1rem]
                          border-l
                          border-t
                          border-[var(--border)]
                          xs:-left-2
                          xs:-top-2
                          xs:h-11
                          xs:w-11
                          sm:-left-3
                          sm:-top-3
                          sm:h-16
                          sm:w-16
                          sm:rounded-tl-[1.5rem]
                        "
                      />
                    </div>

                    {/* ---------------------------------------------------- */}
                    {/* BACK                                                 */}
                    {/* ---------------------------------------------------- */}

                    <div
                      className="
                        absolute
                        inset-0
                        h-full
                        w-full
                        rounded-[1.25rem]
                        border
                        border-[var(--glass-border)]
                        bg-[var(--glass-bg)]
                        p-1
                        shadow-[0_20px_55px_rgba(0,0,0,0.12)]
                        [backface-visibility:hidden]
                        [-webkit-backface-visibility:hidden]
                        [transform:rotateY(180deg)]
                        xs:rounded-[1.5rem]
                        xs:p-1.5
                        sm:rounded-[2rem]
                        sm:p-2
                        sm:shadow-[0_30px_80px_rgba(0,0,0,0.12)]
                        dark:shadow-[0_30px_90px_rgba(0,0,0,0.55)]
                      "
                    >
                      <div
                        className="
                          relative
                          flex
                          h-full
                          w-full
                          flex-col
                          justify-between
                          rounded-[1rem]
                          bg-[var(--surface)]
                          p-4
                          xs:rounded-[1.15rem]
                          xs:p-5
                          sm:rounded-[1.5rem]
                          sm:p-6
                          md:p-8
                        "
                      >
                        <div
                          className="
                            pointer-events-none
                            absolute
                            -right-16
                            -top-16
                            h-44
                            w-44
                            rounded-full
                            bg-[var(--accent)]/15
                            blur-2xl
                            xs:-right-20
                            xs:-top-20
                            xs:h-52
                            xs:w-52
                            sm:-right-24
                            sm:-top-24
                            sm:h-64
                            sm:w-64
                            sm:blur-3xl
                          "
                        />

                        <div className="relative z-10 min-w-0">
                          <span
                            className="
                              text-[8px]
                              font-semibold
                              uppercase
                              tracking-[0.2em]
                              text-[var(--accent)]
                              xs:text-[9px]
                              sm:text-[10px]
                              sm:tracking-[0.3em]
                            "
                          >
                            About Me
                          </span>

                          <h3
                            className="
                              mt-2
                              break-words
                              text-xl
                              font-bold
                              tracking-tight
                              xs:mt-3
                              xs:text-2xl
                              sm:mt-5
                              sm:text-3xl
                            "
                          >
                            Creative Developer
                          </h3>

                          <p
                            className="
                              mt-2
                              break-words
                              text-[11px]
                              leading-5
                              opacity-70
                              xs:mt-3
                              xs:text-xs
                              xs:leading-6
                              sm:mt-5
                              sm:text-sm
                              sm:leading-7
                            "
                          >
                            I build modern, interactive and visually engaging
                            web experiences using React, Next.js and modern UI
                            technologies.
                          </p>
                        </div>

                        <div
                          className="
                            relative
                            z-10
                            mt-5
                            min-w-0
                            xs:mt-6
                            sm:mt-8
                          "
                        >
                          <p
                            className="
                              mb-2
                              text-[8px]
                              font-semibold
                              uppercase
                              tracking-[0.2em]
                              opacity-50
                              xs:text-[9px]
                              sm:mb-3
                              sm:text-[10px]
                              sm:tracking-[0.3em]
                            "
                          >
                            Technologies
                          </p>

                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {[
                              "React",
                              "Next.js",
                              "TypeScript",
                              "Tailwind",
                            ].map((item) => (
                              <span
                                key={item}
                                className="
                                  rounded-full
                                  border
                                  border-[var(--border)]
                                  bg-white/[0.03]
                                  px-2
                                  py-1
                                  text-[9px]
                                  transition-colors
                                  duration-300
                                  hover:border-[var(--accent)]/50
                                  hover:text-[var(--accent)]
                                  xs:px-2.5
                                  xs:text-[10px]
                                  sm:px-3
                                  sm:py-1.5
                                  sm:text-xs
                                "
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div
                          className="
                            pointer-events-none
                            absolute
                            bottom-3
                            right-3
                            h-9
                            w-9
                            rounded-br-lg
                            border-b
                            border-r
                            border-[var(--accent)]/40
                            xs:bottom-4
                            xs:right-4
                            xs:h-12
                            xs:w-12
                            sm:bottom-5
                            sm:right-5
                            sm:h-16
                            sm:w-16
                            sm:rounded-br-xl
                          "
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            ) : null}

            {/* ============================================================ */}
            {/* RIGHT SIDE — NORMAL PAGE SCROLL                               */}
            {/* ============================================================ */}

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.08,
              }}
              variants={contentContainer}
              className="
                min-w-0
                w-full
              "
            >
              {/* ---------------------------------------------------------- */}
              {/* INTRODUCTION                                               */}
              {/* ---------------------------------------------------------- */}

              <motion.div
                variants={fadeUp}
                className="
                  mb-5
                  min-w-0
                  xs:mb-6
                  sm:mb-8
                "
              >
                <div
                  className="
                    flex
                    min-w-0
                    items-center
                    gap-2.5
                    sm:gap-3
                  "
                >
                  <span
                    className="
                      h-px
                      w-6
                      shrink-0
                      bg-gradient-to-r
                      from-[var(--accent)]
                      to-transparent
                      xs:w-8
                      sm:w-10
                    "
                  />

                  <span
                    className="
                      min-w-0
                      break-words
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.2em]
                      text-[var(--accent)]
                      xs:text-[10px]
                      sm:text-[11px]
                      sm:tracking-[0.3em]
                    "
                  >
                    Introduction
                  </span>
                </div>
              </motion.div>

              {/* ---------------------------------------------------------- */}
              {/* BIOGRAPHY                                                  */}
              {/* ---------------------------------------------------------- */}

              <motion.div
                variants={fadeUp}
                className="min-w-0"
              >
                <p
                  className="
                    max-w-3xl
                    whitespace-pre-line
                    break-words
                    text-sm
                    leading-[1.8]
                    text-[var(--foreground-muted)]
                    xs:text-[15px]
                    sm:text-lg
                    sm:leading-[1.9]
                    md:text-xl
                  "
                >
                  {about.biography}
                </p>
              </motion.div>

              {/* ---------------------------------------------------------- */}
              {/* ACHIEVEMENTS                                               */}
              {/* ---------------------------------------------------------- */}

              {about.achievements &&
                about.achievements.length > 0 && (
                  <motion.div
                    variants={fadeUp}
                    className="
                      mt-8
                      min-w-0
                      xs:mt-10
                      sm:mt-14
                    "
                  >
                    <div
                      className="
                        mb-4
                        flex
                        min-w-0
                        items-center
                        gap-2.5
                        xs:mb-5
                        sm:mb-6
                        sm:gap-4
                      "
                    >
                      <h3
                        className="
                          shrink-0
                          text-[9px]
                          font-semibold
                          uppercase
                          tracking-[0.16em]
                          text-[var(--foreground)]
                          xs:text-[10px]
                          sm:text-xs
                          sm:tracking-[0.25em]
                        "
                      >
                        Highlights
                      </h3>

                      <div
                        className="
                          h-px
                          min-w-0
                          flex-1
                          bg-gradient-to-r
                          from-[var(--border)]
                          to-transparent
                        "
                      />
                    </div>

                    <div className="space-y-2.5 sm:space-y-3">
                      {about.achievements.map((item, index) => (
                        <AchievementItem
                          key={`${item}-${index}`}
                          item={item}
                          index={index}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

              {/* ---------------------------------------------------------- */}
              {/* STATS                                                      */}
              {/* ---------------------------------------------------------- */}

              {about.stats &&
                about.stats.length > 0 && (
                  <motion.div
                    variants={fadeUp}
                    className="
                      mt-8
                      min-w-0
                      xs:mt-10
                      sm:mt-14
                    "
                  >
                    <div
                      className="
                        mb-4
                        flex
                        min-w-0
                        items-center
                        gap-2.5
                        xs:mb-5
                        sm:mb-6
                        sm:gap-4
                      "
                    >
                      <h3
                        className="
                          shrink-0
                          text-[9px]
                          font-semibold
                          uppercase
                          tracking-[0.16em]
                          text-[var(--foreground)]
                          xs:text-[10px]
                          sm:text-xs
                          sm:tracking-[0.25em]
                        "
                      >
                        By The Numbers
                      </h3>

                      <div
                        className="
                          h-px
                          min-w-0
                          flex-1
                          bg-gradient-to-r
                          from-[var(--border)]
                          to-transparent
                        "
                      />
                    </div>

                    <div
                      className="
                        grid
                        min-w-0
                        grid-cols-2
                        gap-2
                        xs:gap-2.5
                        sm:grid-cols-2
                        sm:gap-3
                        md:grid-cols-4
                      "
                    >
                      {about.stats.map((stat, index) => (
                        <StatCard
                          key={`${stat.label}-${index}`}
                          stat={stat}
                          index={index}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

              {/* ---------------------------------------------------------- */}
              {/* DIVIDER                                                    */}
              {/* ---------------------------------------------------------- */}

              <motion.div
                variants={fadeUp}
                className="
                  mt-8
                  flex
                  min-w-0
                  items-center
                  gap-2.5
                  xs:mt-10
                  xs:gap-3
                  sm:mt-14
                  sm:gap-4
                  pb-8
                  lg:pb-16
                "
              >
                <div
                  className="
                    h-px
                    w-8
                    shrink-0
                    bg-gradient-to-r
                    from-[var(--accent)]
                    to-transparent
                    xs:w-12
                    sm:w-20
                  "
                />

                <div
                  className="
                    h-1.5
                    w-1.5
                    shrink-0
                    rounded-full
                    bg-[var(--accent)]
                    shadow-[0_0_12px_rgba(229,9,20,0.9)]
                  "
                />

                <div
                  className="
                    h-px
                    min-w-0
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
