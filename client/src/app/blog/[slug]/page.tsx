"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { FiArrowLeft } from "react-icons/fi";
import { fetchPostBySlug } from "@/services/api/postService";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/Skeleton";

function formatDate(iso?: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { data: post, isLoading } = useQuery({ queryKey: ["post", slug], queryFn: () => fetchPostBySlug(slug) });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--background)] pt-28 text-[var(--foreground)]">
        <Container className="max-w-3xl pb-24">
          <Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)]">
            <FiArrowLeft size={14} /> Back to articles
          </Link>

          {isLoading || !post ? (
            <div className="space-y-4">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-8 w-2/3" />
              <Skeleton className="h-4 w-full" />
            </div>
          ) : (
            <article>
              {post.coverImage?.url && (
                <div className="relative aspect-video overflow-hidden rounded-card glass">
                  <Image src={post.coverImage.url} alt={post.title} fill sizes="768px" className="object-cover" />
                </div>
              )}
              <span className="font-mono-tag mt-6 block text-xs uppercase tracking-widest text-[var(--foreground-muted)]">
                {formatDate(post.publishedAt)}
              </span>
              <h1 className="font-display mt-2 text-3xl font-semibold sm:text-4xl">{post.title}</h1>

              {post.tags?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="font-mono-tag rounded-full bg-[var(--surface-elevated)] px-3 py-1 text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-8 whitespace-pre-line text-[15px] leading-relaxed text-[var(--foreground-muted)]">
                {post.content}
              </div>
            </article>
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
}
