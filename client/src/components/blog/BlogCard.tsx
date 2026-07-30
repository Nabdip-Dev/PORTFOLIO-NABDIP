import Link from "next/link";
import Image from "next/image";
import type { PostData } from "@/types/content";

function formatDate(iso?: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function BlogCard({ post }: { post: PostData }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col overflow-hidden rounded-card glass card-premium">
      {post.coverImage?.url ? (
        <div className="relative aspect-video overflow-hidden bg-[var(--surface-elevated)]">
          <Image
            src={post.coverImage.url}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="aspect-video bg-[var(--surface-elevated)]" />
      )}
      <div className="flex flex-1 flex-col p-5">
        <span className="font-mono-tag text-[10px] uppercase tracking-widest text-[var(--foreground-muted)]">
          {formatDate(post.publishedAt)}
        </span>
        <h3 className="font-display mt-1 text-base font-semibold group-hover:text-[var(--accent)]">{post.title}</h3>
        {post.excerpt && <p className="mt-2 line-clamp-2 text-sm text-[var(--foreground-muted)]">{post.excerpt}</p>}
        {post.tags?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="font-mono-tag rounded-full bg-[var(--surface-elevated)] px-2 py-0.5 text-[10px]">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
