import type { MetadataRoute } from "next";
import { fetchProjects } from "@/services/api/projectService";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

  const staticEntries: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
  ];

  try {
    const { data: projects } = await fetchProjects({ limit: 100 });
    const projectEntries: MetadataRoute.Sitemap = projects.map((p) => ({
      url: `${siteUrl}/portfolio/${p.slug}`,
      changeFrequency: "monthly",
      priority: 0.7,
    }));
    return [...staticEntries, ...projectEntries];
  } catch {
    // Backend unreachable at build time — ship the static entry rather than failing the build.
    return staticEntries;
  }
}
