"use client";
import Image from "next/image";
import type { ComponentType } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { FiDownload, FiArrowRight, FiGithub, FiLinkedin, FiTwitter, FiMail } from "react-icons/fi";
import { fetchHero } from "@/services/api/heroService";
import { useTypewriter } from "@/hooks/useTypewriter";
import { toAttachmentUrl } from "@/utils/cloudinaryUrl";
import { ButtonLink } from "@/components/ui/Button";
import { HeroBackground } from "./HeroBackground";
// import profile from "@/assets/pp.png";


// Maps a social link's `platform` field (stored in the DB) to an icon —
// keeps the schema free of frontend-only concerns like which icon component to render.
const SOCIAL_ICONS: Record<string, ComponentType<{ size?: number }>> = {
  github: FiGithub,
  linkedin: FiLinkedin,
  twitter: FiTwitter,
  email: FiMail,
};

function HeroSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="h-6 w-40 animate-pulse rounded-full bg-[var(--surface-elevated)]" />
      <div className="h-14 w-3/4 max-w-xl animate-pulse rounded-lg bg-[var(--surface-elevated)]" />
      <div className="h-8 w-64 animate-pulse rounded-lg bg-[var(--surface-elevated)]" />
      <div className="mt-4 flex gap-3">
        <div className="h-11 w-32 animate-pulse rounded-full bg-[var(--surface-elevated)]" />
        <div className="h-11 w-32 animate-pulse rounded-full bg-[var(--surface-elevated)]" />
      </div>
    </div>
  );
}

export function Hero() {
  const { data: hero, isLoading } = useQuery({ queryKey: ["hero"], queryFn: fetchHero });
  const typedTitle = useTypewriter({ words: hero?.titles?.length ? hero.titles : [""] });

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 text-center sm:px-10"
    >
      <HeroBackground />

      {isLoading || !hero ? (
        <HeroSkeleton />
      ) : (

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">


          {/* left side */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
            className="relative order-2 lg:order-1 z-10 flex max-w-3xl flex-col items-center gap-5 ]"
          >

            <motion.h1
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
              className="font-display text-4xl font-semibold leading-tight sm:text-6xl"
            >
              {hero.name}
            </motion.h1>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
              className="font-mono-tag flex h-8 items-center text-lg text-[var(--foreground-muted)] sm:text-xl"
            >
              {typedTitle}
              <span className="ml-0.5 inline-block h-5 w-[2px] animate-pulse" style={{ background: "var(--accent)" }} />
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
              className="mt-4 flex flex-wrap items-center justify-center gap-3"
            >
              <ButtonLink href="#contact" variant="primary">
                Hire Me <FiArrowRight size={15} />
              </ButtonLink>
              <ButtonLink href="#contact" variant="secondary">
                Contact
              </ButtonLink>
              {hero.resumeUrl && (
                <ButtonLink href={toAttachmentUrl(hero.resumeUrl)} download variant="secondary">
                  <FiDownload size={15} /> Resume
                </ButtonLink>
              )}
            </motion.div>

            {hero.socialLinks?.length > 0 && (
              <motion.div
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                className="mt-2 flex items-center gap-4"
              >
                {hero.socialLinks.map((link) => {
                  const Icon = SOCIAL_ICONS[link.icon] ?? FiGithub;
                  return (
                    <motion.a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.platform}
                      whileHover={{ scale: 1.12, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="flex h-10 w-10 items-center justify-center rounded-full glass text-[var(--foreground-muted)] transition-colors hover:text-[var(--accent)]"
                    >
                      <Icon size={16} />
                    </motion.a>
                  );
                })}
              </motion.div>
            )}
          </motion.div>

            {/* right side */}
          <div className="order-1 lg:order-2">
          <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero dolores, ipsum id quo amet illo facere alias quam sint soluta exercitationem voluptatum sapiente voluptas porro numquam dignissimos fugiat et minus?</h1>
          </div>

        </div>

      )}
    </section>
  );
}
