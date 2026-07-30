import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { DEFAULT_THEME_MODE, DEFAULT_ACCENT, THEME_STORAGE_KEY } from "@/constants/theme";
import { fetchSettings } from "@/services/api/settingsService";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const FALLBACK_TITLE = "Portfolio — Full Stack Developer";
const FALLBACK_DESCRIPTION =
  "Full-stack developer building fast, well-designed web applications end to end.";

// Pulls SEO defaults from the admin-editable Settings collection. If the
// backend is unreachable at build/request time (e.g. this is being built
// standalone before the API is deployed), fall back to sane static defaults
// instead of failing the build.
export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

  try {
    const settings = await fetchSettings();
    const title = settings.siteTitle || FALLBACK_TITLE;
    const description = settings.siteDescription || FALLBACK_DESCRIPTION;

    return {
      metadataBase: new URL(siteUrl),
      title: { default: title, template: `%s · ${title}` },
      description,
      keywords: settings.seoKeywords?.length ? settings.seoKeywords : undefined,
      openGraph: {
        title,
        description,
        url: siteUrl,
        siteName: title,
        type: "website",
        images: settings.ogImage?.url ? [{ url: settings.ogImage.url }] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: settings.ogImage?.url ? [settings.ogImage.url] : undefined,
      },
      robots: { index: true, follow: true },
      manifest: "/manifest.json",
    };
  } catch {
    return {
      metadataBase: new URL(siteUrl),
      title: { default: FALLBACK_TITLE, template: `%s · ${FALLBACK_TITLE}` },
      description: FALLBACK_DESCRIPTION,
      robots: { index: true, follow: true },
      manifest: "/manifest.json",
    };
  }
}

// Runs before React hydrates, directly setting the html[data-theme]/[data-accent]
// attributes from LocalStorage. Without this, the page would paint with the
// default theme first and then visibly flash to the visitor's saved choice.
const noFlashScript = `
(function () {
  try {
    var raw = window.localStorage.getItem("${THEME_STORAGE_KEY}");
    var parsed = raw ? JSON.parse(raw) : null;
    var mode = (parsed && parsed.mode) || "${DEFAULT_THEME_MODE}";
    var accent = (parsed && parsed.accent) || "${DEFAULT_ACCENT}";
    document.documentElement.setAttribute("data-theme", mode);
    document.documentElement.setAttribute("data-accent", accent);
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "${DEFAULT_THEME_MODE}");
    document.documentElement.setAttribute("data-accent", "${DEFAULT_ACCENT}");
  }
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <meta name="theme-color" content="#8b5cf6" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
