"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTestimonials } from "@/services/api/testimonialService";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Skeleton } from "@/components/ui/Skeleton";
import { TestimonialCard } from "./TestimonialCard";
import { TestimonialForm } from "./TestimonialForm";
import { useLanguage } from "@/contexts/LanguageContext";

export function Testimonials() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery({
    queryKey: ["testimonials", page],
    queryFn: () => fetchTestimonials(page),
  });
  const { t } = useLanguage();

  return (
    <section id="testimonials" className="py-24">
      <Container>
        <SectionHeading eyebrow={t.sections.testimonials.eyebrow} title={t.sections.testimonials.title} />

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-48 w-full" />
            ))}
          </div>
        ) : data && data.data.length > 0 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.data.map((t) => (
                <TestimonialCard key={t._id} testimonial={t} />
              ))}
            </div>

            {data.pagination.pages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                {Array.from({ length: data.pagination.pages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className="h-2.5 w-2.5 rounded-full transition-all"
                    style={{
                      background: page === i + 1 ? "var(--accent)" : "var(--surface-elevated)",
                      width: page === i + 1 ? "1.25rem" : undefined,
                    }}
                    aria-label={`Page ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-sm text-[var(--foreground-muted)]">
            No reviews yet — be the first to leave one below.
          </p>
        )}

        <div className="mt-14">
          <TestimonialForm />
        </div>
      </Container>
    </section>
  );
}
