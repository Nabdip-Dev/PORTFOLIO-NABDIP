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
  const [showForm, setShowForm] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["testimonials", page],
    queryFn: () => fetchTestimonials(page),
  });

  const { t } = useLanguage();

  return (
    <section
      id="testimonials"
      className="testimonials-section relative isolate overflow-hidden py-24 sm:py-28 lg:py-32"
    >
      <Container>
        <div className="relative z-10">
          {/* Heading */}

          <div className="testimonial-heading">
            <SectionHeading
              eyebrow={t.sections.testimonials.eyebrow}
              title={t.sections.testimonials.title}
            />
          </div>

          {/* Luxury divider */}

          <div className="mx-auto mb-12 mt-7 flex max-w-24 items-center gap-3">
            <span className="h-px flex-1 bg-black/10 dark:bg-white/10" />

            <span className="h-1.5 w-1.5 rotate-45 bg-[var(--accent)]" />

            <span className="h-px flex-1 bg-black/10 dark:bg-white/10" />
          </div>

          {/* Loading */}

          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-52 w-full rounded-[1.5rem]"
                />
              ))}
            </div>
          ) : data && data.data.length > 0 ? (
            <>
              {/* Testimonials */}

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {data.data.map((testimonial, index) => (
                  <div
                    key={testimonial._id}
                    className="testimonial-card-animation"
                    style={{
                      animationDelay: `${index * 70}ms`,
                    }}
                  >
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                ))}
              </div>

              {/* Pagination */}

              {data.pagination.pages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-2">
                  {Array.from({
                    length: data.pagination.pages,
                  }).map((_, i) => {
                    const currentPage = i + 1;
                    const active = page === currentPage;

                    return (
                      <button
                        key={currentPage}
                        type="button"
                        onClick={() => setPage(currentPage)}
                        aria-label={`Go to testimonial page ${currentPage}`}
                        aria-current={active ? "page" : undefined}
                        className={`
                          h-2 rounded-full
                          transition-all duration-300
                          focus-visible:outline-none
                          focus-visible:ring-2
                          focus-visible:ring-[var(--accent)]
                          ${
                            active
                              ? "w-7 bg-[var(--accent)]"
                              : "w-2 bg-black/15 hover:bg-[var(--accent)] dark:bg-white/15"
                          }
                        `}
                      />
                    );
                  })}
                </div>
              )}
            </>
          ) : (
            /* Empty */

            <div className="mx-auto max-w-xl rounded-[1.5rem] border border-black/10 bg-white/60 px-6 py-12 text-center backdrop-blur-md dark:border-white/10 dark:bg-white/[0.035]">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/5">
                <span className="text-xl text-[var(--accent)]">
                  “
                </span>
              </div>

              <p className="text-sm text-[var(--foreground-muted)]">
                No reviews yet — be the first to leave one below.
              </p>
            </div>
          )}

          {/* Review CTA */}

          <div className="mt-16 flex flex-col items-center">
            <p className="mb-4 font-mono-tag text-[10px] uppercase tracking-[0.3em] text-black/40 dark:text-white/40">
              Your experience matters
            </p>

            <button
              type="button"
              onClick={() => setShowForm((value) => !value)}
              aria-expanded={showForm}
              aria-controls="testimonial-form"
              className="
                group
                relative
                overflow-hidden
                rounded-full
                bg-[var(--accent)]
                px-7
                py-3.5
                text-sm
                font-medium
                text-white
                shadow-[0_14px_38px_-16px_rgba(229,9,20,0.65)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[var(--accent-hover)]
                hover:shadow-[0_20px_45px_-16px_rgba(229,9,20,0.75)]
                active:translate-y-0
              "
            >
              <span
                className="
                  pointer-events-none
                  absolute
                  inset-y-0
                  -left-12
                  w-8
                  -skew-x-12
                  bg-white/20
                  transition-transform
                  duration-700
                  group-hover:translate-x-[260px]
                "
              />

              <span className="relative z-10 flex items-center gap-3">
                <span>
                  {showForm
                    ? "Close Review Form"
                    : "Share Your Experience"}
                </span>

                <span
                  className={`
                    flex h-5 w-5 items-center justify-center
                    rounded-full bg-white/15
                    transition-transform duration-300
                    ${showForm ? "rotate-45" : ""}
                  `}
                >
                  +
                </span>
              </span>
            </button>

            {/* Form */}

            <div
              id="testimonial-form"
              className={`
                grid w-full
                transition-all duration-500 ease-out
                ${
                  showForm
                    ? "mt-10 grid-rows-[1fr] opacity-100"
                    : "mt-0 grid-rows-[0fr] opacity-0"
                }
              `}
            >
              <div className="min-h-0 overflow-hidden">
                <div
                  className="
                    mx-auto
                    max-w-2xl
                    rounded-[1.5rem]
                    border border-black/10
                    bg-white/80
                    p-5
                    shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)]
                    backdrop-blur-xl
                    dark:border-white/10
                    dark:bg-white/[0.045]
                    sm:p-8
                  "
                >
                  <TestimonialForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
