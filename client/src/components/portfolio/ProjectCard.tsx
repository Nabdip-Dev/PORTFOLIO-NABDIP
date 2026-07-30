import Link from "next/link";
import Image from "next/image";
import { FiExternalLink, FiGithub, FiStar } from "react-icons/fi";
import type { ProjectData } from "@/types/content";

export function ProjectCard({ project }: { project: ProjectData }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-card glass card-premium">
      {project.featured && (
        <span
          className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium text-[var(--accent-foreground)]"
          style={{ background: "var(--gradient-accent)" }}
        >
          <FiStar size={10} /> Featured
        </span>
      )}

      <Link href={`/portfolio/${project.slug}`} className="relative block aspect-video overflow-hidden bg-[var(--surface-elevated)]">
        {project.images?.[0]?.url ? (
          <Image
            src={project.images[0].url}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-[var(--foreground-muted)]">
            No preview image
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <span className="font-mono-tag text-[10px] uppercase tracking-widest text-[var(--foreground-muted)]">
          {project.category}
        </span>
        <Link href={`/portfolio/${project.slug}`}>
          <h3 className="font-display mt-1 text-base font-semibold hover:text-[var(--accent)]">{project.title}</h3>
        </Link>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-[var(--foreground-muted)]">
          {project.shortDescription || project.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.technologies?.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="font-mono-tag rounded-full bg-[var(--surface-elevated)] px-2 py-0.5 text-[10px]"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-3 text-[var(--foreground-muted)]">
          {project.githubLink && (
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-[var(--accent)]">
              <FiGithub size={16} />
            </a>
          )}
          {project.liveLink && (
            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" aria-label="Live site" className="hover:text-[var(--accent)]">
              <FiExternalLink size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
