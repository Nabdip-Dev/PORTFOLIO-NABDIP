"use client";

import { use } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { FiArrowLeft, FiExternalLink, FiGithub } from "react-icons/fi";
import { fetchProjectBySlug } from "@/services/api/projectService";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/Skeleton";

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { data: project, isLoading } = useQuery({
    queryKey: ["project", slug],
    queryFn: () => fetchProjectBySlug(slug),
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--background)] pt-28 text-[var(--foreground)]">
        <Container className="pb-24">
          <Link
            href="/#portfolio"
            className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
          >
            <FiArrowLeft size={14} /> Back to portfolio
          </Link>

          {isLoading || !project ? (
            <div className="space-y-4">
              <Skeleton className="h-72 w-full" />
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-4 w-full" />
            </div>
          ) : (
            <article>
              {project.images?.[0]?.url && (
                <div className="overflow-hidden rounded-card glass">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={project.images[0].url} alt={project.title} className="aspect-video w-full object-cover" />
                </div>
              )}

              <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:justify-between">
                <div>
                  <span className="font-mono-tag text-xs uppercase tracking-widest text-[var(--foreground-muted)]">
                    {project.category} · {project.status.replace("-", " ")}
                  </span>
                  <h1 className="font-display mt-1 text-3xl font-semibold sm:text-4xl">{project.title}</h1>
                </div>
                <div className="flex gap-3">
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full glass px-4 py-2 text-sm"
                    >
                      <FiGithub size={15} /> Code
                    </a>
                  )}
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full px-4 py-2 text-sm text-[var(--accent-foreground)]"
                      style={{ background: "var(--gradient-accent)" }}
                    >
                      <FiExternalLink size={15} /> Live site
                    </a>
                  )}
                </div>
              </div>

              <p className="mt-6 max-w-3xl whitespace-pre-line leading-relaxed text-[var(--foreground-muted)]">
                {project.description}
              </p>

              {project.features?.length > 0 && (
                <div className="mt-8">
                  <h2 className="font-display text-lg font-semibold">Features</h2>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {project.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-[var(--foreground-muted)]">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--accent)" }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.technologies?.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="font-mono-tag rounded-full bg-[var(--surface-elevated)] px-3 py-1 text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </article>
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
}
