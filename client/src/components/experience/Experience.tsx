"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { fetchExperience } from "@/services/api/experienceService";
import { formatMonthYear } from "@/utils/formatDate";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";
import { Skeleton } from "@/components/ui/Skeleton";

export function Experience() {
  const { data: items, isLoading } = useQuery({ queryKey: ["experience"], queryFn: fetchExperience });
  const { t } = useLanguage();

  return (
    <section id="experience" className="py-24">
      <Container>
        <SectionHeading eyebrow={t.sections.experience.eyebrow} title={t.sections.experience.title} />

        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        ) : (
          <div className="relative mx-auto max-w-2xl border-l border-[var(--border)] pl-8">
            {(items ?? []).map((item, i) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.05 }}
                className="relative pb-10 last:pb-0"
              >
                <span
                  className="absolute -left-[calc(2rem+5px)] top-1 h-2.5 w-2.5 rounded-full"
                  style={{ background: "var(--accent)" }}
                />
                <span className="font-mono-tag text-xs text-[var(--foreground-muted)]">
                  {formatMonthYear(item.startDate)} — {formatMonthYear(item.endDate)}
                </span>
                <h3 className="font-display mt-1 text-lg font-semibold">
                  {item.role} <span className="text-[var(--foreground-muted)]">· {item.company}</span>
                </h3>
                {item.description && (
                  <p className="mt-2 text-sm text-[var(--foreground-muted)]">{item.description}</p>
                )}
                {item.technologies?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.technologies.map((tech) => (
                      <span key={tech} className="font-mono-tag rounded-full bg-[var(--surface-elevated)] px-2 py-0.5 text-[10px]">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
