"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiMessageCircle } from "react-icons/fi";
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";

import { WhatsAppButton } from "./WhatsAppButton";
import { NAV_LINKS } from "@/constants/navigation";
import { useChatUI } from "@/contexts/ChatUIContext";
import { useLanguage } from "@/contexts/LanguageContext";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openChat } = useChatUI();
  const pathname = usePathname();
  const { t } = useLanguage();

  const navLabelKey: Record<string, keyof typeof t.nav> = {
    Home: "home", About: "about", Skills: "skills", Services: "services",
    Portfolio: "portfolio", Blog: "blog", Experience: "experience",
    Testimonials: "testimonials", FAQ: "faq", Contact: "contact",
  };


  function resolveHref(href: string) {
    if (!href.startsWith("#")) return href;
    return pathname === "/" ? href : `/${href}`;
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-9999 transition-colors duration-300"
    >

      <nav className="mx-auto flex max-w-6xl items-center justify-center gap-8 px-6 py-4 sm:px-10">
        <a href="#home" className="font-display text-lg font-semibold tracking-tight">
          Portfolio<span style={{ color: "var(--accent)" }}>.</span>
        </a>

        <ul className={`hidden rounded-l-full rounded-r-full py-3 px-8 items-center gap-7 lg:flex ${scrolled
          ? "glass shadow-soft"
          : "bg-transparent"
          }`}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              {link.href.startsWith("#") ? (
                <a
                  href={resolveHref(link.href)}
                  className="text-sm text-[var(--foreground-muted)] transition-colors hover:text-[var(--foreground)]"
                >
                  {t.nav[navLabelKey[link.label]] ?? link.label}
                </a>
              ) : (
                <Link
                  href={link.href}
                  className="text-sm text-[var(--foreground-muted)] transition-colors hover:text-[var(--foreground)]"
                >
                  {t.nav[navLabelKey[link.label]] ?? link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeSwitcher />
          {/* <button
            type="button"
            onClick={openChat}
            className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[var(--accent-foreground)] transition-transform hover:scale-105"
            style={{ background: "var(--gradient-accent)" }}
          >
            <FiMessageCircle size={15} />
            {t.buttons.chat}
          </button> */}
        </div>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full glass lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <FiX size={18} /> : <FiMenu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden glass lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 pb-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  {link.href.startsWith("#") ? (
                    <a
                      href={resolveHref(link.href)}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-lg px-3 py-2.5 text-sm text-[var(--foreground-muted)] hover:bg-[var(--surface-elevated)] hover:text-[var(--foreground)]"
                    >
                      {t.nav[navLabelKey[link.label]] ?? link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-lg px-3 py-2.5 text-sm text-[var(--foreground-muted)] hover:bg-[var(--surface-elevated)] hover:text-[var(--foreground)]"
                    >
                      {t.nav[navLabelKey[link.label]] ?? link.label}
                    </Link>
                  )}
                </li>
              ))}
              <li className="flex items-center justify-between px-3 pt-2">
                <div className="flex items-center gap-2">
                  <ThemeSwitcher />
                </div>
                {/* <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    openChat();
                  }}
                  className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[var(--accent-foreground)]"
                  style={{ background: "var(--gradient-accent)" }}
                >
                  <FiMessageCircle size={15} />
                  {t.buttons.chat}
                </button> */}
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
