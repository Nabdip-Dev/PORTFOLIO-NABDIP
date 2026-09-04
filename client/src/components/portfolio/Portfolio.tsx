"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiSliders, FiArrowRight } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";

import { fetchProjects } from "@/services/api/projectService";
import { useDebounce } from "@/hooks/useDebounce";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";
import { Skeleton } from "@/components/ui/Skeleton";
import { ProjectCard } from "./ProjectCard";

const CATEGORIES = [
  "all",
  "web app",
  "mobile app",
  "landing page",
  "dashboard",
  "api",
];

const ease = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease,
    },
  },
};

export function Portfolio() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search);
  const { t } = useLanguage();

  const { data, isLoading } = useQuery({
    queryKey: ["projects", debouncedSearch, category, page],
    queryFn: () =>
      fetchProjects({
        page,
        limit: 6,
        search: debouncedSearch || undefined,
        category: category === "all" ? undefined : category,
      }),
  });

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    setPage(1);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <section
      id="portfolio"
      className="
        relative
        isolate
        overflow-visible
        py-24
        sm:py-32
        lg:py-40

        bg-[var(--background)]
        text-[var(--foreground)]

        transition-colors
        duration-700
      "
    >
      {/* =========================================================
          PORTFOLIO ONLY BACKGROUND
      ========================================================= */}

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Section-specific gradient */}

        <div
          className="
            absolute
            inset-0
            bg-[var(--portfolio-gradient)]
            transition-all
            duration-700
          "
        />

        {/* Top-right red glow */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.75,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1.5,
            ease,
          }}
          className="
            absolute
            -right-40
            -top-32
            h-[460px]
            w-[460px]
            rounded-full
            bg-[var(--accent)]/[0.06]
            blur-[140px]

            dark:bg-[var(--accent)]/[0.14]
          "
        />

        {/* Bottom-left glow */}

        <div
          className="
            absolute
            -bottom-40
            -left-40
            h-[440px]
            w-[440px]
            rounded-full
            bg-[var(--accent)]/[0.045]
            blur-[140px]

            dark:bg-[var(--accent)]/[0.10]
          "
        />

        {/* Center soft glow */}

        <div
          className="
            absolute
            left-1/2
            top-1/3
            h-[300px]
            w-[650px]
            -translate-x-1/2
            rounded-full
            bg-[var(--accent)]/[0.025]
            blur-[130px]

            dark:bg-[var(--accent)]/[0.05]
          "
        />

        {/* Minimal grid */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.018]

            [background-image:linear-gradient(rgba(0,0,0,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.6)_1px,transparent_1px)]
            [background-size:90px_90px]

            dark:opacity-[0.035]
            dark:[background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]
          "
        />

        {/* Bottom fade */}

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-48
            bg-gradient-to-t
            from-black/[0.025]
            to-transparent

            dark:from-black/40
          "
        />
      </div>

      <Container>
        {/* =========================================================
            SECTION HEADING
        ========================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.8,
            ease,
          }}
        >
          <SectionHeading
            eyebrow={t.sections.portfolio.eyebrow}
            title={t.sections.portfolio.title}
          />
        </motion.div>

        {/* =========================================================
            FILTER BAR
        ========================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.7,
            delay: 0.12,
            ease,
          }}
          className="
            mt-14
            rounded-[1.75rem]
            border
            border-[var(--border)]
            bg-[var(--glass-bg)]
            p-3
            backdrop-blur-xl

            shadow-[0_20px_60px_rgba(0,0,0,0.04)]

            dark:shadow-[0_20px_60px_rgba(0,0,0,0.25)]
          "
        >
          <div
            className="
              flex
              flex-col
              gap-4

              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >
            {/* =====================================================
                CATEGORY FILTERS
            ====================================================== */}

            <div className="flex min-w-0 items-center gap-2">
              {/* Filter icon */}

              <div
                className="
                  hidden
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-[var(--border)]
                  bg-[var(--surface)]
                  text-[var(--accent)]

                  sm:flex
                "
              >
                <FiSliders size={15} />
              </div>

              {/* Categories */}

              <div
                className="
                  flex
                  min-w-0
                  flex-1
                  gap-2
                  overflow-x-auto
                  pb-1

                  lg:flex-wrap
                  lg:overflow-visible
                "
              >
                {CATEGORIES.map((cat) => {
                  const active = category === cat;

                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() =>
                        handleCategoryChange(cat)
                      }
                      className="
                        relative
                        shrink-0
                        overflow-hidden
                        rounded-full
                        px-4
                        py-2.5
                        text-xs
                        font-semibold
                        capitalize
                        tracking-wide

                        transition-all
                        duration-300

                        hover:-translate-y-0.5

                        focus:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-[var(--accent)]/40
                      "
                    >
                      {/* Active pill */}

                      {active && (
                        <motion.span
                          layoutId="portfolio-category-active"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 28,
                          }}
                          className="
                            absolute
                            inset-0
                            rounded-full
                            bg-[var(--gradient-accent)]
                            shadow-[0_8px_25px_rgba(229,9,20,0.22)]
                          "
                        />
                      )}

                      {/* Inactive background */}

                      {!active && (
                        <span
                          className="
                            absolute
                            inset-0
                            rounded-full
                            bg-[var(--surface-elevated)]
                            opacity-0
                            transition-opacity
                            duration-300

                            group-hover:opacity-100
                          "
                        />
                      )}

                      <span
                        className={`
                          relative
                          z-10
                          ${
                            active
                              ? "text-[var(--accent-foreground)]"
                              : "text-[var(--foreground-muted)]"
                          }
                        `}
                      >
                        {cat}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* =====================================================
                SEARCH
            ====================================================== */}

            <div className="relative w-full lg:w-72">
              <FiSearch
                size={16}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-[var(--foreground-muted)]

                  transition-colors
                  duration-300
                "
              />

              <input
                value={search}
                onChange={(e) =>
                  handleSearch(e.target.value)
                }
                placeholder="Search projects..."
                aria-label="Search projects"
                className="
                  h-11
                  w-full
                  rounded-full
                  border
                  border-[var(--border)]
                  bg-[var(--surface)]
                  pl-11
                  pr-5
                  text-sm
                  text-[var(--foreground)]
                  placeholder:text-[var(--foreground-muted)]
                  outline-none

                  transition-all
                  duration-300

                  focus:border-[var(--accent)]
                  focus:ring-4
                  focus:ring-[var(--accent)]/10
                "
              />

              {/* Search active line */}

              <motion.div
                initial={{
                  scaleX: 0,
                }}
                animate={{
                  scaleX: search ? 1 : 0,
                }}
                className="
                  pointer-events-none
                  absolute
                  bottom-0
                  left-5
                  right-5
                  h-px
                  origin-left
                  bg-[var(--accent)]
                "
              />
            </div>
          </div>
        </motion.div>

        {/* =========================================================
            PROJECT AREA
        ========================================================= */}

        <div className="mt-10">
          {/* =======================================================
              LOADING
          ======================================================== */}

          {isLoading ? (
            <div
              className="
                grid
                gap-7
                sm:grid-cols-2
                lg:grid-cols-3
              "
            >
              {Array.from({ length: 6 }).map(
                (_, index) => (
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.06,
                    }}
                    className="
                      overflow-hidden
                      rounded-[1.5rem]
                      border
                      border-[var(--border)]
                      bg-[var(--glass-bg)]
                      p-2
                    "
                  >
                    <Skeleton
                      className="
                        h-52
                        w-full
                        rounded-[1.15rem]
                      "
                    />

                    <div className="space-y-3 p-4">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />

                      <div className="flex gap-2 pt-2">
                        <Skeleton className="h-6 w-16 rounded-full" />
                        <Skeleton className="h-6 w-20 rounded-full" />
                      </div>
                    </div>
                  </motion.div>
                ),
              )}
            </div>
          ) : data && data.data.length > 0 ? (
            <>
              {/* ===================================================
                  RESULTS LABEL
              ==================================================== */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="
                  mb-7
                  flex
                  items-center
                  justify-between
                "
              >
                <div className="flex items-center gap-3">
                  <span
                    className="
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-[var(--accent)]
                      shadow-[0_0_12px_rgba(229,9,20,0.8)]
                    "
                  />

                  <span
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.28em]
                      text-[var(--foreground-muted)]
                    "
                  >
                    Selected Work
                  </span>
                </div>

                <span
                  className="
                    hidden
                    text-xs
                    text-[var(--foreground-muted)]
                    sm:block
                  "
                >
                  {data.data.length} projects
                </span>
              </motion.div>

              {/* ===================================================
                  PROJECT GRID
              ==================================================== */}

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${category}-${debouncedSearch}-${page}`}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="
                    grid
                    gap-7
                    sm:grid-cols-2
                    lg:grid-cols-3
                  "
                >
                  {data.data.map(
                    (project, index) => (
                      <motion.div
                        key={project._id}
                        variants={itemVariants}
                        whileHover={{
                          y: -8,
                        }}
                        className="group relative"
                      >
                        {/* Hover glow */}

                        <div
                          className="
                            pointer-events-none
                            absolute
                            -inset-3
                            rounded-[2rem]
                            bg-[var(--accent)]
                            opacity-0
                            blur-2xl

                            transition-opacity
                            duration-500

                            group-hover:opacity-[0.10]
                          "
                        />

                        {/* Project number */}

                        <div
                          className="
                            pointer-events-none
                            absolute
                            right-4
                            top-4
                            z-20
                            flex
                            h-7
                            min-w-7
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-white/15
                            bg-black/30
                            px-2
                            text-[9px]
                            font-semibold
                            tracking-widest
                            text-white
                            opacity-0
                            backdrop-blur-md

                            transition-all
                            duration-300

                            group-hover:opacity-100
                          "
                        >
                          {String(index + 1).padStart(
                            2,
                            "0",
                          )}
                        </div>

                        <ProjectCard project={project} />
                      </motion.div>
                    ),
                  )}
                </motion.div>
              </AnimatePresence>

              {/* ===================================================
                  PAGINATION
              ==================================================== */}

              {data.pagination.pages > 1 && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.6,
                    ease,
                  }}
                  className="
                    mt-16
                    flex
                    flex-col
                    items-center
                    gap-5
                  "
                >
                  <div
                    className="
                      h-px
                      w-full
                      max-w-lg
                      bg-gradient-to-r
                      from-transparent
                      via-[var(--border)]
                      to-transparent
                    "
                  />

                  <div className="flex items-center gap-2">
                    {Array.from({
                      length: data.pagination.pages,
                    }).map((_, index) => {
                      const pageNumber = index + 1;
                      const active =
                        page === pageNumber;

                      return (
                        <motion.button
                          key={pageNumber}
                          type="button"
                          onClick={() =>
                            setPage(pageNumber)
                          }
                          whileHover={{
                            y: -2,
                          }}
                          whileTap={{
                            scale: 0.92,
                          }}
                          className={`
                            relative
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            overflow-hidden
                            rounded-full
                            text-xs
                            font-semibold

                            transition-all
                            duration-300

                            ${
                              active
                                ? "text-[var(--accent-foreground)] shadow-[0_8px_25px_rgba(229,9,20,0.22)]"
                                : "border border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--foreground-muted)] hover:border-[var(--accent)]/40 hover:text-[var(--accent)]"
                            }
                          `}
                        >
                          {active && (
                            <motion.span
                              layoutId="portfolio-page-active"
                              className="
                                absolute
                                inset-0
                                bg-[var(--gradient-accent)]
                              "
                              transition={{
                                type: "spring",
                                stiffness: 350,
                                damping: 28,
                              }}
                            />
                          )}

                          <span className="relative z-10">
                            {pageNumber}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      text-[10px]
                      uppercase
                      tracking-[0.2em]
                      text-[var(--foreground-muted)]
                    "
                  >
                    Page {page} of{" "}
                    {data.pagination.pages}

                    <FiArrowRight
                      size={12}
                      className="text-[var(--accent)]"
                    />
                  </div>
                </motion.div>
              )}
            </>
          ) : (
            /* =====================================================
               EMPTY STATE
            ====================================================== */

            <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                ease,
              }}
              className="
                relative
                mx-auto
                max-w-xl
                overflow-hidden
                rounded-[2rem]
                border
                border-[var(--border)]
                bg-[var(--glass-bg)]
                p-12
                text-center
                backdrop-blur-xl
              "
            >
              <div
                className="
                  pointer-events-none
                  absolute
                  left-1/2
                  top-0
                  h-32
                  w-64
                  -translate-x-1/2
                  rounded-full
                  bg-[var(--accent)]/[0.08]
                  blur-3xl
                "
              />

              <div
                className="
                  relative
                  mx-auto
                  mb-5
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[var(--accent)]/25
                  bg-[var(--accent)]/10
                  text-[var(--accent)]
                "
              >
                <FiSearch size={20} />
              </div>

              <h3
                className="
                  relative
                  text-lg
                  font-semibold
                  text-[var(--foreground)]
                "
              >
                No projects found
              </h3>

              <p
                className="
                  relative
                  mt-2
                  text-sm
                  leading-6
                  text-[var(--foreground-muted)]
                "
              >
                No projects match your current
                search or category filters.
              </p>
            </motion.div>
          )}
        </div>

        {/* =========================================================
            SECTION BOTTOM DECORATION
        ========================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            scaleX: 0,
          }}
          whileInView={{
            opacity: 1,
            scaleX: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1,
            ease,
          }}
          className="
            mx-auto
            mt-20
            flex
            max-w-3xl
            items-center
            gap-4
          "
        >
          <div
            className="
              h-px
              flex-1
              bg-gradient-to-r
              from-transparent
              to-[var(--accent)]/30
            "
          />

          <span
            className="
              h-1.5
              w-1.5
              shrink-0
              rounded-full
              bg-[var(--accent)]
              shadow-[0_0_14px_rgba(229,9,20,0.9)]
            "
          />

          <div
            className="
              h-px
              flex-1
              bg-gradient-to-l
              from-transparent
              to-[var(--accent)]/30
            "
          />
        </motion.div>
      </Container>
    </section>
  );
}
