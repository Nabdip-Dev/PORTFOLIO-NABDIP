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
      className="testimonials-section"
    >
      {/* ================================================
          BACKGROUND DECORATION
      ================================================= */}

      <div
        aria-hidden="true"
        className="testimonials-bg-glow testimonials-bg-glow-one"
      />

      <div
        aria-hidden="true"
        className="testimonials-bg-glow testimonials-bg-glow-two"
      />

      <Container>
        <div className="testimonials-content">
          {/* ================================================
              HEADING
          ================================================= */}

          <div className="testimonial-heading">
            <SectionHeading
              eyebrow={t.sections.testimonials.eyebrow}
              title={t.sections.testimonials.title}
            />

            <p className="testimonials-description">
              Real experiences from people who trusted our work.
            </p>
          </div>

          {/* ================================================
              DIVIDER
          ================================================= */}

          <div className="testimonials-divider">
            <span />
            <i />
            <span />
          </div>

          {/* ================================================
              TESTIMONIALS
          ================================================= */}

          {isLoading ? (
            <div className="testimonials-loading">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="testimonial-skeleton"
                />
              ))}
            </div>
          ) : testimonials.length > 0 ? (
            <div className="testimonials-marquee-area">
              {/* LEFT FADE */}

              <div
                aria-hidden="true"
                className="
                  testimonial-edge
                  testimonial-edge-left
                "
              />

              {/* RIGHT FADE */}

              <div
                aria-hidden="true"
                className="
                  testimonial-edge
                  testimonial-edge-right
                "
              />

              {/* MARQUEE */}

              <div className="testimonial-marquee-wrapper">
                <div className="testimonial-marquee-track">
                  {/* GROUP 1 */}

                  <div className="testimonial-marquee-group">
                    {testimonials.map((testimonial) => (
                      <div
                        key={testimonial._id}
                        className="testimonial-marquee-card"
                      >
                        <TestimonialCard
                          testimonial={testimonial}
                        />
                      </div>
                    ))}
                  </div>

                  {/* GROUP 2
                      Duplicate is only for seamless looping
                  */}

                  <div
                    className="testimonial-marquee-group"
                    aria-hidden="true"
                  >
                    {testimonials.map((testimonial) => (
                      <div
                        key={`duplicate-${testimonial._id}`}
                        className="testimonial-marquee-card"
                      >
                        <TestimonialCard
                          testimonial={testimonial}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="testimonial-empty">
              <div className="testimonial-empty-icon">
                “
              </div>

              <p>
                No reviews yet — be the first to leave one
                below.
              </p>
            </div>
          )}

          {/* ================================================
              REVIEW CTA
          ================================================= */}

          <div className="testimonial-cta">
            <p className="testimonial-cta-label">
              Your experience matters
            </p>

            <button
              type="button"
              onClick={() => setShowForm((value) => !value)}
              aria-expanded={showForm}
              aria-controls="testimonial-form"
              className="testimonial-cta-button"
            >
              <span className="testimonial-button-shine" />

              <span className="testimonial-button-content">
                <span>
                  {showForm
                    ? "Close Review Form"
                    : "Share Your Experience"}
                </span>

                <span
                  className={`testimonial-button-icon ${
                    showForm
                      ? "testimonial-button-icon-open"
                      : ""
                  }`}
                >
                  +
                </span>
              </span>
            </button>

            {/* FORM */}

            <div
              id="testimonial-form"
              className={`testimonial-form-wrapper ${
                showForm
                  ? "testimonial-form-open"
                  : ""
              }`}
            >
              <div className="testimonial-form-inner">
                <div className="testimonial-form-card">
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
