"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FiSearch,
  FiSliders,
  FiArrowRight,
} from "react-icons/fi";
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

/* =========================================================
   LIGHTWEIGHT ANIMATION
========================================================= */

const revealVariants = {
  hidden: {
    opacity: 0,
    y: 14,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease,
    },
  },
};

const gridVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.045,
    },
  },
};

export function Portfolio() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);

  const shouldReduceMotion = useReducedMotion();

  const debouncedSearch = useDebounce(search);

  const { t } = useLanguage();

  const { data, isLoading } = useQuery({
    queryKey: [
      "projects",
      debouncedSearch,
      category,
      page,
    ],

    queryFn: () =>
      fetchProjects({
        page,
        limit: 6,
        search: debouncedSearch || undefined,
        category:
          category === "all"
            ? undefined
            : category,
      }),
  });

  /* =========================================================
     HANDLERS
  ========================================================= */

  const handleCategoryChange = (cat: string) => {
    if (cat === category) return;

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
        duration-500
      "
    >
      {/* =========================================================
          BACKGROUND
          STATIC = MUCH SMOOTHER
      ========================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          -z-10
          overflow-hidden
        "
      >
        {/* Main background */}

        <div
          className="
            absolute
            inset-0
            bg-[var(--portfolio-gradient)]
          "
        />

        {/* =======================================================
            TOP RIGHT GLOW
            Static instead of animated
        ======================================================== */}

        <div
          className="
            absolute
            -right-40
            -top-32
            h-[460px]
            w-[460px]
            rounded-full
            bg-[var(--accent)]/[0.055]
            blur-[120px]

            dark:bg-[var(--accent)]/[0.11]
          "
        />

        {/* =======================================================
            BOTTOM LEFT GLOW
        ======================================================== */}

        <div
          className="
            absolute
            -bottom-40
            -left-40
            h-[440px]
            w-[440px]
            rounded-full
            bg-[var(--accent)]/[0.035]
            blur-[120px]

            dark:bg-[var(--accent)]/[0.08]
          "
        />

        {/* =======================================================
            CENTER LIGHT
        ======================================================== */}

        <div
          className="
            absolute
            left-1/2
            top-1/3
            h-[280px]
            w-[600px]
            -translate-x-1/2
            rounded-full
            bg-[var(--accent)]/[0.018]
            blur-[110px]

            dark:bg-[var(--accent)]/[0.04]
          "
        />

        {/* =======================================================
            GRID
        ======================================================== */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.016]

            [background-image:linear-gradient(rgba(0,0,0,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.6)_1px,transparent_1px)]
            [background-size:90px_90px]

            dark:opacity-[0.03]
            dark:[background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]
          "
        />

        {/* =======================================================
            BOTTOM FADE
        ======================================================== */}

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-48
            bg-gradient-to-t
            from-black/[0.02]
            to-transparent

            dark:from-black/35
          "
        />
      </div>

      <Container>
        {/* =========================================================
            HEADING
        ========================================================= */}

        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : "hidden"
          }
          whileInView={
            shouldReduceMotion
              ? undefined
              : "visible"
          }
          viewport={{
            once: true,
            amount: 0.2,
          }}
          variants={revealVariants}
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
          initial={
            shouldReduceMotion
              ? false
              : "hidden"
          }
          whileInView={
            shouldReduceMotion
              ? undefined
              : "visible"
          }
          viewport={{
            once: true,
            amount: 0.15,
          }}
          variants={revealVariants}
          className="
            mt-14
            rounded-[1.75rem]
            border
            border-[var(--border)]
            bg-[var(--glass-bg)]
            p-3

            backdrop-blur-lg

            shadow-[0_15px_45px_rgba(0,0,0,0.035)]

            dark:shadow-[0_15px_45px_rgba(0,0,0,0.2)]
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
                CATEGORIES
            ====================================================== */}

            <div
              className="
                flex
                min-w-0
                items-center
                gap-2
              "
            >
              {/* Filter Icon */}

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

              {/* Category List */}

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

                  scrollbar-none
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
                      className={`
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

                        outline-none

                        transition-[color,background-color,border-color,transform]
                        duration-200
                        ease-out

                        ${
                          active
                            ? "text-[var(--accent-foreground)]"
                            : "text-[var(--foreground-muted)] hover:-translate-y-[1px] hover:text-[var(--foreground)]"
                        }

                        focus-visible:ring-2
                        focus-visible:ring-[var(--accent)]/40
                      `}
                    >
                      {/* Active */}

                      {active && (
                        <span
                          className="
                            absolute
                            inset-0
                            rounded-full
                            bg-[var(--gradient-accent)]
                            shadow-[0_6px_18px_rgba(229,9,20,0.16)]
                          "
                        />
                      )}

                      {/* Inactive */}

                      {!active && (
                        <span
                          className="
                            absolute
                            inset-0
                            rounded-full
                            bg-[var(--surface-elevated)]
                            opacity-0
                            transition-opacity
                            duration-200

                            hover:opacity-100
                          "
                        />
                      )}

                      <span className="relative z-10">
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
                  pointer-events-none
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-[var(--foreground-muted)]
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

                  transition-[border-color,box-shadow]
                  duration-200

                  focus:border-[var(--accent)]
                  focus:ring-4
                  focus:ring-[var(--accent)]/10
                "
              />

              {/* Active Search Line */}

              <span
                className={`
                  pointer-events-none
                  absolute
                  bottom-0
                  left-5
                  right-5
                  h-px
                  origin-left
                  bg-[var(--accent)]

                  transition-transform
                  duration-300
                  ease-out

                  ${
                    search
                      ? "scale-x-100"
                      : "scale-x-0"
                  }
                `}
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
              {Array.from({
                length: 6,
              }).map((_, index) => (
                <div
                  key={index}
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
                </div>
              ))}
            </div>
          ) : data && data.data.length > 0 ? (
            <>
              {/* ===================================================
                  RESULT LABEL
              ==================================================== */}

              <div
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
              </div>

              {/* ===================================================
                  PROJECT GRID
              ==================================================== */}

              <motion.div
                key={`${category}-${debouncedSearch}-${page}`}
                variants={
                  shouldReduceMotion
                    ? undefined
                    : gridVariants
                }
                initial={
                  shouldReduceMotion
                    ? false
                    : "hidden"
                }
                animate={
                  shouldReduceMotion
                    ? undefined
                    : "visible"
                }
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
                      variants={
                        shouldReduceMotion
                          ? undefined
                          : revealVariants
                      }
                      className="
                        group
                        relative
                        min-w-0
                      "
                    >
                      {/* =================================================
                          VERY LIGHT GLOW
                      ================================================== */}

                      <div
                        className="
                          pointer-events-none
                          absolute
                          -inset-2
                          rounded-[2rem]
                          bg-[var(--accent)]
                          opacity-0
                          blur-xl

                          transition-opacity
                          duration-300

                          group-hover:opacity-[0.06]
                        "
                      />

                      {/* =================================================
                          PROJECT NUMBER
                      ================================================== */}

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

                          backdrop-blur-sm

                          transition-opacity
                          duration-200

                          group-hover:opacity-100
                        "
                      >
                        {String(index + 1).padStart(
                          2,
                          "0",
                        )}
                      </div>

                      {/* =================================================
                          CARD
                      ================================================== */}

                      <div
                        className="
                          relative

                          transition-transform
                          duration-300
                          ease-out

                          group-hover:-translate-y-1

                          motion-reduce:transform-none
                        "
                      >
                        <ProjectCard
                          project={project}
                        />
                      </div>
                    </motion.div>
                  ),
                )}
              </motion.div>

              {/* ===================================================
                  PAGINATION
              ==================================================== */}

              {data.pagination.pages > 1 && (
                <div
                  className="
                    mt-16
                    flex
                    flex-col
                    items-center
                    gap-5
                  "
                >
                  {/* Divider */}

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

                  {/* Pages */}

                  <div className="flex items-center gap-2">
                    {Array.from({
                      length:
                        data.pagination.pages,
                    }).map((_, index) => {
                      const pageNumber =
                        index + 1;

                      const active =
                        page === pageNumber;

                      return (
                        <button
                          key={pageNumber}
                          type="button"
                          onClick={() =>
                            setPage(pageNumber)
                          }
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

                            transition-[color,background-color,border-color,transform]
                            duration-200

                            hover:-translate-y-[1px]

                            active:scale-95

                            ${
                              active
                                ? "text-[var(--accent-foreground)] shadow-[0_6px_18px_rgba(229,9,20,0.16)]"
                                : "border border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--foreground-muted)] hover:border-[var(--accent)]/40 hover:text-[var(--accent)]"
                            }
                          `}
                        >
                          {active && (
                            <span
                              className="
                                absolute
                                inset-0
                                bg-[var(--gradient-accent)]
                              "
                            />
                          )}

                          <span className="relative z-10">
                            {pageNumber}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Page info */}

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
                </div>
              )}
            </>
          ) : (
            /* =====================================================
               EMPTY STATE
            ====================================================== */

            <div
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
                backdrop-blur-lg
              "
            >
              {/* Small glow */}

              <div
                className="
                  pointer-events-none
                  absolute
                  left-1/2
                  top-0
                  h-28
                  w-56
                  -translate-x-1/2
                  rounded-full
                  bg-[var(--accent)]/[0.06]
                  blur-2xl
                "
              />

              {/* Icon */}

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
            </div>
          )}
        </div>

        {/* =========================================================
            BOTTOM DECORATION
        ========================================================= */}

        <div
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
        </div>
      </Container>
    </section>
  );
}
