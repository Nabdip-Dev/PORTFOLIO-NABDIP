"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import { fetchServices } from "@/services/api/serviceService";
import { resolveIcon } from "@/utils/resolveIcon";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";
import { Skeleton } from "@/components/ui/Skeleton";

export function Services() {
  const { data: services, isLoading } = useQuery({ queryKey: ["services"], queryFn: fetchServices });
  const { t } = useLanguage();
  const active = (services ?? []).filter((s) => s.active);

  return (
    <section id="services" className="py-24">
      <Container>
        <SectionHeading eyebrow={t.sections.services.eyebrow} title={t.sections.services.title} />

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-64 w-full" />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {active.map((service, i) => {
              const Icon = resolveIcon(service.icon);
              return (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.05 }}
                  className="flex flex-col rounded-card glass card-premium p-6"
                >
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{ background: "var(--gradient-accent)" }}
                  >
                    <Icon size={20} className="text-white" />
                  </div>
                  <h3 className="font-display mt-4 text-lg font-semibold">{service.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-[var(--foreground-muted)]">{service.description}</p>

                  {service.features?.length > 0 && (
                    <ul className="mt-4 space-y-1.5">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-xs text-[var(--foreground-muted)]">
                          <FiCheck size={13} className="mt-0.5 shrink-0" style={{ color: "var(--accent)" }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}

                  {typeof service.price === "number" && (
                    <div className="font-mono-tag mt-4 text-sm font-medium" style={{ color: "var(--accent)" }}>
                      From ${service.price}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
}
