import type { ComponentType } from "react";
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss, SiNodedotjs,
  SiExpress, SiMongodb, SiPostgresql, SiDocker, SiGit, SiGithub, SiFigma,
  SiVercel, SiAmazon
, SiRedis, SiGraphql, SiPython, SiVuedotjs,
} from "react-icons/si";
import { FiCode } from "react-icons/fi";

// Curated map from a DB-stored icon key (e.g. "SiReact") to its component.
// Kept as an explicit allowlist rather than a dynamic import from the whole
// react-icons package, which would bloat the client bundle.
const ICON_MAP: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss, SiNodedotjs,
  SiExpress, SiMongodb, SiPostgresql, SiDocker, SiGit, SiGithub, SiFigma,
  SiVercel, SiAmazon
, SiRedis, SiGraphql, SiPython, SiVuedotjs,
};

export function resolveIcon(key: string): ComponentType<{ size?: number; className?: string }> {
  return ICON_MAP[key] ?? FiCode;
}
