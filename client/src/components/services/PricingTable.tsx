"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FiCheck, FiX } from "react-icons/fi";
import { fetchPricingPlans } from "@/services/api/pricingService";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";
import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/Skeleton";

export function PricingTable() {
  const { data: plans, isLoading } = useQuery({ queryKey: ["pricing"], queryFn: fetchPricingPlans });
  const { t } = useLanguage();

  if (!isLoading && (!plans || plans.length === 0)) return null; // nothing to show if admin hasn't set any plans yet

  return (
    <section className="py-24">
      <Container>
        <SectionHeading eyebrow={t.sections.pricing.eyebrow} title={t.sections.pricing.title} description={t.sections.pricing.description} />

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-80 w-full" />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-3">
            {plans!.map((plan, i) => (
              <motion.div
                key={plan._id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.05 }}
                className="card-premium relative flex flex-col rounded-card p-6"
                style={
                  plan.highlighted
                    ? { background: "var(--surface-elevated)", border: "1px solid var(--accent)" }
                    : { background: "var(--glass-bg)", border: "1px solid var(--glass-border)" }
                }
              >
                {plan.highlighted && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[10px] font-medium text-[var(--accent-foreground)]"
                    style={{ background: "var(--gradient-accent)" }}
                  >
                    Most Popular
                  </span>
                )}

                <h3 className="font-display text-lg font-semibold">{plan.name}</h3>
                {plan.description && (
                  <p className="mt-1 text-xs text-[var(--foreground-muted)]">{plan.description}</p>
                )}

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-display text-3xl font-semibold" style={{ color: "var(--accent)" }}>
                    ${plan.price}
                  </span>
                  <span className="text-xs text-[var(--foreground-muted)]">/ {plan.billingPeriod}</span>
                </div>

                <ul className="mt-5 flex-1 space-y-2.5">
                  {plan.features?.map((f) => (
                    <li key={f.text} className="flex items-start gap-2 text-sm">
                      {f.included ? (
                        <FiCheck size={15} className="mt-0.5 shrink-0" style={{ color: "var(--accent)" }} />
                      ) : (
                        <FiX size={15} className="mt-0.5 shrink-0 text-[var(--foreground-muted)]" />
                      )}
                      <span className={f.included ? "" : "text-[var(--foreground-muted)] line-through"}>
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="mt-6 rounded-full px-5 py-2.5 text-center text-sm font-medium transition-transform hover:scale-105"
                  style={
                    plan.highlighted
                      ? { background: "var(--gradient-accent)", color: "var(--accent-foreground)" }
                      : { background: "var(--surface-elevated)", color: "var(--foreground)" }
                  }
                >
                  Get started
                </a>
              </motion.div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
