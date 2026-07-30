"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Image from "next/image";
import { fetchAbout } from "@/services/api/aboutService";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";
import { Skeleton } from "@/components/ui/Skeleton";

export function About() {
  const { data: about, isLoading } = useQuery({ queryKey: ["about"], queryFn: fetchAbout });
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24">
      <Container>
        <SectionHeading eyebrow={t.sections.about.eyebrow} title={t.sections.about.title} />

        {isLoading || !about ? (
          <div className="grid gap-10 sm:grid-cols-[220px_1fr]">
            <Skeleton className="h-56 w-full" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>
          </div>
        ) : (
          <div className="grid gap-12 sm:grid-cols-[260px_1fr] sm:items-start">
            {about.photo?.url && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative aspect-square overflow-hidden rounded-card glass"
              >
                <Image
                  src={about.photo.url}
                  alt="Profile photo"
                  fill
                  sizes="260px"
                  className="object-cover"
                />
              </motion.div>
            )}

            <div>
              <p className="whitespace-pre-line leading-relaxed text-[var(--foreground-muted)]">
                {about.biography}
              </p>

              {about.achievements?.length > 0 && (
                <ul className="mt-6 space-y-2">
                  {about.achievements.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--accent)" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {about.stats?.length > 0 && (
                <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {about.stats.map((stat) => (
                    <div key={stat.label} className="rounded-card glass p-4 text-center">
                      <div className="font-display text-2xl font-semibold" style={{ color: "var(--accent)" }}>
                        {stat.value}
                      </div>
                      <div className="mt-1 text-xs text-[var(--foreground-muted)]">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
