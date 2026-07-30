import { NAV_LINKS } from "@/constants/navigation";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] px-6 py-12 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xs">
          <span className="font-display text-lg font-semibold">
            Portfolio<span style={{ color: "var(--accent)" }}>.</span>
          </span>
          <p className="mt-3 text-sm text-[var(--foreground-muted)]">
            Full-stack engineer building fast, well-designed products end to end.
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-[var(--foreground-muted)] transition-colors hover:text-[var(--foreground)]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <p className="mx-auto mt-10 max-w-6xl text-xs text-[var(--foreground-muted)]">
        © {year} — All rights reserved.
      </p>
    </footer>
  );
}
