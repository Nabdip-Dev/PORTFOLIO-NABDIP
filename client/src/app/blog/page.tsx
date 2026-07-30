"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/services/api/postService";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/Skeleton";
import { BlogCard } from "@/components/blog/BlogCard";

export default function BlogPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery({ queryKey: ["posts", page], queryFn: () => fetchPosts({ page }) });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--background)] pt-28 text-[var(--foreground)]">
        <Container className="pb-24">
          <div className="mb-10 text-center">
            <span className="font-mono-tag text-xs font-medium tracking-widest" style={{ color: "var(--accent)" }}>
              BLOG
            </span>
            <h1 className="font-display mt-2 text-3xl font-semibold sm:text-4xl">Articles</h1>
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
                {data.data.map((post) => (
                  <BlogCard key={post._id} post={post} />
                ))}
              </div>
              {data.pagination.pages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-2">
                  {Array.from({ length: data.pagination.pages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium"
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
            <p className="text-center text-sm text-[var(--foreground-muted)]">No articles published yet.</p>
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
}
