"use client";

import { memo, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, useReducedMotion } from "framer-motion";
import {
  FiArrowUpRight,
  FiCheck,
  FiZap,
} from "react-icons/fi";

import { fetchServices } from "@/services/api/serviceService";
import { resolveIcon } from "@/utils/resolveIcon";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";
import { Skeleton } from "@/components/ui/Skeleton";

/* =========================================================
   EASING
========================================================= */

const smoothEase = [0.22, 1, 0.36, 1] as const;

/* =========================================================
   VARIANTS
========================================================= */

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.045,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 14,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: smoothEase,
    },
  },
};

/* =========================================================
   STATIC STYLES
========================================================= */

const gridStyle = {
  backgroundImage: `
    linear-gradient(
      to right,
      var(--services-grid-color) 1px,
      transparent 1px
    ),
    linear-gradient(
      to bottom,
      var(--services-grid-color) 1px,
      transparent 1px
    )
  `,
  backgroundSize: "70px 70px",
};

const progressStyle = {
  boxShadow: "0 0 8px var(--accent)",
};

/* =========================================================
   SERVICE CARD
========================================================= */

const ServiceCard = memo(function ServiceCard({
  service,
  index,
  shouldReduceMotion,
}: {
  service: any;
  index: number;
  shouldReduceMotion: boolean;
}) {
  const Icon = useMemo(
    () => resolveIcon(service.icon),
    [service.icon]
  );

  return (
    <motion.article
      variants={cardVariants}
      className="
        group
        relative
        transform-gpu
      "
      style={{
        contain: "layout",
      }}
    >
      {/* ===================================================
          GLOW
      ==================================================== */}

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
          duration-500
          group-hover:opacity-[0.07]
        "
      />

      {/* ===================================================
          CARD
      ==================================================== */}

      <motion.div
        whileHover={
          shouldReduceMotion
            ? undefined
            : {
                y: -3,
              }
        }
        transition={{
          duration: 0.3,
          ease: smoothEase,
        }}
        className="
          relative
          flex
          min-h-[450px]
          flex-col
          overflow-hidden
          rounded-[1.75rem]
          border
          border-[var(--glass-border)]
          bg-[var(--glass-bg)]
          p-7
          sm:p-8
        "
        style={{
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          isolation: "isolate",
        }}
      >
        {/* =================================================
            CARD LIGHT
        ================================================== */}

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

        {/* =================================================
            TOP
        ================================================== */}

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
                transition-[width,background-color]
                duration-500
                ease-out
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
              transform-gpu
              items-center
              justify-center
              rounded-full
              border
              border-[var(--border)]
              text-[var(--foreground-muted)]
              transition-[transform,border-color,color]
              duration-500
              ease-out
              group-hover:translate-x-0.5
              group-hover:-translate-y-0.5
              group-hover:border-[var(--accent)]
              group-hover:text-[var(--accent)]
            "
          >
            <FiArrowUpRight size={15} />
          </div>
        </div>

        {/* =================================================
            ICON
        ================================================== */}

        <div className="relative z-10 mt-10">
          <div
            className="
              relative
              flex
              h-[70px]
              w-[70px]
              transform-gpu
              items-center
              justify-center
              overflow-hidden
              rounded-2xl
              border
              border-[var(--accent)]/20
              bg-[var(--accent)]/[0.07]
              text-[var(--accent)]
              shadow-[0_0_30px_rgba(229,9,20,0.06)]
              transition-[transform,border-color,background-color]
              duration-500
              ease-out
              group-hover:-translate-y-1
              group-hover:border-[var(--accent)]/40
              group-hover:bg-[var(--accent)]/[0.1]
            "
          >
            <div
              className="
                absolute
                inset-0
                rounded-2xl
                bg-[var(--accent)]/[0.05]
              "
            />

            <Icon
              size={28}
              strokeWidth={1.6}
              className="
                relative
                z-10
                transform-gpu
                transition-transform
                duration-500
                ease-out
                group-hover:scale-105
              "
            />
          </div>
        </div>

        {/* =================================================
            TITLE
        ================================================== */}

        <div className="relative z-10 mt-7">
          <h3
            className="
              font-display
              max-w-[92%]
              text-xl
              font-semibold
              tracking-[-0.025em]
              text-[var(--foreground)]
              transition-colors
              duration-500
              ease-out
              group-hover:text-[var(--accent)]
            "
          >
            {service.title}
          </h3>

          <p
            className="
              mt-3
              max-w-[96%]
              text-sm
              leading-7
              text-[var(--foreground-muted)]
            "
          >
            {service.description}
          </p>
        </div>

        {/* =================================================
            FEATURES
        ================================================== */}

        {service.features?.length > 0 && (
          <div className="relative z-10 mt-6">
            <div
              className="
                mb-4
                h-px
                w-full
                bg-gradient-to-r
                from-[var(--border)]
                via-[var(--border)]/40
                to-transparent
              "
            />

            <ul className="space-y-2.5">
              {service.features.map((feature: string) => (
                <li
                  key={feature}
                  className="
                    flex
                    items-start
                    gap-2.5
                    text-xs
                    text-[var(--foreground-muted)]
                  "
                >
                  <span
                    className="
                      mt-[2px]
                      flex
                      h-4
                      w-4
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[var(--accent)]/10
                      text-[var(--accent)]
                    "
                  >
                    <FiCheck
                      size={9}
                      strokeWidth={3}
                    />
                  </span>

                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* =================================================
            FOOTER
        ================================================== */}

        <div className="relative z-10 mt-auto pt-8">
          <div
            className="
              flex
              items-end
              justify-between
              gap-4
            "
          >
            {typeof service.price === "number" ? (
              <div>
                <div
                  className="
                    font-mono-tag
                    text-[9px]
                    uppercase
                    tracking-[0.2em]
                    text-[var(--foreground-muted)]
                  "
                >
                  Starting from
                </div>

                <div
                  className="
                    font-display
                    mt-1
                    text-2xl
                    font-semibold
                    text-[var(--accent)]
                  "
                >
                  ${service.price}
                </div>
              </div>
            ) : (
              <div
                className="
                  font-mono-tag
                  text-[9px]
                  uppercase
                  tracking-[0.2em]
                  text-[var(--foreground-muted)]
                "
              >
                Custom engagement
              </div>
            )}

            <div className="flex items-center gap-2">
              <span
                className="
                  font-mono-tag
                  text-[9px]
                  uppercase
                  tracking-[0.15em]
                  text-[var(--foreground-muted)]
                "
              >
                Explore
              </span>

              <FiArrowUpRight
                size={14}
                className="
                  transform-gpu
                  text-[var(--accent)]
                  transition-transform
                  duration-500
                  ease-out
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
              />
            </div>
          </div>

          {/* Progress */}

          <div
            className="
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
                transform-gpu
                bg-[var(--accent)]
                transition-[width]
                duration-700
                ease-out
                group-hover:w-[65%]
              "
              style={progressStyle}
            />
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
});

/* =========================================================
   SERVICES
========================================================= */

export function Services() {
  const shouldReduceMotion = useReducedMotion();

  const {
    data: services,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
  });

  const { t } = useLanguage();

  const active = useMemo(
    () => (services ?? []).filter((service) => service.active),
    [services]
  );

  return (
    <section
      id="services"
      className="
        services-section
        relative
        isolate
        overflow-hidden
        py-28
        sm:py-32
        lg:py-40
      "
    >
      {/* ===================================================
          BACKGROUND
      ==================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          -z-20
          overflow-hidden
        "
        style={{
          contain: "paint",
        }}
      >
        {/* Base */}

        <div
          className="absolute inset-0"
          style={{
            background: "var(--services-bg)",
          }}
        />

        {/* =================================================
            SVG
        ================================================== */}

        <svg
          className="
            services-svg
            absolute
            inset-0
            h-full
            w-full
          "
          viewBox="0 0 1440 1200"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
          style={{
            display: "block",
          }}
        >
          <defs>
            <linearGradient
              id="servicesFlow"
              x1="0"
              y1="0"
              x2="1440"
              y2="1200"
              gradientUnits="userSpaceOnUse"
            >
              <stop
                stopColor="var(--services-svg-primary)"
                stopOpacity="0"
              />

              <stop
                offset="0.32"
                stopColor="var(--services-svg-primary)"
                stopOpacity="var(--services-svg-opacity)"
              />

              <stop
                offset="0.68"
                stopColor="var(--services-svg-secondary)"
                stopOpacity="var(--services-svg-opacity)"
              />

              <stop
                offset="1"
                stopColor="var(--services-svg-secondary)"
                stopOpacity="0"
              />
            </linearGradient>

            <radialGradient
              id="servicesCenterGlow"
              cx="50%"
              cy="40%"
              r="65%"
            >
              <stop
                offset="0"
                stopColor="var(--services-svg-primary)"
                stopOpacity="0.055"
              />

              <stop
                offset="1"
                stopColor="var(--services-svg-primary)"
                stopOpacity="0"
              />
            </radialGradient>
          </defs>

          <ellipse
            cx="720"
            cy="430"
            rx="700"
            ry="480"
            fill="url(#servicesCenterGlow)"
          />

          <path
            d="
              M-120 880
              C170 610 330 700 520 510
              C710 320 820 120 1100 180
              C1270 215 1390 340 1570 210
            "
            stroke="url(#servicesFlow)"
            strokeWidth="1"
          />

          <path
            d="
              M-100 980
              C190 710 390 790 570 610
              C760 420 900 250 1160 290
              C1320 315 1410 420 1550 340
            "
            stroke="url(#servicesFlow)"
            strokeWidth="0.7"
            strokeDasharray="8 14"
            opacity="0.4"
          />

          <circle
            cx="1110"
            cy="180"
            r="3"
            fill="var(--services-svg-primary)"
            opacity="0.32"
          />

          <circle
            cx="520"
            cy="510"
            r="2.5"
            fill="var(--services-svg-secondary)"
            opacity="0.24"
          />

          <circle
            cx="900"
            cy="320"
            r="2"
            fill="var(--services-svg-primary)"
            opacity="0.2"
          />
        </svg>

        {/* =================================================
            ORB 01
            Static = no continuous GPU work
        ================================================== */}

        <div
          className="
            services-orb
            absolute
            left-[4%]
            top-[13%]
            h-56
            w-56
            rounded-full
            bg-[var(--services-svg-glow)]
            blur-[90px]
          "
        />

        {/* =================================================
            ORB 02
        ================================================== */}

        <div
          className="
            services-orb
            absolute
            bottom-[7%]
            right-[4%]
            h-64
            w-64
            rounded-full
            bg-[var(--services-svg-glow)]
            blur-[100px]
          "
        />

        {/* =================================================
            GRID
        ================================================== */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.16]
          "
          style={gridStyle}
        />

        {/* =================================================
            TOP FADE
        ================================================== */}

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

        {/* =================================================
            BOTTOM FADE
        ================================================== */}

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

      {/* ===================================================
          CONTENT
      ==================================================== */}

      <Container>
        {/* =================================================
            HEADER
        ================================================== */}

        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 12,
                }
          }
          whileInView={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: 1,
                  y: 0,
                }
          }
          viewport={{
            once: true,
            margin: "-80px",
          }}
          transition={{
            duration: 0.65,
            ease: smoothEase,
          }}
          className="
            relative
            mb-16
            sm:mb-20
          "
        >
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
              {t.sections.services.eyebrow}
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

          <SectionHeading
            eyebrow=""
            title={t.sections.services.title}
          />

          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    scaleX: 0,
                  }
            }
            whileInView={
              shouldReduceMotion
                ? undefined
                : {
                    scaleX: 1,
                  }
            }
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
              delay: 0.12,
              ease: smoothEase,
            }}
            className="
              mt-8
              h-px
              w-full
              max-w-2xl
              origin-left
              transform-gpu
              bg-gradient-to-r
              from-[var(--accent)]/70
              via-[var(--accent)]/20
              to-transparent
            "
          />
        </motion.div>

        {/* =================================================
            LOADING
        ================================================== */}

        {isLoading ? (
          <div
            className="
              grid
              gap-6
              md:grid-cols-2
              xl:grid-cols-3
            "
          >
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                key={index}
                className="
                  h-[450px]
                  w-full
                  rounded-[1.75rem]
                "
              />
            ))}
          </div>
        ) : isError ? (
          <motion.div
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
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
              Unable to load services right now.
            </p>
          </motion.div>
        ) : active.length === 0 ? (
          <motion.div
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
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
              No services available at the moment.
            </p>
          </motion.div>
        ) : (
          /* =================================================
              SERVICE GRID
          ================================================== */

          <motion.div
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              margin: "-60px",
            }}
            className="
              grid
              gap-6
              md:grid-cols-2
              xl:grid-cols-3
            "
          >
            {active.map((service, index) => (
              <ServiceCard
                key={service._id}
                service={service}
                index={index}
                shouldReduceMotion={Boolean(
                  shouldReduceMotion
                )}
              />
            ))}
          </motion.div>
        )}

        {/* =================================================
            BOTTOM
        ================================================== */}

        {!isLoading && active.length > 0 && (
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                  }
            }
            whileInView={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 1,
                  }
            }
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
              delay: 0.15,
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
                Crafted with precision
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
