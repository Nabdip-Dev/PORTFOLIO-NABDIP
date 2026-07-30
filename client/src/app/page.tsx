import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/about/About";
import { Skills } from "@/components/skills/Skills";
import { Services } from "@/components/services/Services";
import { PricingTable } from "@/components/services/PricingTable";
import { Portfolio } from "@/components/portfolio/Portfolio";
import { Experience } from "@/components/experience/Experience";
import { Education } from "@/components/education/Education";
import { Testimonials } from "@/components/testimonials/Testimonials";
import { FAQ } from "@/components/faq/FAQ";
import { Contact } from "@/components/contact/Contact";
import { fetchHero } from "@/services/api/heroService";

// Server-rendered so the Person JSON-LD is present in the initial HTML —
// structured data that only appears after client-side fetch is invisible
// to most crawlers, so this fetch happens here rather than in <Hero />.
async function getPersonJsonLd() {
  try {
    const hero = await fetchHero();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
    return {
      "@context": "https://schema.org",
      "@type": "Person",
      name: hero.name,
      jobTitle: hero.titles?.[0],
      url: siteUrl,
      sameAs: hero.socialLinks?.map((l) => l.url) ?? [],
    };
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const jsonLd = await getPersonJsonLd();

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <Navbar />
      <main className="bg-[var(--background)] text-[var(--foreground)]">
        <Hero />
        <About />
        <Skills />
        <Services />
        <PricingTable />
        <Portfolio />
        <Experience />
        <Education />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
