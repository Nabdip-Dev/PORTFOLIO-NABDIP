"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { fetchEducation } from "@/services/api/educationService";
import { formatMonthYear } from "@/utils/formatDate";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";
import { Skeleton } from "@/components/ui/Skeleton";

export function Education() {
  const { data: items, isLoading } = useQuery({ queryKey: ["education"], queryFn: fetchEducation });
  const { t } = useLanguage();

  return (
    <section id="education" className="py-24">
      <Container>
        <SectionHeading eyebrow={t.sections.education.eyebrow} title={t.sections.education.title} />

        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {(items ?? []).map((item, i) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.05 }}
                className="rounded-card glass p-5"
              >
                <span className="font-mono-tag text-xs text-[var(--foreground-muted)]">
                  {formatMonthYear(item.startDate)} — {formatMonthYear(item.endDate)}
                </span>
                <h3 className="font-display mt-1 text-base font-semibold">{item.degree}</h3>
                <p className="text-sm text-[var(--foreground-muted)]">{item.institution}</p>
                {item.description && (
                  <p className="mt-2 text-sm text-[var(--foreground-muted)]">{item.description}</p>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
