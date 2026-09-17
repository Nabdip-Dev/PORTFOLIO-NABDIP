
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FiArrowUpRight,
  FiExternalLink,
  FiGithub,
  FiStar,
} from "react-icons/fi";
import type { ProjectData } from "@/types/content";

export function ProjectCard({
  project,
}: {
  project: ProjectData;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -6,
        transition: {
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
        },
      }}
      className="
        group
        relative
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-[1.5rem]

        border
        border-[var(--border)]

        bg-[var(--glass-bg)]
        backdrop-blur-xl

        shadow-[0_12px_45px_rgba(0,0,0,0.035)]

        transition-all
        duration-500
        ease-out

        hover:border-[var(--accent)]/35
        hover:shadow-[0_22px_65px_rgba(0,0,0,0.09)]

        dark:shadow-[0_12px_45px_rgba(0,0,0,0.20)]
        dark:hover:shadow-[0_25px_75px_rgba(0,0,0,0.38)]
      "
    >
      {/* =========================================================
          PREMIUM AMBIENT GLOW
      ========================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          z-0
          h-56
          w-56
          rounded-full
          bg-[var(--accent)]
          opacity-0
          blur-[90px]

          transition-opacity
          duration-700

          group-hover:opacity-[0.13]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-20
          -left-20
          z-0
          h-40
          w-40
          rounded-full
          bg-[var(--accent)]
          opacity-0
          blur-[80px]

          transition-opacity
          duration-1000

          group-hover:opacity-[0.045]
        "
      />

      {/* =========================================================
          IMAGE AREA
      ========================================================= */}

      <Link
        href={`/portfolio/${project.slug}`}
        className="
          relative
          z-10
          block
          aspect-[16/10]
          overflow-hidden
          bg-[var(--surface-elevated)]
        "
      >
        {project.images?.[0]?.url ? (
          <Image
            src={project.images[0].url}
            alt={project.title}
            fill
            sizes="
              (max-width: 640px) 100vw,
              (max-width: 1024px) 50vw,
              33vw
            "
            className="
              object-cover

              transition-transform
              duration-1000
              ease-[cubic-bezier(0.22,1,0.36,1)]

              group-hover:scale-[1.055]
            "
          />
        ) : (
          <div
            className="
              flex
              h-full
              items-center
              justify-center
              text-xs
              text-[var(--foreground-muted)]
            "
          >
            No preview image
          </div>
        )}

        {/* Image overlay */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-black/60
            via-black/8
            to-transparent

            opacity-75

            transition-opacity
            duration-700

            group-hover:opacity-95
          "
        />

        {/* Accent image atmosphere */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-br
            from-[var(--accent)]/0
            via-transparent
            to-[var(--accent)]/20

            opacity-0

            transition-opacity
            duration-700

            group-hover:opacity-100
          "
        />

        {/* Subtle image shine */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            -translate-x-full
            bg-gradient-to-r
            from-transparent
            via-white/[0.08]
            to-transparent

            transition-transform
            duration-[1200ms]
            ease-out

            group-hover:translate-x-full
          "
        />

        {/* =======================================================
            FEATURED BADGE
        ======================================================== */}

        {project.featured && (
          <motion.span
            initial={{
              opacity: 0,
              scale: 0.88,
              y: -4,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              absolute
              left-4
              top-4
              z-20

              flex
              items-center
              gap-1.5

              rounded-full

              border
              border-white/20

              bg-black/45

              px-3
              py-1.5

              text-[10px]
              font-semibold
              uppercase
              tracking-[0.12em]
              text-white

              shadow-[0_8px_25px_rgba(0,0,0,0.18)]

              backdrop-blur-xl
            "
          >
            <FiStar
              size={10}
              className="fill-current text-[var(--accent)]"
            />

            Featured
          </motion.span>
        )}

        {/* =======================================================
            VIEW PROJECT BUTTON
        ======================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
            rotate: -8,
          }}
          whileHover={{
            scale: 1.08,
            rotate: 0,
          }}
          transition={{
            duration: 0.25,
          }}
          className="
            absolute
            bottom-4
            right-4
            z-20

            flex
            h-10
            w-10
            items-center
            justify-center

            rounded-full

            border
            border-white/20

            bg-black/45

            text-white

            opacity-0

            shadow-[0_8px_25px_rgba(0,0,0,0.2)]

            backdrop-blur-xl

            transition-all
            duration-400

            group-hover:opacity-100
          "
        >
          <FiArrowUpRight size={17} />
        </motion.div>

        {/* Category */}

        <div
          className="
            absolute
            bottom-4
            left-4
            z-20

            rounded-full

            border
            border-white/15

            bg-black/35

            px-3
            py-1.5

            font-mono
            text-[9px]
            uppercase
            tracking-[0.16em]
            text-white/90

            shadow-[0_5px_20px_rgba(0,0,0,0.12)]

            backdrop-blur-xl

            transition-all
            duration-300

            group-hover:border-white/25
          "
        >
          {project.category}
        </div>
      </Link>

      {/* =========================================================
          CONTENT
      ========================================================= */}

      <div
        className="
          relative
          z-10
          flex
          flex-1
          flex-col

          p-5
          sm:p-[1.35rem]
        "
      >
        {/* Title */}

        <Link
          href={`/portfolio/${project.slug}`}
          className="group/title inline-block"
        >
          <div className="flex items-start justify-between gap-4">
            <h3
              className="
                font-display
                text-[1.05rem]
                font-semibold
                leading-[1.25]

                text-[var(--foreground)]

                transition-all
                duration-300

                group-hover/title:translate-x-0.5
                group-hover/title:text-[var(--accent)]
              "
            >
              {project.title}
            </h3>

            <span
              className="
                mt-0.5
                shrink-0

                text-[var(--foreground-muted)]

                opacity-35

                transition-all
                duration-300

                group-hover/title:translate-x-0.5
                group-hover/title:-translate-y-0.5
                group-hover/title:text-[var(--accent)]
                group-hover/title:opacity-100
              "
            >
              <FiArrowUpRight size={17} />
            </span>
          </div>
        </Link>

        {/* Description */}

        <p
          className="
            mt-3

            line-clamp-2
            flex-1

            text-[13px]
            leading-[1.7]

            text-[var(--foreground-muted)]
          "
        >
          {project.shortDescription || project.description}
        </p>

        {/* =======================================================
            TECHNOLOGIES
        ======================================================== */}

        {project.technologies &&
          project.technologies.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-1.5">
              {project.technologies
                .slice(0, 4)
                .map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{
                      opacity: 0,
                      y: 5,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                    }}
                    className="
                      rounded-full

                      border
                      border-[var(--border)]

                      bg-[var(--surface-elevated)]

                      px-2.5
                      py-1

                      font-mono-tag
                      text-[9px]
                      font-medium

                      text-[var(--foreground-muted)]

                      transition-all
                      duration-300

                      hover:-translate-y-0.5
                      hover:border-[var(--accent)]/30
                      hover:text-[var(--accent)]
                    "
                  >
                    {tech}
                  </motion.span>
                ))}

              {project.technologies.length > 4 && (
                <span
                  className="
                    rounded-full

                    border
                    border-[var(--border)]

                    px-2.5
                    py-1

                    font-mono-tag
                    text-[9px]

                    text-[var(--foreground-muted)]
                  "
                >
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>
          )}

        {/* =======================================================
            BOTTOM ACTION AREA
        ======================================================== */}

        <div
          className="
            mt-6

            flex
            items-center
            justify-between

            border-t
            border-[var(--border)]

            pt-4
          "
        >
          {/* Project link */}

          <Link
            href={`/portfolio/${project.slug}`}
            className="
              group/link

              inline-flex
              items-center
              gap-2

              text-[10px]
              font-semibold
              uppercase
              tracking-[0.15em]

              text-[var(--foreground-muted)]

              transition-all
              duration-300

              hover:gap-3
              hover:text-[var(--accent)]
            "
          >
            <span>View project</span>

            <FiArrowUpRight
              size={13}
              className="
                transition-transform
                duration-300

                group-hover/link:translate-x-0.5
                group-hover/link:-translate-y-0.5
              "
            />
          </Link>

          {/* External links */}

          <div className="flex items-center gap-1.5">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} GitHub repository`}
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center

                  rounded-full

                  border
                  border-[var(--border)]

                  bg-[var(--surface)]

                  text-[var(--foreground-muted)]

                  shadow-sm

                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:border-[var(--accent)]/40
                  hover:bg-[var(--accent)]/10
                  hover:text-[var(--accent)]
                  hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)]
                "
              >
                <FiGithub size={15} />
              </a>
            )}

            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live website`}
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center

                  rounded-full

                  border
                  border-[var(--border)]

                  bg-[var(--surface)]

                  text-[var(--foreground-muted)]

                  shadow-sm

                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:border-[var(--accent)]/40
                  hover:bg-[var(--accent)]/10
                  hover:text-[var(--accent)]
                  hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)]
                "
              >
                <FiExternalLink size={15} />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* =========================================================
          PREMIUM BOTTOM ACCENT
      ========================================================= */}

      <motion.div
        initial={{
          scaleX: 0,
        }}
        whileHover={{
          scaleX: 1,
        }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          absolute
          bottom-0
          left-0
          right-0

          h-[2px]

          origin-left

          bg-[var(--gradient-accent)]

          shadow-[0_0_12px_var(--accent)]
        "
      />

      {/* Subtle inner highlight */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-20

          rounded-[1.5rem]

          ring-1
          ring-inset
          ring-white/[0.025]

          transition-all
          duration-500

          group-hover:ring-white/[0.06]
        "
      />
    </motion.article>
  );
}

