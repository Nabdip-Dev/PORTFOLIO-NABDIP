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
  const [showForm, setShowForm] = useState(false);
  const { t } = useLanguage();

  const { data, isLoading } = useQuery({
    queryKey: ["testimonials"],
    queryFn: () => fetchTestimonials(1),
  });

  const testimonials = data?.data ?? [];

  return (
    <section
      id="testimonials"
      className="
        testimonials-section
        relative isolate w-full overflow-hidden
        pt-20 pb-20
        sm:pt-24 sm:pb-24
      "
    >
      {/* =====================================================
          BACKGROUND GLOW
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          testimonials-bg-glow
          testimonials-bg-glow-one
          absolute -left-[140px] top-[15%]
          -z-10
          h-[280px] w-[280px]
          pointer-events-none
          rounded-full
          blur-[90px]
        "
      />

      <div
        aria-hidden="true"
        className="
          testimonials-bg-glow
          testimonials-bg-glow-two
          absolute -right-[170px] bottom-[8%]
          -z-10
          h-[350px] w-[350px]
          pointer-events-none
          rounded-full
          blur-[90px]
        "
      />

      <Container>
        <div className="testimonials-content relative z-[5]">
          {/* =================================================
              HEADING
          ================================================= */}

          <div className="testimonial-heading text-center">
            <SectionHeading
              eyebrow={t.sections.testimonials.eyebrow}
              title={t.sections.testimonials.title}
            />

            <p
              className="
                testimonials-description
                mx-auto mt-5
                max-w-[560px]
                px-5
                text-[13px]
                leading-[1.7]
                sm:px-0
                sm:text-sm
              "
            >
              Real experiences from people who trusted our work.
            </p>
          </div>

          {/* =================================================
              DIVIDER
          ================================================= */}

          <div
            className="
              testimonials-divider
              mx-auto mt-7
              flex w-32
              items-center gap-3
            "
          >
            <span />

            <i />

            <span />
          </div>

          {/* =================================================
              TESTIMONIALS
          ================================================= */}

          {isLoading ? (
            <div
              className="
                testimonials-loading
                mt-11
                flex gap-6
                overflow-hidden
                sm:mt-14
              "
            >
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="
                    testimonial-skeleton
                    h-[270px]
                    w-[300px]
                    shrink-0
                    rounded-2xl
                    sm:h-[290px]
                    sm:w-[390px]
                    sm:rounded-3xl
                  "
                />
              ))}
            </div>
          ) : testimonials.length > 0 ? (
            <div
              className="
                testimonials-marquee-area
                relative mt-11 w-full
                sm:mt-14
              "
            >
              {/* LEFT FADE */}

              <div
                aria-hidden="true"
                className="
                  testimonial-edge
                  testimonial-edge-left
                  absolute inset-y-0 left-0 z-20
                  w-[45px]
                  pointer-events-none
                  sm:w-[110px]
                "
              />

              {/* RIGHT FADE */}

              <div
                aria-hidden="true"
                className="
                  testimonial-edge
                  testimonial-edge-right
                  absolute inset-y-0 right-0 z-20
                  w-[45px]
                  pointer-events-none
                  sm:w-[110px]
                "
              />

              {/* MARQUEE */}

              <div className="testimonial-marquee-wrapper w-full overflow-hidden">
                <div className="testimonial-marquee-track flex w-max">
                  {/* GROUP 1 */}

                  <div
                    className="
                      testimonial-marquee-group
                      flex shrink-0
                      gap-4
                      pr-4
                      sm:gap-6
                      sm:pr-6
                    "
                  >
                    {testimonials.map((testimonial) => (
                      <div
                        key={testimonial._id}
                        className="
                          testimonial-marquee-card
                          w-[300px]
                          shrink-0
                          sm:w-[390px]
                        "
                      >
                        <TestimonialCard testimonial={testimonial} />
                      </div>
                    ))}
                  </div>

                  {/* GROUP 2 */}

                  <div
                    aria-hidden="true"
                    className="
                      testimonial-marquee-group
                      flex shrink-0
                      gap-4
                      pr-4
                      sm:gap-6
                      sm:pr-6
                    "
                  >
                    {testimonials.map((testimonial) => (
                      <div
                        key={`duplicate-${testimonial._id}`}
                        className="
                          testimonial-marquee-card
                          w-[300px]
                          shrink-0
                          sm:w-[390px]
                        "
                      >
                        <TestimonialCard testimonial={testimonial} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="
                testimonial-empty
                mx-auto mt-11
                max-w-[520px]
                px-6 py-12
                text-center
              "
            >
              <div
                className="
                  testimonial-empty-icon
                  mx-auto mb-5
                  flex h-12 w-12
                  items-center justify-center
                  rounded-full
                  text-[22px]
                "
              >
                “
              </div>

              <p>
                No reviews yet — be the first to leave one below.
              </p>
            </div>
          )}

          {/* =================================================
              CTA
          ================================================= */}

          <div
            className="
              testimonial-cta
              mt-16
              flex
              flex-col
              items-center
            "
          >
            <p className="testimonial-cta-label mb-4">
              Your experience matters
            </p>

            {/* CTA BUTTON */}

            <button
              type="button"
              onClick={() => setShowForm((value) => !value)}
              aria-expanded={showForm}
              aria-controls="testimonial-form"
              className="
                testimonial-cta-button
                relative
                overflow-hidden
                cursor-pointer
                rounded-full
                border-0
                px-7 py-3.5
              "
            >
              <span className="testimonial-button-shine" />

              <span
                className="
                  testimonial-button-content
                  relative z-[2]
                  flex items-center gap-3
                  text-sm font-semibold
                "
              >
                <span>
                  {showForm
                    ? "Close Review Form"
                    : "Share Your Experience"}
                </span>

                <span
                  className={`
                    testimonial-button-icon
                    flex h-[22px] w-[22px]
                    items-center justify-center
                    rounded-full
                    text-base
                    leading-none
                    transition-transform duration-300
                    ${showForm ? "testimonial-button-icon-open" : ""}
                  `}
                >
                  +
                </span>
              </span>
            </button>

            {/* =================================================
                FORM
            ================================================= */}

            <div
              id="testimonial-form"
              className={`
                testimonial-form-wrapper
                grid w-full max-w-[700px]
                grid-rows-[0fr]
                opacity-0
                transition-[grid-template-rows,opacity,margin-top]
                duration-500
                ${showForm ? "testimonial-form-open" : ""}
              `}
            >
              <div className="testimonial-form-inner min-h-0 overflow-hidden">
                <div className="testimonial-form-card p-5 sm:p-8">
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
