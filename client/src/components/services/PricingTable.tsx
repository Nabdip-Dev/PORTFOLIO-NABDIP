"use client";

import { useQuery } from "@tanstack/react-query";
import { motion, useReducedMotion } from "framer-motion";
import {
  FiCheck,
  FiX,
  FiArrowUpRight,
  FiZap,
} from "react-icons/fi";

import { fetchPricingPlans } from "@/services/api/pricingService";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";
import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/Skeleton";

/* =========================================================
   EASING
========================================================= */

const smoothEase = [0.22, 1, 0.36, 1] as const;

/* =========================================================
   LIGHTWEIGHT ANIMATION
========================================================= */

const revealVariants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: smoothEase,
    },
  },
};

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.035,
    },
  },
};

/* =========================================================
   PRICING
========================================================= */

export function PricingTable() {
  const shouldReduceMotion = useReducedMotion();

  const {
    data: plans,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pricing"],
    queryFn: fetchPricingPlans,
  });

  const { t } = useLanguage();

  if (!isLoading && (!plans || plans.length === 0)) {
    return null;
  }

  return (
    <section
      id="pricing"
      className="
        pricing-section
        relative
        isolate
        overflow-hidden
        py-28
        sm:py-32
        lg:py-40
      "
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        {/* Base */}

        <div
          className="absolute inset-0"
          style={{
            background: "var(--pricing-bg)",
          }}
        />

        {/* ===================================================
            STATIC SVG
            NO FRAMER ANIMATION
        ==================================================== */}

        <svg
          className="
            pricing-svg
            absolute
            inset-0
            h-full
            w-full
          "
          viewBox="0 0 1440 1200"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="pricingFlow"
              x1="0"
              y1="0"
              x2="1440"
              y2="1200"
              gradientUnits="userSpaceOnUse"
            >
              <stop
                stopColor="var(--pricing-svg-primary)"
                stopOpacity="0"
              />

              <stop
                offset="0.3"
                stopColor="var(--pricing-svg-primary)"
                stopOpacity="var(--pricing-svg-opacity)"
              />

              <stop
                offset="0.7"
                stopColor="var(--pricing-svg-secondary)"
                stopOpacity="var(--pricing-svg-opacity)"
              />

              <stop
                offset="1"
                stopColor="var(--pricing-svg-secondary)"
                stopOpacity="0"
              />
            </linearGradient>

            <radialGradient
              id="pricingGlow"
              cx="50%"
              cy="42%"
              r="65%"
            >
              <stop
                offset="0"
                stopColor="var(--pricing-svg-primary)"
                stopOpacity="0.045"
              />

              <stop
                offset="1"
                stopColor="var(--pricing-svg-primary)"
                stopOpacity="0"
              />
            </radialGradient>
          </defs>

          {/* Center Glow */}

          <ellipse
            cx="720"
            cy="430"
            rx="700"
            ry="480"
            fill="url(#pricingGlow)"
          />

          {/* Main Line */}

          <path
            d="
              M-120 850
              C170 600 350 710 540 500
              C730 300 850 140 1110 190
              C1280 220 1390 350 1570 220
            "
            stroke="url(#pricingFlow)"
            strokeWidth="1"
          />

          {/* Secondary Line */}

          <path
            d="
              M-100 960
              C190 700 380 790 580 600
              C770 410 900 250 1160 285
              C1320 310 1420 420 1550 330
            "
            stroke="url(#pricingFlow)"
            strokeWidth="0.7"
            strokeDasharray="8 14"
            opacity="0.35"
          />

          {/* Nodes */}

          <circle
            cx="1110"
            cy="190"
            r="3"
            fill="var(--pricing-svg-primary)"
            opacity="0.28"
          />

          <circle
            cx="540"
            cy="500"
            r="2.5"
            fill="var(--pricing-svg-secondary)"
            opacity="0.22"
          />

          <circle
            cx="900"
            cy="320"
            r="2"
            fill="var(--pricing-svg-primary)"
            opacity="0.18"
          />
        </svg>

        {/* ===================================================
            ORB 01
            STATIC = MUCH LIGHTER ON SCROLL
        ==================================================== */}

        <div
          className="
            pricing-orb
            absolute
            left-[5%]
            top-[14%]
            h-56
            w-56
            rounded-full
            bg-[var(--pricing-svg-glow)]
            blur-[90px]
            opacity-80
          "
        />

        {/* ===================================================
            ORB 02
        ==================================================== */}

        <div
          className="
            pricing-orb
            absolute
            bottom-[8%]
            right-[5%]
            h-64
            w-64
            rounded-full
            bg-[var(--pricing-svg-glow)]
            blur-[100px]
            opacity-80
          "
        />

        {/* ===================================================
            SUBTLE GRID
        ==================================================== */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.14]
          "
          style={{
            backgroundImage: `
              linear-gradient(
                to right,
                var(--pricing-grid-color) 1px,
                transparent 1px
              ),
              linear-gradient(
                to bottom,
                var(--pricing-grid-color) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "70px 70px",
          }}
        />

        {/* Top Fade */}

        <div
          className="
            absolute
            inset-x-0
            top-0
            h-40
          "
          style={{
            background:
              "linear-gradient(to bottom, var(--background), transparent)",
          }}
        />

        {/* Bottom Fade */}

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-40
          "
          style={{
            background:
              "linear-gradient(to top, var(--background), transparent)",
          }}
        />
      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <Container>
        {/* ===================================================
            HEADER
        ==================================================== */}

        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          variants={revealVariants}
          className="relative mb-16 sm:mb-20"
        >
          {/* Eyebrow */}

          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-[var(--accent)]" />

            <span
              className="
                font-mono-tag
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.28em]
                text-[var(--accent)]
              "
            >
              {t.sections.pricing.eyebrow}
            </span>

            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[var(--accent)]
              "
            />
          </div>

          {/* Heading */}

          <SectionHeading
            eyebrow=""
            title={t.sections.pricing.title}
            description={t.sections.pricing.description}
          />

          {/* Divider */}

          <div
            className="
              mt-8
              h-px
              w-full
              max-w-2xl
              origin-left
              bg-gradient-to-r
              from-[var(--accent)]/70
              via-[var(--accent)]/20
              to-transparent
            "
          />
        </motion.div>

        {/* ===================================================
            LOADING
        ==================================================== */}

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                key={index}
                className="
                  h-[430px]
                  w-full
                  rounded-[1.75rem]
                "
              />
            ))}
          </div>
        ) : isError ? (
          /* =================================================
              ERROR
          ================================================= */

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1 }}
            viewport={{
              once: true,
              amount: 0.1,
            }}
            transition={{
              duration: 0.35,
              ease: smoothEase,
            }}
            className="
              rounded-[1.75rem]
              border
              border-[var(--border)]
              bg-[var(--glass-bg)]
              p-10
              text-center
              backdrop-blur-xl
            "
          >
            <p className="text-sm text-[var(--foreground-muted)]">
              Unable to load pricing plans right now.
            </p>
          </motion.div>
        ) : (
          /* =================================================
              PRICING GRID
          ================================================= */

          <motion.div
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.08,
            }}
            className="
              grid
              gap-6
              md:grid-cols-2
              xl:grid-cols-3
            "
          >
            {plans!.map((plan, index) => (
              <motion.article
                key={plan._id}
                variants={revealVariants}
                className="
                  group
                  relative
                  transform-gpu
                "
              >
                {/* =========================================
                    OUTER GLOW
                ========================================== */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    -inset-1
                    rounded-[1.85rem]
                    bg-[var(--accent)]
                    opacity-0
                    blur-xl
                    transition-opacity
                    duration-300
                    group-hover:opacity-[0.07]
                  "
                />

                {/* =========================================
                    CARD
                ========================================== */}

                <div
                  className="
                    relative
                    flex
                    min-h-[430px]
                    flex-col
                    overflow-hidden
                    rounded-[1.75rem]
                    p-7
                    backdrop-blur-xl

                    transform-gpu
                    transition-transform
                    duration-300
                    ease-out

                    group-hover:-translate-y-[3px]

                    sm:p-8
                  "
                  style={
                    plan.highlighted
                      ? {
                          background: "var(--surface-elevated)",
                          border: "1px solid var(--accent)",
                          boxShadow:
                            "0 18px 60px rgba(229,9,20,0.08)",
                        }
                      : {
                          background: "var(--glass-bg)",
                          border:
                            "1px solid var(--glass-border)",
                        }
                  }
                >
                  {/* =======================================
                      CARD AMBIENT LIGHT
                  ======================================== */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      -right-24
                      -top-24
                      h-64
                      w-64
                      rounded-full
                      bg-[var(--accent)]/[0.08]
                      blur-[75px]
                      opacity-60
                    "
                  />

                  {/* =======================================
                      POPULAR BADGE
                  ======================================== */}

                  {plan.highlighted && (
                    <span
                      className="
                        absolute
                        -top-3
                        left-1/2
                        z-20
                        -translate-x-1/2
                        rounded-full
                        px-4
                        py-1.5
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.12em]
                        text-[var(--accent-foreground)]
                        shadow-[0_8px_25px_rgba(229,9,20,0.22)]
                      "
                      style={{
                        background:
                          "var(--gradient-accent)",
                      }}
                    >
                      Most Popular
                    </span>
                  )}

                  {/* =======================================
                      TOP
                  ======================================== */}

                  <div
                    className="
                      relative
                      z-10
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="
                          font-mono-tag
                          text-[10px]
                          tracking-[0.22em]
                          text-[var(--foreground-muted)]
                        "
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span
                        className="
                          h-px
                          w-6
                          bg-[var(--border)]
                          transition-all
                          duration-300
                          group-hover:w-10
                          group-hover:bg-[var(--accent)]
                        "
                      />
                    </div>

                    <div
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[var(--border)]
                        text-[var(--foreground-muted)]
                        transition-colors
                        duration-300
                        group-hover:border-[var(--accent)]
                        group-hover:text-[var(--accent)]
                      "
                    >
                      <FiArrowUpRight size={15} />
                    </div>
                  </div>

                  {/* =======================================
                      PLAN NAME
                  ======================================== */}

                  <div className="relative z-10 mt-10">
                    <h3
                      className="
                        font-display
                        text-xl
                        font-semibold
                        tracking-[-0.025em]
                        text-[var(--foreground)]
                        transition-colors
                        duration-300
                        group-hover:text-[var(--accent)]
                      "
                    >
                      {plan.name}
                    </h3>

                    {plan.description && (
                      <p
                        className="
                          mt-2
                          text-xs
                          leading-6
                          text-[var(--foreground-muted)]
                        "
                      >
                        {plan.description}
                      </p>
                    )}
                  </div>

                  {/* =======================================
                      PRICE
                  ======================================== */}

                  <div
                    className="
                      relative
                      z-10
                      mt-6
                      flex
                      items-baseline
                      gap-1
                    "
                  >
                    <span
                      className="
                        font-display
                        text-4xl
                        font-semibold
                        tracking-[-0.035em]
                        text-[var(--accent)]
                      "
                    >
                      ${plan.price}
                    </span>

                    <span
                      className="
                        text-xs
                        text-[var(--foreground-muted)]
                      "
                    >
                      / {plan.billingPeriod}
                    </span>
                  </div>

                  {/* =======================================
                      DIVIDER
                  ======================================== */}

                  <div
                    className="
                      relative
                      z-10
                      mt-6
                      h-px
                      w-full
                      bg-gradient-to-r
                      from-[var(--border)]
                      via-[var(--border)]/40
                      to-transparent
                    "
                  />

                  {/* =======================================
                      FEATURES
                  ======================================== */}

                  <ul
                    className="
                      relative
                      z-10
                      mt-6
                      flex-1
                      space-y-3
                    "
                  >
                    {plan.features?.map((feature) => (
                      <li
                        key={feature.text}
                        className="
                          flex
                          items-start
                          gap-2.5
                          text-sm
                        "
                      >
                        <span
                          className={`
                            mt-[2px]
                            flex
                            h-4
                            w-4
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            ${
                              feature.included
                                ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                                : "bg-[var(--foreground-muted)]/5 text-[var(--foreground-muted)]"
                            }
                          `}
                        >
                          {feature.included ? (
                            <FiCheck
                              size={9}
                              strokeWidth={3}
                            />
                          ) : (
                            <FiX
                              size={9}
                              strokeWidth={2}
                            />
                          )}
                        </span>

                        <span
                          className={
                            feature.included
                              ? "text-[var(--foreground)]"
                              : "text-[var(--foreground-muted)] line-through"
                          }
                        >
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* =======================================
                      BUTTON
                  ======================================== */}

                  <a
                    href="#contact"
                    className="
                      group/button
                      relative
                      z-10
                      mt-7
                      flex
                      items-center
                      justify-center
                      gap-2
                      overflow-hidden
                      rounded-full
                      px-5
                      py-3
                      text-sm
                      font-medium

                      transform-gpu
                      transition-transform
                      duration-300
                      ease-out

                      hover:-translate-y-0.5
                    "
                    style={
                      plan.highlighted
                        ? {
                            background:
                              "var(--gradient-accent)",
                            color:
                              "var(--accent-foreground)",
                            boxShadow:
                              "0 10px 30px rgba(229,9,20,0.16)",
                          }
                        : {
                            background:
                              "var(--surface-elevated)",
                            color:
                              "var(--foreground)",
                          }
                    }
                  >
                    <span>Get started</span>

                    <FiArrowUpRight
                      size={14}
                      className="
                        transform-gpu
                        transition-transform
                        duration-300
                        group-hover/button:-translate-y-0.5
                        group-hover/button:translate-x-0.5
                      "
                    />
                  </a>

                  {/* =======================================
                      BOTTOM PROGRESS
                  ======================================== */}

                  <div
                    className="
                      relative
                      z-10
                      mt-5
                      h-px
                      w-full
                      overflow-hidden
                      bg-[var(--border)]
                    "
                  >
                    <div
                      className="
                        h-full
                        w-[18%]
                        bg-[var(--accent)]
                        transition-[width]
                        duration-500
                        ease-out
                        group-hover:w-[65%]
                      "
                      style={{
                        boxShadow:
                          "0 0 8px var(--accent)",
                      }}
                    />
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}

        {/* ===================================================
            BOTTOM
        ==================================================== */}

        {!isLoading && plans && plans.length > 0 && (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1 }}
            viewport={{
              once: true,
              amount: 0.1,
            }}
            transition={{
              duration: 0.4,
              ease: smoothEase,
            }}
            className="
              mt-16
              flex
              items-center
              justify-center
              gap-4
            "
          >
            <span
              className="
                h-px
                w-12
                bg-gradient-to-r
                from-transparent
                to-[var(--accent)]/40
              "
            />

            <div
              className="
                flex
                items-center
                gap-2
                text-[var(--foreground-muted)]
              "
            >
              <FiZap
                size={12}
                className="text-[var(--accent)]"
              />

              <span
                className="
                  font-mono-tag
                  text-[9px]
                  uppercase
                  tracking-[0.25em]
                "
              >
                Choose what fits you best
              </span>
            </div>

            <span
              className="
                h-px
                w-12
                bg-gradient-to-l
                from-transparent
                to-[var(--accent)]/40
              "
            />
          </motion.div>
        )}
      </Container>
    </section>
  );
}
