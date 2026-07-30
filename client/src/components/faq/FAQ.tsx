"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import { fetchFaqs } from "@/services/api/faqService";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";
import { Skeleton } from "@/components/ui/Skeleton";

export function FAQ() {
  const { data: faqs, isLoading } = useQuery({ queryKey: ["faqs"], queryFn: fetchFaqs });
  const [openId, setOpenId] = useState<string | null>(null);
  const { t } = useLanguage();

  return (
    <section id="faq" className="py-24">
      <Container>
        <SectionHeading eyebrow={t.sections.faq.eyebrow} title={t.sections.faq.title} />

        {isLoading ? (
          <div className="mx-auto max-w-2xl space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full" />
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-2xl space-y-3">
            {(faqs ?? []).map((faq) => {
              const isOpen = openId === faq._id;
              return (
                <div key={faq._id} className="overflow-hidden rounded-card glass">
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : faq._id)}
                    className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium"
                    aria-expanded={isOpen}
                  >
                    {faq.question}
                    <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <FiChevronDown size={16} className="text-[var(--foreground-muted)]" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-4 text-sm text-[var(--foreground-muted)]">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
}
