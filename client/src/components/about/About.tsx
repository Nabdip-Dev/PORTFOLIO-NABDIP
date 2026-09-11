"use client";

import { memo, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Image from "next/image";

import { fetchAbout } from "@/services/api/aboutService";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
      className="group flex items-start gap-4 rounded-2xl border border-[var(--border)] bg-[var(--glass-bg)] p-4 transform-gpu transition-[transform,border-color,background-color] duration-300 ease-out hover:border-[var(--accent)]/30 hover:bg-[var(--accent)]/[0.04]"
      style={{ backfaceVisibility: "hidden" }}
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[10px] font-bold text-[var(--accent)] transition-[background-color,border-color,color] duration-300 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white">
        {String(index + 1).padStart(2, "0")}
      </span>

      <span className="pt-1 text-sm leading-7 text-[var(--foreground-muted)]">
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
      className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--glass-bg)] p-5 transform-gpu transition-[transform,border-color] duration-300 ease-out hover:border-[var(--accent)]/30"
      style={{ backfaceVisibility: "hidden" }}
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[var(--accent)]/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative">
        <div className="font-display text-3xl font-semibold tracking-tight text-[var(--foreground)]">
          <span className="text-[var(--accent)]">{stat.value}</span>
        </div>

        <div className="mt-2 text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--foreground-muted)]">
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
      className="relative isolate overflow-visible bg-[var(--background)] py-24 text-[var(--foreground)] transition-colors duration-700 sm:py-32 lg:py-40"
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
        >

          {/* heding name  */}
          <motion.div
            variants={fadeUp}
            className="mx-auto -mt-50 w-full max-w-5xl"
          >
            <div
              className="relative h-[220px] w-full sm:h-[280px] lg:h-[320px]"
              style={{
                "--particle-color": "var(--foreground)",
                "--particle-accent": "var(--accent)",
              } as React.CSSProperties}
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
                fontSize="clamp(3.5rem, 13vw, 4rem)"
                fontWeight={800}
                fontFamily="inherit"
                glow
              />
            </div>
          </motion.div>

        </motion.div>

        {/* Loading */}
        {isLoading && (
          <div className="mt-16 grid items-start gap-12 lg:grid-cols-[380px_minmax(0,1fr)] lg:gap-20">
            <Skeleton className="aspect-[4/5] w-full rounded-[2rem]" />

            <div className="space-y-5">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-11/12" />
              <Skeleton className="h-5 w-10/12" />
              <Skeleton className="h-5 w-8/12" />

              <div className="grid grid-cols-2 gap-4 pt-6 sm:grid-cols-4">
                {[0, 1, 2, 3].map((item) => (
                  <Skeleton
                    key={item}
                    className="h-28 w-full rounded-2xl"
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
            className="mx-auto mt-16 max-w-xl rounded-2xl border border-[var(--accent)]/20 bg-[var(--accent)]/[0.04] p-8 text-center"
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
          <div className="mt-2 grid items-start gap-14 lg:grid-cols-[380px_minmax(0,1fr)] lg:gap-20">
            {/* Photo */}
            {about.photo?.url ? (
              <div className="relative lg:sticky lg:top-24 lg:self-start">

                {/* =====================================================
      CIRCULAR TEXT
      Card-এর পিছনে থাকবে
  ====================================================== */}
                <div className="pointer-events-none absolute -right-15 -top-15 z-0">
                  <CircularText
                    text="BUILD*CREATE*DESIGN*DEVELOP*REACT*"
                    onHover="speedUp"
                    spinDuration={20}
                    className="custom-class"
                  />
                </div>


                {/* =====================================================
      FULL CARD HOVER AREA
  ====================================================== */}
                <div
                  className="
      group
      relative
      z-10
      mx-auto
      w-[92%]
      [perspective:1600px]
    "
                >

                  {/* ===================================================
        FLIP CARD
    ==================================================== */}
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

                    {/* =================================================
          FRONT
      ================================================== */}
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
            -inset-5
            rounded-[2.5rem]
            bg-[var(--accent)]
            opacity-[0.10]
            blur-2xl
            transition-opacity
            duration-500
            group-hover:opacity-[0.18]
          "
                      />

                      {/* Main Glass Card */}
                      <div
                        className="
            relative
            h-full
            w-full
            rounded-[2rem]
            border
            border-[var(--glass-border)]
            bg-[var(--glass-bg)]
            p-2
            shadow-[0_30px_80px_rgba(0,0,0,0.12)]
            transition-[border-color,box-shadow]
            duration-500
            group-hover:border-[var(--accent)]/25
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
              rounded-[1.5rem]
              bg-[var(--surface)]
            "
                        >

                          <Image
                            src={about.photo.url}
                            alt="Profile photo"
                            fill
                            sizes="(max-width: 1024px) 92vw, 350px"
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
                -right-24
                -top-24
                h-56
                w-56
                rounded-full
                bg-[var(--accent)]/25
                blur-3xl
                transition-[background-color]
                duration-500
                group-hover:bg-[var(--accent)]/40
              "
                          />

                          {/* About Me Badge */}
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


                      {/* Bottom Right Corner */}
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
            transition-[border-color]
            duration-500
            group-hover:border-[var(--accent)]
          "
                      />


                      {/* Top Left Corner */}
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

                    </div>


                    {/* =================================================
          BACK
      ================================================== */}
                    <div
                      className="
          absolute
          inset-0
          h-full
          w-full
          rounded-[2rem]
          border
          border-[var(--glass-border)]
          bg-[var(--glass-bg)]
          p-2
          shadow-[0_30px_80px_rgba(0,0,0,0.12)]
          dark:shadow-[0_30px_90px_rgba(0,0,0,0.55)]
          [backface-visibility:hidden]
          [-webkit-backface-visibility:hidden]
          [transform:rotateY(180deg)]
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
            rounded-[1.5rem]
            bg-[var(--surface)]
            p-8
          "
                      >

                        {/* Back Accent Glow */}
                        <div
                          className="
              pointer-events-none
              absolute
              -right-24
              -top-24
              h-64
              w-64
              rounded-full
              bg-[var(--accent)]/15
              blur-3xl
            "
                        />


                        {/* Content */}
                        <div className="relative z-10">

                          <span
                            className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.3em]
                text-[var(--accent)]
              "
                          >
                            About Me
                          </span>


                          <h3
                            className="
                mt-5
                text-3xl
                font-bold
                tracking-tight
              "
                          >
                            Creative Developer
                          </h3>


                          <p
                            className="
                mt-5
                text-sm
                leading-7
                opacity-70
              "
                          >
                            I build modern, interactive and visually engaging
                            web experiences using React, Next.js and modern
                            UI technologies.
                          </p>

                        </div>


                        {/* Technologies */}
                        <div className="relative z-10">

                          <p
                            className="
                mb-3
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.3em]
                opacity-50
              "
                          >
                            Technologies
                          </p>


                          <div className="flex flex-wrap gap-2">

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
                    px-3
                    py-1.5
                    text-xs
                    transition-colors
                    duration-300
                    hover:border-[var(--accent)]/50
                    hover:text-[var(--accent)]
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
              bottom-5
              right-5
              h-16
              w-16
              rounded-br-xl
              border-b
              border-r
              border-[var(--accent)]/40
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
              className="min-w-0"
            >
              <motion.div variants={fadeUp} className="mb-8">
                <div className="flex items-center gap-3">
                  <span className="h-px w-10 bg-gradient-to-r from-[var(--accent)] to-transparent" />

                  <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
                    Introduction
                  </span>
                </div>
              </motion.div>

              <motion.div variants={fadeUp}>
                <p className="max-w-3xl whitespace-pre-line text-lg leading-[1.9] text-[var(--foreground-muted)] sm:text-xl">
                  {about.biography}
                </p>
              </motion.div>

              {/* Achievements */}
              {achievements.length > 0 && (
                <motion.div variants={fadeUp} className="mt-14">
                  <div className="mb-6 flex items-center gap-4">
                    <h3 className="shrink-0 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--foreground)]">
                      Highlights
                    </h3>

                    <div className="h-px flex-1 bg-gradient-to-r from-[var(--border)] to-transparent" />
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
                <motion.div variants={fadeUp} className="mt-14">
                  <div className="mb-6 flex items-center gap-4">
                    <h3 className="shrink-0 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--foreground)]">
                      By The Numbers
                    </h3>

                    <div className="h-px flex-1 bg-gradient-to-r from-[var(--border)] to-transparent" />
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
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
                className="mt-14 flex items-center gap-4"
              >
                <div className="h-px w-20 bg-gradient-to-r from-[var(--accent)] to-transparent" />

                <div className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_12px_rgba(229,9,20,0.9)]" />

                <div className="h-px flex-1 bg-gradient-to-r from-[var(--accent)]/30 to-transparent" />
              </motion.div>
            </motion.div>
          </div>
        )}
      </Container>
    </section>
  );
}
