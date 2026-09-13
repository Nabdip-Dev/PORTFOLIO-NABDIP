"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiChevronDown,
  FiHelpCircle,
  FiMessageCircle,
} from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";

import { fetchFaqs } from "@/services/api/faqService";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Skeleton } from "@/components/ui/Skeleton";
import { useLanguage } from "@/contexts/LanguageContext";

export function FAQ() {
  const { data: faqs, isLoading } = useQuery({
    queryKey: ["faqs"],
    queryFn: fetchFaqs,
  });

  const [openId, setOpenId] = useState<string | null>(null);
  const { t } = useLanguage();

  const items = faqs ?? [];

  return (
    <section
      id="faq"
      className="
        relative overflow-hidden
        bg-[var(--faq-bg)]
        py-24
        transition-colors duration-700 ease-in-out
        sm:py-28 lg:py-32
      "
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Main soft glow */}
        <motion.div
          className="
            absolute left-1/2 top-[12%]
            h-[420px] w-[420px]
            -translate-x-1/2
            rounded-full
            bg-[var(--faq-glow)]
            blur-[120px]
            opacity-50
          "
          animate={{
            opacity: [0.46, 0.54, 0.46],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Right soft orb */}
        <motion.div
          className="
            absolute -right-24 top-10
            h-64 w-64
            rounded-full
            bg-[var(--faq-orb)]
            blur-3xl
          "
          animate={{
            x: [0, 6, 0],
            y: [0, 5, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Left soft orb */}
        <motion.div
          className="
            absolute -left-32 bottom-0
            h-72 w-72
            rounded-full
            bg-[var(--faq-orb-soft)]
            blur-3xl
          "
          animate={{
            x: [0, -6, 0],
            y: [0, -5, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Grid */}
        <div
          className="
            absolute inset-0
            opacity-[var(--faq-grid-opacity)]
            [background-image:linear-gradient(var(--faq-grid-color)_1px,transparent_1px),linear-gradient(90deg,var(--faq-grid-color)_1px,transparent_1px)]
            [background-size:55px_55px]
            [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]
          "
        />
      </div>

      <Container>
        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="relative z-10 mx-auto mb-16 max-w-3xl text-center">
          {/* Eyebrow */}
          <motion.div
            initial={{
              opacity: 0,
              y: 8,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              margin: "-60px",
            }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
            className="
              mb-5 inline-flex items-center gap-2
              rounded-full
              border border-[var(--faq-pill-border)]
              bg-[var(--faq-pill-bg)]
              px-4 py-2
              text-[10px] font-semibold uppercase
              tracking-[0.28em]
              text-[var(--faq-accent)]
              backdrop-blur-xl
            "
          >
            <span className="relative flex h-2 w-2">
              <span
                className="
                  absolute inline-flex h-full w-full
                  animate-ping rounded-full
                  bg-[var(--faq-accent)]
                  opacity-40
                "
              />

              <span
                className="
                  relative inline-flex h-2 w-2
                  rounded-full
                  bg-[var(--faq-accent)]
                "
              />
            </span>

            {t.sections.faq.eyebrow}
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              margin: "-60px",
            }}
            transition={{
              duration: 0.6,
              delay: 0.05,
              ease: "easeOut",
            }}
          >
            <SectionHeading
              eyebrow=""
              title={t.sections.faq.title}
            />
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{
              width: 0,
              opacity: 0,
            }}
            whileInView={{
              width: 110,
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: "easeOut",
            }}
            className="
              mx-auto mt-7 h-[2px]
              rounded-full
              bg-gradient-to-r
              from-transparent
              via-[var(--faq-accent)]
              to-transparent
            "
          />
        </div>

        {/* =====================================================
            LOADING
        ====================================================== */}

        {isLoading ? (
          <div className="relative z-10 mx-auto max-w-5xl space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.04,
                }}
                className="
                  h-[82px]
                  rounded-2xl
                  border border-[var(--faq-card-border)]
                  bg-[var(--faq-card-bg)]
                  p-5
                  backdrop-blur-xl
                "
              >
                <Skeleton className="h-5 w-3/5" />

                <div className="mt-3">
                  <Skeleton className="h-3 w-1/4" />
                </div>
              </motion.div>
            ))}
          </div>
        ) : items.length === 0 ? (
          /* ===================================================
             EMPTY
          ==================================================== */

          <motion.div
            initial={{
              opacity: 0,
              y: 8,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
            className="
              relative z-10 mx-auto max-w-2xl
              rounded-3xl
              border border-[var(--faq-card-border)]
              bg-[var(--faq-card-bg)]
              p-12 text-center
              shadow-[var(--faq-card-shadow)]
              backdrop-blur-xl
            "
          >
            <div
              className="
                mx-auto mb-5 flex h-14 w-14
                items-center justify-center
                rounded-2xl
                border border-[var(--faq-icon-border)]
                bg-[var(--faq-icon-bg)]
                text-[var(--faq-accent)]
              "
            >
              <FiHelpCircle size={25} />
            </div>

            <p
              className="
                text-sm
                text-[var(--faq-muted)]
              "
            >
              No frequently asked questions available right now.
            </p>
          </motion.div>
        ) : (
          /* ===================================================
             MAIN
          ==================================================== */

          <div
            className="
              relative z-10 mx-auto grid max-w-6xl
              gap-5 lg:grid-cols-[0.34fr_0.66fr]
            "
          >
            {/* =================================================
                LEFT FEATURE PANEL
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                x: -10,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                margin: "-60px",
              }}
              transition={{
                duration: 0.65,
                ease: "easeOut",
              }}
              className="
                relative hidden overflow-hidden
                rounded-3xl
                border border-[var(--faq-card-border)]
                bg-[var(--faq-feature-bg)]
                p-7
                shadow-[var(--faq-card-shadow)]
                backdrop-blur-2xl
                lg:flex lg:flex-col lg:justify-between
              "
            >
              {/* Decorative ring */}
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 60,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
                  absolute -right-20 -top-20
                  h-52 w-52
                  rounded-full
                  border border-[var(--faq-accent-border)]
                  opacity-60
                "
              />

              <motion.div
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 75,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
                  absolute -right-12 -top-12
                  h-36 w-36
                  rounded-full
                  border border-[var(--faq-accent-border)]
                  opacity-40
                "
              />

              <div className="relative">
                {/* Icon */}
                <div
                  className="
                    mb-7 flex h-14 w-14
                    items-center justify-center
                    rounded-2xl
                    border border-[var(--faq-icon-border)]
                    bg-[var(--faq-icon-bg)]
                    text-[var(--faq-accent)]
                    shadow-[0_0_35px_var(--faq-icon-glow)]
                  "
                >
                  <FiMessageCircle size={25} />
                </div>

                <span
                  className="
                    mb-3 block
                    font-mono text-[10px]
                    uppercase tracking-[0.28em]
                    text-[var(--faq-label)]
                  "
                >
                  KNOWLEDGE BASE
                </span>

                <h3
                  className="
                    max-w-[220px]
                    text-2xl font-semibold
                    leading-tight
                    text-[var(--faq-heading)]
                  "
                >
                  Everything you need to know.
                </h3>

                <p
                  className="
                    mt-4 max-w-[230px]
                    text-sm leading-7
                    text-[var(--faq-muted)]
                  "
                >
                  Find quick answers to the most common questions before
                  getting started.
                </p>
              </div>

              {/* Bottom stats */}
              <div className="relative mt-10">
                <div
                  className="
                    mb-4 h-px w-full
                    bg-[var(--faq-divider)]
                  "
                />

                <div className="flex items-end justify-between">
                  <div>
                    <span
                      className="
                        block font-mono
                        text-[10px]
                        uppercase tracking-[0.2em]
                        text-[var(--faq-label)]
                      "
                    >
                      ARTICLES
                    </span>

                    <span
                      className="
                        mt-1 block
                        text-3xl font-semibold
                        text-[var(--faq-heading)]
                      "
                    >
                      {items.length}
                    </span>
                  </div>

                  <div
                    className="
                      flex h-10 w-10
                      items-center justify-center
                      rounded-full
                      border border-[var(--faq-accent-border)]
                      text-[var(--faq-accent)]
                    "
                  >
                    <FiChevronDown size={17} />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* =================================================
                FAQ LIST
            ================================================== */}

            <div className="space-y-3">
              {items.map((faq, index) => {
                const isOpen = openId === faq._id;

                return (
                  <motion.div
                    key={faq._id}
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      margin: "-30px",
                    }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.025,
                      ease: "easeOut",
                    }}
                    className="group"
                  >
                    <motion.div
                      layout
                      transition={{
                        layout: {
                          duration: 0.35,
                          ease: "easeInOut",
                        },
                      }}
                      className={`
                        relative overflow-hidden
                        rounded-2xl
                        border
                        transition-all duration-500
                        ease-in-out
                        ${
                          isOpen
                            ? "border-[var(--faq-open-border)] bg-[var(--faq-open-bg)] shadow-[var(--faq-open-shadow)]"
                            : "border-[var(--faq-card-border)] bg-[var(--faq-card-bg)] hover:border-[var(--faq-hover-border)] hover:bg-[var(--faq-hover-bg)]"
                        }
                      `}
                    >
                      {/* Active red line */}
                      <motion.div
                        initial={false}
                        animate={{
                          opacity: isOpen ? 1 : 0,
                          scaleY: isOpen ? 1 : 0.5,
                        }}
                        transition={{
                          duration: 0.3,
                          ease: "easeOut",
                        }}
                        className="
                          absolute bottom-4 left-0 top-4
                          w-[3px]
                          origin-center
                          rounded-r-full
                          bg-[var(--faq-accent)]
                          shadow-[0_0_14px_var(--faq-accent)]
                        "
                      />

                      {/* Top shine */}
                      <motion.div
                        initial={false}
                        animate={{
                          opacity: isOpen ? 1 : 0,
                        }}
                        transition={{
                          duration: 0.4,
                          ease: "easeInOut",
                        }}
                        className="
                          pointer-events-none absolute left-0 right-0 top-0
                          h-px
                          bg-gradient-to-r
                          from-transparent
                          via-[var(--faq-shine)]
                          to-transparent
                        "
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setOpenId(isOpen ? null : faq._id)
                        }
                        aria-expanded={isOpen}
                        className="
                          flex w-full
                          items-center gap-4
                          px-5 py-5
                          text-left
                          outline-none
                          sm:px-6 sm:py-5
                        "
                      >
                        {/* Number */}
                        <span
                          className={`
                            flex h-9 w-9
                            shrink-0 items-center justify-center
                            rounded-xl
                            border
                            font-mono text-[10px]
                            transition-all duration-500
                            ease-in-out
                            ${
                              isOpen
                                ? "border-[var(--faq-accent-border)] bg-[var(--faq-accent-bg)] text-[var(--faq-accent)]"
                                : "border-[var(--faq-number-border)] bg-[var(--faq-number-bg)] text-[var(--faq-number)] group-hover:text-[var(--faq-accent)]"
                            }
                          `}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        {/* Question */}
                        <span
                          className={`
                            flex-1 pr-2
                            text-sm font-medium
                            leading-6
                            transition-colors duration-500
                            ease-in-out
                            ${
                              isOpen
                                ? "text-[var(--faq-open-heading)]"
                                : "text-[var(--faq-question)] group-hover:text-[var(--faq-hover-heading)]"
                            }
                          `}
                        >
                          {faq.question}
                        </span>

                        {/* Chevron */}
                        <motion.span
                          animate={{
                            rotate: isOpen ? 180 : 0,
                          }}
                          transition={{
                            duration: 0.28,
                            ease: "easeInOut",
                          }}
                          className={`
                            flex h-9 w-9
                            shrink-0 items-center justify-center
                            rounded-xl
                            border
                            transition-all duration-500
                            ease-in-out
                            ${
                              isOpen
                                ? "border-[var(--faq-accent-border)] bg-[var(--faq-accent-bg)] text-[var(--faq-accent)]"
                                : "border-[var(--faq-number-border)] text-[var(--faq-icon-muted)] group-hover:border-[var(--faq-hover-border)] group-hover:text-[var(--faq-accent)]"
                            }
                          `}
                        >
                          <FiChevronDown size={16} />
                        </motion.span>
                      </button>

                      {/* =================================================
                          ANSWER
                      ================================================== */}

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{
                              height: 0,
                              opacity: 0,
                            }}
                            animate={{
                              height: "auto",
                              opacity: 1,
                            }}
                            exit={{
                              height: 0,
                              opacity: 0,
                            }}
                            transition={{
                              height: {
                                duration: 0.35,
                                ease: "easeInOut",
                              },
                              opacity: {
                                duration: 0.2,
                                ease: "easeOut",
                              },
                            }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-6 pl-[4.75rem] pr-6 sm:pl-[4.9rem]">
                              {/* Divider */}
                              <div
                                className="
                                  mb-4 h-px w-full
                                  bg-[var(--faq-divider)]
                                "
                              />

                              {/* Answer */}
                              <motion.p
                                initial={{
                                  opacity: 0,
                                }}
                                animate={{
                                  opacity: 1,
                                }}
                                transition={{
                                  duration: 0.3,
                                  delay: 0.05,
                                  ease: "easeOut",
                                }}
                                className="
                                  max-w-2xl
                                  text-sm leading-7
                                  text-[var(--faq-answer)]
                                "
                              >
                                {faq.answer}
                              </motion.p>

                              {/* Footer */}
                              <motion.div
                                initial={{
                                  opacity: 0,
                                }}
                                animate={{
                                  opacity: 1,
                                }}
                                transition={{
                                  duration: 0.3,
                                  delay: 0.1,
                                  ease: "easeOut",
                                }}
                                className="
                                  mt-5 flex items-center gap-2
                                  text-[10px]
                                  font-mono uppercase
                                  tracking-[0.18em]
                                  text-[var(--faq-label)]
                                "
                              >
                                <span
                                  className="
                                    h-1.5 w-1.5 rounded-full
                                    bg-[var(--faq-accent)]
                                  "
                                />

                                Helpful information
                              </motion.div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
