"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FiSearch } from "react-icons/fi";
import { fetchProjects } from "@/services/api/projectService";
import { useDebounce } from "@/hooks/useDebounce";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";
import { Skeleton } from "@/components/ui/Skeleton";
import { ProjectCard } from "./ProjectCard";

const CATEGORIES = ["all", "web app", "mobile app", "landing page", "dashboard", "api"];

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

  return (
    <section id="portfolio" className="py-24">
      <Container>
        <SectionHeading eyebrow={t.sections.portfolio.eyebrow} title={t.sections.portfolio.title} />

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCategory(cat);
                  setPage(1);
                }}
                className="rounded-full px-3.5 py-1.5 text-xs font-medium capitalize transition-colors"
                style={
                  category === cat
                    ? { background: "var(--gradient-accent)", color: "var(--accent-foreground)" }
                    : { background: "var(--surface-elevated)", color: "var(--foreground-muted)" }
                }
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--foreground-muted)]" size={15} />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search projects..."
              className="w-full rounded-full border border-[var(--border)] bg-[var(--surface)] py-2 pl-9 pr-4 text-sm outline-none focus:border-[var(--accent)] sm:w-64"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-72 w-full" />
            ))}
          </div>
        ) : data && data.data.length > 0 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.data.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>

            {data.pagination.pages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                {Array.from({ length: data.pagination.pages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-colors"
                    style={
                      page === i + 1
                        ? { background: "var(--gradient-accent)", color: "var(--accent-foreground)" }
                        : { background: "var(--surface-elevated)", color: "var(--foreground-muted)" }
                    }
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-sm text-[var(--foreground-muted)]">No projects match your filters.</p>
        )}
      </Container>
    </section>
  );
}
