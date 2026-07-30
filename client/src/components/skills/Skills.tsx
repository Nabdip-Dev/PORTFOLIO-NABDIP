"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { fetchSkills } from "@/services/api/skillService";
import { resolveIcon } from "@/utils/resolveIcon";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";
import { Skeleton } from "@/components/ui/Skeleton";
import type { SkillData } from "@/types/content";

const CATEGORY_LABELS: Record<SkillData["category"], string> = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
  deployment: "Deployment",
  "version-control": "Version Control",
  tools: "Tools",
};

function SkillBar({ skill }: { skill: SkillData }) {
  const Icon = resolveIcon(skill.icon);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      className="rounded-card glass p-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Icon size={16} />
          {skill.name}
        </div>
        <span className="font-mono-tag text-xs text-[var(--foreground-muted)]">{skill.percentage}%</span>
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[var(--surface-elevated)]">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: "var(--gradient-accent)" }}
        />
      </div>
      {skill.description && (
        <p className="mt-2 text-xs text-[var(--foreground-muted)]">{skill.description}</p>
      )}
    </motion.div>
  );
}

export function Skills() {
  const { data: skills, isLoading } = useQuery({ queryKey: ["skills"], queryFn: fetchSkills });
  const { t } = useLanguage();

  const grouped = (skills ?? []).reduce<Record<string, SkillData[]>>((acc, skill) => {
    (acc[skill.category] ??= []).push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="py-24">
      <Container>
        <SectionHeading eyebrow={t.sections.skills.eyebrow} title={t.sections.skills.title} />

        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        ) : (
          <div className="space-y-10">
            {Object.entries(grouped).map(([category, items]) => (
              <div key={category}>
                <h3 className="font-mono-tag mb-4 text-xs font-medium tracking-widest text-[var(--foreground-muted)]">
                  {CATEGORY_LABELS[category as SkillData["category"]] ?? category}
                </h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((skill) => (
                    <SkillBar key={skill._id} skill={skill} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
