import { motion } from "framer-motion";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
}

/**
 * Shared heading used at the top of every content section (About, Skills,
 * Services, Portfolio...) so the rhythm — mono eyebrow, display title,
 * muted description — stays consistent across the whole page.
 */
export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mx-auto mb-12 max-w-xl text-center"
    >
      <span className="font-mono-tag text-xs font-medium tracking-widest" style={{ color: "var(--accent)" }}>
        {eyebrow.toUpperCase()}
      </span>
      <h2 className="font-display mt-2 text-3xl font-semibold sm:text-4xl">{title}</h2>
      {description && (
        <p className="mt-3 text-sm text-[var(--foreground-muted)] sm:text-base">{description}</p>
      )}
    </motion.div>
  );
}
