"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  GraduationCap,
  CalendarDays,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

import { fetchEducation } from "@/services/api/educationService";
import { formatMonthYear } from "@/utils/formatDate";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";
import { Skeleton } from "@/components/ui/Skeleton";

export function Education() {
  const { data: items, isLoading } = useQuery({
    queryKey: ["education"],
    queryFn: fetchEducation,
  });

  const { t } = useLanguage();

  return (
    <section
      id="education"
      className="relative overflow-hidden bg-[#080808] py-28 sm:py-32"
    >
      {/* Ambient luxury glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-20 h-72 w-72 rounded-full bg-amber-500/[0.045] blur-[120px]" />
        <div className="absolute bottom-10 right-1/4 h-80 w-80 rounded-full bg-orange-400/[0.035] blur-[140px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      <Container>
        <div className="relative z-10">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <SectionHeading
              eyebrow={t.sections.education.eyebrow}
              title={t.sections.education.title}
            />
          </motion.div>

          {/* Decorative line */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 90, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="mb-12 mt-6 h-px bg-gradient-to-r from-amber-300 via-amber-500 to-transparent"
          />

          {isLoading ? (
            <div className="grid gap-6 lg:grid-cols-2">
              {Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  className="h-56 animate-pulse rounded-[24px] border border-[#9b7a48]/20 bg-[#302719]/50"
                >
                  <div className="space-y-3 p-5">
                    <Skeleton className="h-9 w-9 rounded-xl" />
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">
              {(items ?? []).map((item, i) => (
                <motion.article
                  key={item._id}
                  initial={{
                    opacity: 0,
                    y: 45,
                    scale: 0.97,
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
                    duration: 0.75,
                    delay: i * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{
                    y: -8,
                    transition: {
                      duration: 0.35,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  }}
                  className="group relative"
                >
                  {/* Outer glow */}
                  <div className="absolute -inset-px rounded-[26px] bg-gradient-to-br from-[#d6b56d]/30 via-transparent to-[#8f6b3d]/15 opacity-0 blur-sm transition duration-700 group-hover:opacity-100" />

                  {/* Compact Luxury Card */}
                  <div className="relative min-h-[235px] overflow-hidden rounded-[24px] border border-[#9b7a48]/25 bg-gradient-to-br from-[#302719] via-[#241e15] to-[#17130e] p-5 shadow-[0_25px_70px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-all duration-500 group-hover:border-[#d6b56d]/35 group-hover:shadow-[0_30px_90px_rgba(190,145,65,0.12)] sm:p-6">
                    {/* Shine */}
                    <motion.div
                      initial={{ x: "-120%" }}
                      whileHover={{ x: "120%" }}
                      transition={{
                        duration: 1,
                        ease: "easeInOut",
                      }}
                      className="pointer-events-none absolute inset-y-0 left-0 w-1/3 skew-x-[-18deg] bg-gradient-to-r from-transparent via-[#f5dfad]/[0.09] to-transparent"
                    />

                    {/* Top gradient */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d6b56d]/70 to-transparent opacity-80" />

                    {/* Decorative corner */}
                    <div className="absolute -right-14 -top-14 h-36 w-36 rounded-full border border-[#d6b56d]/[0.09] transition-transform duration-700 group-hover:scale-125" />

                    <div className="absolute -right-9 -top-9 h-26 w-26 rounded-full border border-[#d6b56d]/[0.06]" />

                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-3">
                        <motion.div
                          whileHover={{
                            rotate: -5,
                            scale: 1.05,
                          }}
                          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#d6b56d]/20 bg-gradient-to-br from-[#b99452]/25 to-[#6d512c]/10 text-[#d8bb7c] shadow-[inset_0_1px_0_rgba(255,235,190,0.08)]"
                        >
                          <GraduationCap size={19} strokeWidth={1.5} />
                        </motion.div>

                        <div className="flex items-center gap-1.5 rounded-full border border-[#d6b56d]/15 bg-[#0d0b08]/45 px-2.5 py-1.5 backdrop-blur-md">
                          <CalendarDays
                            size={11}
                            className="text-[#d1ae68]/80"
                          />

                          <span className="font-mono text-[9px] tracking-[0.1em] text-[#d8c49e]/60">
                            {formatMonthYear(item.startDate)}
                            {" — "}
                            {formatMonthYear(item.endDate)}
                          </span>
                        </div>
                      </div>

                      {/* Degree */}
                      <div className="mt-5">
                        <div className="mb-1.5 flex items-center gap-1.5">
                          <Sparkles
                            size={11}
                            className="text-[#d1ae68]/75"
                          />

                          <span className="font-mono text-[9px] uppercase tracking-[0.23em] text-[#c5a563]/65">
                            Academic Journey
                          </span>
                        </div>

                        <h3 className="max-w-[90%] font-display text-[22px] font-semibold leading-tight tracking-[-0.02em] text-[#eadfc9] transition-colors duration-300 group-hover:text-[#f2dfb0] sm:text-[24px]">
                          {item.degree}
                        </h3>

                        <p className="mt-1.5 text-[12px] font-medium tracking-wide text-[#c5b89e]/55">
                          {item.institution}
                        </p>
                      </div>

                      {/* Description */}
                      {item.description && (
                        <p className="mt-4 max-w-xl text-[12px] leading-5 text-[#b9ad95]/50 transition-colors duration-300 group-hover:text-[#cfc2a9]/65">
                          {item.description}
                        </p>
                      )}

                      {/* Bottom */}
                      <div className="mt-5 flex items-center justify-between border-t border-[#d6b56d]/10 pt-3.5">
                        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#b7a585]/30">
                          Education
                        </span>

                        <motion.div
                          initial={{ opacity: 0.45, x: 0 }}
                          whileHover={{ x: 4 }}
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-[#d6b56d]/15 bg-[#302719]/40 text-[#bca879]/50 transition-colors duration-300 group-hover:border-[#d6b56d]/35 group-hover:bg-[#4a3820]/50 group-hover:text-[#e0c47d]"
                        >
                          <ArrowUpRight size={14} strokeWidth={1.5} />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!isLoading && (items ?? []).length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="rounded-[24px] border border-[#9b7a48]/20 bg-[#302719] py-14 text-center backdrop-blur-xl"
            >
              <GraduationCap
                size={30}
                className="mx-auto mb-4 text-[#c7a967]/35"
              />

              <p className="text-sm text-[#b9ad95]/45">
                No education records available.
              </p>
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  );
}
