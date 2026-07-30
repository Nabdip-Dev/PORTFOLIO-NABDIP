import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The admin dashboard and its login page should never be crawled or indexed.
        disallow: ["/admin"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
