"use client";

import { memo, useMemo } from "react";
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
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease },
  },
};

const contentContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const AchievementItem = memo(function AchievementItem({
  item,
  index,
}: {
  item: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -18 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease }}
      whileHover={{ x: 5 }}
      className="group flex items-start gap-3 rounded-2xl border border-[var(--border)] bg-[var(--glass-bg)] p-3.5 transition-[transform,border-color,background-color] duration-300 ease-out hover:border-[var(--accent)]/30 hover:bg-[var(--accent)]/[0.04] sm:gap-4 sm:p-4"
      style={{
        backfaceVisibility: "hidden",
        transform: "translateZ(0)",
      }}
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[10px] font-bold text-[var(--accent)] transition-[background-color,border-color,color] duration-300 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white">
        {String(index + 1).padStart(2, "0")}
      </span>

      <span className="min-w-0 pt-1 text-sm leading-6 text-[var(--foreground-muted)] sm:leading-7">
        {item}
      </span>
    </motion.div>
  );
});

const StatCard = memo(function StatCard({
  stat,
  index,
}: {
  stat: { value: string; label: string };
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay: index * 0.07, ease }}
      whileHover={{ y: -5 }}
      className="group relative min-w-0 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--glass-bg)] p-4 transition-[transform,border-color] duration-300 ease-out hover:border-[var(--accent)]/30 sm:p-5"
      style={{
        backfaceVisibility: "hidden",
        transform: "translateZ(0)",
      }}
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[var(--accent)]/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative min-w-0">
        <div className="font-display text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl">
          <span className="break-words text-[var(--accent)]">
            {stat.value}
          </span>
        </div>

        <div className="mt-2 break-words text-[9px] font-medium uppercase tracking-[0.12em] text-[var(--foreground-muted)] sm:text-[10px] sm:tracking-[0.16em]">
          {stat.label}
        </div>
      </div>
    </motion.div>
  );
});

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

  const achievements = useMemo(
    () => about?.achievements ?? [],
    [about?.achievements],
  );

  const stats = useMemo(() => about?.stats ?? [], [about?.stats]);

  return (
    <section
      id="about"
      className="relative isolate overflow-visible bg-[var(--background)] py-16 text-[var(--foreground)] transition-colors duration-700 sm:py-24 md:py-28 lg:py-40"
    >
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        style={{ contain: "paint" }}
      >
        <div className="absolute inset-0 bg-[var(--about-gradient)]" />

        <div className="absolute -left-40 top-24 h-[420px] w-[420px] rounded-full bg-red-500/[0.07] blur-[130px] dark:bg-red-600/[0.13]" />

        <div className="absolute -right-40 top-[45%] h-[500px] w-[500px] rounded-full bg-red-500/[0.05] blur-[150px] dark:bg-red-900/[0.16]" />

        <div className="absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-red-500/[0.035] blur-[130px] dark:bg-red-500/[0.07]" />

        <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(0,0,0,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.45)_1px,transparent_1px)] [background-size:80px_80px] dark:opacity-[0.035] dark:[background-image:linear-gradient(rgba(255,255,255,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.45)_1px,transparent_1px)]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(229,9,20,0.035),transparent_35%)] dark:bg-[radial-gradient(circle_at_50%_10%,rgba(229,9,20,0.09),transparent_35%)]" />

        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/[0.035] to-transparent dark:from-black/60" />
      </div>

      <Container>
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="w-full"
        >
          {/* Heading Name */}
          <motion.div
            variants={fadeUp}
            className="mx-auto -mt-8 w-full max-w-5xl sm:-mt-16 md:-mt-24 lg:-mt-50"
          >
            <div
              className="relative h-[150px] w-full sm:h-[200px] md:h-[240px] lg:h-[320px]"
              style={
                {
                  "--particle-color": "var(--foreground)",
                  "--particle-accent": "var(--accent)",
                } as React.CSSProperties
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
                fontSize="clamp(2.2rem, 11vw, 4rem)"
                fontWeight={800}
                fontFamily="inherit"
                glow
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Loading */}
        {isLoading && (
          <div className="mt-8 grid items-start gap-8 sm:mt-12 md:gap-10 lg:mt-16 lg:grid-cols-[380px_minmax(0,1fr)] lg:gap-20">
            <Skeleton className="mx-auto aspect-[4/5] w-full max-w-[420px] rounded-[2rem]" />

            <div className="min-w-0 space-y-5">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-11/12" />
              <Skeleton className="h-5 w-10/12" />
              <Skeleton className="h-5 w-8/12" />

              <div className="grid grid-cols-2 gap-3 pt-6 sm:grid-cols-4 sm:gap-4">
                {[0, 1, 2, 3].map((item) => (
                  <Skeleton
                    key={item}
                    className="h-24 w-full rounded-2xl sm:h-28"
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Error */}
        {!isLoading && (isError || !about) && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="mx-auto mt-8 max-w-xl rounded-2xl border border-[var(--accent)]/20 bg-[var(--accent)]/[0.04] p-6 text-center sm:mt-12 sm:p-8 lg:mt-16"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 text-lg font-semibold text-[var(--accent)]">
              !
            </div>

            <p className="text-sm text-[var(--foreground-muted)]">
              About data could not be loaded. Check API or network connection.
            </p>
          </motion.div>
        )}

        {/* Main */}
        {!isLoading && about && !isError && (
          <div className="mt-0 grid items-start gap-10 sm:gap-12 md:gap-14 lg:grid-cols-[380px_minmax(0,1fr)] lg:gap-20">
            {/* Photo */}
            {about.photo?.url ? (
              <div className="relative w-full lg:sticky lg:top-24 lg:self-start">
                {/* Circular Text */}
                <div className="pointer-events-none absolute -right-7 -top-7 z-0 sm:-right-10 sm:-top-10 md:-right-12 md:-top-12 lg:-right-15 lg:-top-15">
                  <CircularText
                    text="BUILD*CREATE*DESIGN*DEVELOP*REACT*"
                    onHover="speedUp"
                    spinDuration={20}
                    className="custom-class"
                  />
                </div>

                {/* Full Card Hover Area */}
                <div className="group relative z-10 mx-auto w-full max-w-[420px] [perspective:1600px] sm:w-[92%]">
                  {/* Flip Card */}
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
                    {/* FRONT */}
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
                      {/* Outer Accent Glow */}
                      <div
                        className="
                          pointer-events-none
                          absolute
                          -inset-3
                          rounded-[2.5rem]
                          bg-[var(--accent)]
                          opacity-[0.10]
                          blur-2xl
                          transition-opacity
                          duration-500
                          group-hover:opacity-[0.18]
                          sm:-inset-5
                        "
                      />

                      {/* Main Glass Card */}
                      <div
                        className="
                          relative
                          h-full
                          w-full
                          rounded-[1.5rem]
                          border
                          border-[var(--glass-border)]
                          bg-[var(--glass-bg)]
                          p-1.5
                          shadow-[0_30px_80px_rgba(0,0,0,0.12)]
                          transition-[border-color,box-shadow]
                          duration-500
                          group-hover:border-[var(--accent)]/25
                          sm:rounded-[2rem]
                          sm:p-2
                          dark:shadow-[0_30px_90px_rgba(0,0,0,0.55)]
                        "
                      >
                        {/* Image Container */}
                        <div
                          className="
                            relative
                            h-full
                            w-full
                            overflow-hidden
                            rounded-[1.15rem]
                            bg-[var(--surface)]
                            sm:rounded-[1.5rem]
                          "
                        >
                          <Image
                            src={about.photo.url}
                            alt="Profile photo"
                            fill
                            sizes="(max-width: 640px) 88vw, (max-width: 1024px) 70vw, 350px"
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

                          {/* Bottom Gradient */}
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

                          {/* Top Accent Glow */}
                          <div
                            className="
                              pointer-events-none
                              absolute
                              -right-20
                              -top-20
                              h-48
                              w-48
                              rounded-full
                              bg-[var(--accent)]/25
                              blur-3xl
                              transition-[background-color]
                              duration-500
                              group-hover:bg-[var(--accent)]/40
                              sm:-right-24
                              sm:-top-24
                              sm:h-56
                              sm:w-56
                            "
                          />

                          {/* About Me Badge */}
                          <div
                            className="
                              absolute
                              bottom-4
                              left-4
                              flex
                              max-w-[calc(100%-2rem)]
                              items-center
                              gap-2
                              rounded-full
                              border
                              border-white/20
                              bg-black/35
                              px-3
                              py-1.5
                              text-[9px]
                              font-semibold
                              uppercase
                              tracking-[0.2em]
                              text-white
                              backdrop-blur-md
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

                      {/* Bottom Right Corner */}
                      <div
                        className="
                          pointer-events-none
                          absolute
                          -bottom-2
                          -right-2
                          h-14
                          w-14
                          rounded-br-[1.5rem]
                          border-b-2
                          border-r-2
                          border-[var(--accent)]/50
                          transition-[border-color]
                          duration-500
                          group-hover:border-[var(--accent)]
                          sm:-bottom-3
                          sm:-right-3
                          sm:h-20
                          sm:w-20
                          sm:rounded-br-[2rem]
                        "
                      />

                      {/* Top Left Corner */}
                      <div
                        className="
                          pointer-events-none
                          absolute
                          -left-2
                          -top-2
                          h-12
                          w-12
                          rounded-tl-[1.25rem]
                          border-l
                          border-t
                          border-[var(--border)]
                          sm:-left-3
                          sm:-top-3
                          sm:h-16
                          sm:w-16
                          sm:rounded-tl-[1.5rem]
                        "
                      />
                    </div>

                    {/* BACK */}
                    <div
                      className="
                        absolute
                        inset-0
                        h-full
                        w-full
                        rounded-[1.5rem]
                        border
                        border-[var(--glass-border)]
                        bg-[var(--glass-bg)]
                        p-1.5
                        shadow-[0_30px_80px_rgba(0,0,0,0.12)]
                        [backface-visibility:hidden]
                        [-webkit-backface-visibility:hidden]
                        [transform:rotateY(180deg)]
                        sm:rounded-[2rem]
                        sm:p-2
                        dark:shadow-[0_30px_90px_rgba(0,0,0,0.55)]
                      "
                    >
                      {/* Back Inner */}
                      <div
                        className="
                          relative
                          flex
                          h-full
                          w-full
                          flex-col
                          justify-between
                          overflow-hidden
                          rounded-[1.15rem]
                          bg-[var(--surface)]
                          p-5
                          sm:rounded-[1.5rem]
                          sm:p-6
                          md:p-8
                        "
                      >
                        {/* Back Accent Glow */}
                        <div
                          className="
                            pointer-events-none
                            absolute
                            -right-20
                            -top-20
                            h-52
                            w-52
                            rounded-full
                            bg-[var(--accent)]/15
                            blur-3xl
                            sm:-right-24
                            sm:-top-24
                            sm:h-64
                            sm:w-64
                          "
                        />

                        {/* Content */}
                        <div className="relative z-10">
                          <span
                            className="
                              text-[9px]
                              font-semibold
                              uppercase
                              tracking-[0.25em]
                              text-[var(--accent)]
                              sm:text-[10px]
                              sm:tracking-[0.3em]
                            "
                          >
                            About Me
                          </span>

                          <h3
                            className="
                              mt-3
                              text-2xl
                              font-bold
                              tracking-tight
                              sm:mt-5
                              sm:text-3xl
                            "
                          >
                            Creative Developer
                          </h3>

                          <p
                            className="
                              mt-3
                              text-xs
                              leading-6
                              opacity-70
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

                        {/* Technologies */}
                        <div className="relative z-10 mt-6 sm:mt-8">
                          <p
                            className="
                              mb-2
                              text-[9px]
                              font-semibold
                              uppercase
                              tracking-[0.25em]
                              opacity-50
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
                                  px-2.5
                                  py-1
                                  text-[10px]
                                  transition-colors
                                  duration-300
                                  hover:border-[var(--accent)]/50
                                  hover:text-[var(--accent)]
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

                        {/* Back Decorative Line */}
                        <div
                          className="
                            pointer-events-none
                            absolute
                            bottom-4
                            right-4
                            h-12
                            w-12
                            rounded-br-xl
                            border-b
                            border-r
                            border-[var(--accent)]/40
                            sm:bottom-5
                            sm:right-5
                            sm:h-16
                            sm:w-16
                          "
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden lg:block" />
            )}

            {/* Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.08 }}
              variants={contentContainer}
              className="min-w-0 w-full"
            >
              <motion.div variants={fadeUp} className="mb-6 sm:mb-8">
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-gradient-to-r from-[var(--accent)] to-transparent sm:w-10" />

                  <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--accent)] sm:text-[11px] sm:tracking-[0.3em]">
                    Introduction
                  </span>
                </div>
              </motion.div>

              <motion.div variants={fadeUp}>
                <p className="max-w-3xl whitespace-pre-line text-base leading-[1.8] text-[var(--foreground-muted)] sm:text-lg sm:leading-[1.9] md:text-xl">
                  {about.biography}
                </p>
              </motion.div>

              {/* Achievements */}
              {achievements.length > 0 && (
                <motion.div variants={fadeUp} className="mt-10 sm:mt-14">
                  <div className="mb-5 flex items-center gap-3 sm:mb-6 sm:gap-4">
                    <h3 className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--foreground)] sm:text-xs sm:tracking-[0.25em]">
                      Highlights
                    </h3>

                    <div className="h-px min-w-0 flex-1 bg-gradient-to-r from-[var(--border)] to-transparent" />
                  </div>

                  <div className="space-y-3">
                    {achievements.map((item, index) => (
                      <AchievementItem
                        key={`${item}-${index}`}
                        item={item}
                        index={index}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Stats */}
              {stats.length > 0 && (
                <motion.div variants={fadeUp} className="mt-10 sm:mt-14">
                  <div className="mb-5 flex items-center gap-3 sm:mb-6 sm:gap-4">
                    <h3 className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--foreground)] sm:text-xs sm:tracking-[0.25em]">
                      By The Numbers
                    </h3>

                    <div className="h-px min-w-0 flex-1 bg-gradient-to-r from-[var(--border)] to-transparent" />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-2 sm:gap-3 md:grid-cols-4">
                    {stats.map((stat, index) => (
                      <StatCard
                        key={`${stat.label}-${index}`}
                        stat={stat}
                        index={index}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Accent */}
              <motion.div
                variants={fadeUp}
                className="mt-10 flex items-center gap-3 sm:mt-14 sm:gap-4"
              >
                <div className="h-px w-12 bg-gradient-to-r from-[var(--accent)] to-transparent sm:w-20" />

                <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)] shadow-[0_0_12px_rgba(229,9,20,0.9)]" />

                <div className="h-px min-w-0 flex-1 bg-gradient-to-r from-[var(--accent)]/30 to-transparent" />
              </motion.div>
            </motion.div>
          </div>
        )}
      </Container>
    </section>
  );
}
