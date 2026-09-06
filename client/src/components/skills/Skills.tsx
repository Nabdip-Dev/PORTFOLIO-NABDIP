"use client";

import { useEffect, useState } from "react";
import type { IconType } from "react-icons";

import {
  FaReact,
  FaNodeJs,
  FaGithub,
  FaGitAlt,
  FaHtml5,
  FaCss3Alt,
} from "react-icons/fa";

import {
  SiTypescript,
  SiNextdotjs,
  SiMongodb,
  SiTailwindcss,
} from "react-icons/si";

/* =========================================================
   TYPES
========================================================= */

type Skill = {
  id: number;
  name: string;
  percentage: number;
  color: string;
  Icon: IconType;
};

/* =========================================================
   SETTINGS
========================================================= */

const TOTAL_SKILLS = 10;

/*
 * One complete trip:
 *
 * skill icon -> center
 *
 * Slow enough so the points don't rush.
 */
const TRAVEL_TIME = 12;

/*
 * 10 points are distributed across the animation.
 *
 * Every point keeps moving.
 * They only start at different times.
 */
const STAGGER =
  TRAVEL_TIME / TOTAL_SKILLS;

/* =========================================================
   SKILLS
========================================================= */

const SKILLS: Skill[] = [
  {
    id: 1,
    name: "React",
    percentage: 92,
    color: "#61dafb",
    Icon: FaReact,
  },
  {
    id: 2,
    name: "TypeScript",
    percentage: 88,
    color: "#3178c6",
    Icon: SiTypescript,
  },
  {
    id: 3,
    name: "Next.js",
    percentage: 90,
    color: "#ffffff",
    Icon: SiNextdotjs,
  },
  {
    id: 4,
    name: "Node.js",
    percentage: 86,
    color: "#68a063",
    Icon: FaNodeJs,
  },
  {
    id: 5,
    name: "MongoDB",
    percentage: 82,
    color: "#47a248",
    Icon: SiMongodb,
  },
  {
    id: 6,
    name: "Tailwind CSS",
    percentage: 94,
    color: "#38bdf8",
    Icon: SiTailwindcss,
  },
  {
    id: 7,
    name: "GitHub",
    percentage: 91,
    color: "#ffffff",
    Icon: FaGithub,
  },
  {
    id: 8,
    name: "Git",
    percentage: 89,
    color: "#f05032",
    Icon: FaGitAlt,
  },
  {
    id: 9,
    name: "HTML",
    percentage: 97,
    color: "#e34f26",
    Icon: FaHtml5,
  },
  {
    id: 10,
    name: "CSS",
    percentage: 95,
    color: "#1572b6",
    Icon: FaCss3Alt,
  },
];

/* =========================================================
   NODE POSITIONS
========================================================= */

const NODE_POSITIONS = [
  /* LEFT */
  { left: "9%", top: "10%" },
  { left: "5.5%", top: "30%" },
  { left: "4.5%", top: "50%" },
  { left: "5.5%", top: "70%" },
  { left: "9%", top: "90%" },

  /* RIGHT */
  { left: "91%", top: "10%" },
  { left: "94.5%", top: "30%" },
  { left: "95.5%", top: "50%" },
  { left: "94.5%", top: "70%" },
  { left: "91%", top: "90%" },
];

/* =========================================================
   SVG PATHS
========================================================= */

/*
 * IMPORTANT:
 *
 * Every path starts exactly around the skill node
 * and finishes at the CENTER.
 *
 * Direction:
 *
 * SKILL ---------------> CENTER
 *
 * Never CENTER -> SKILL.
 */

const PATHS = [
  /* LEFT 1 */
  "M 90 56 C 205 25, 320 45, 405 190 C 450 255, 480 275, 500 280",

  /* LEFT 2 */
  "M 55 168 C 175 118, 290 135, 385 225 C 435 270, 475 280, 500 280",

  /* LEFT 3 */
  "M 45 280 C 165 280, 285 280, 390 280 C 440 280, 475 280, 500 280",

  /* LEFT 4 */
  "M 55 392 C 175 442, 290 425, 385 335 C 435 290, 475 280, 500 280",

  /* LEFT 5 */
  "M 90 504 C 205 535, 320 515, 405 370 C 450 305, 480 285, 500 280",

  /* RIGHT 1 */
  "M 910 56 C 795 25, 680 45, 595 190 C 550 255, 520 275, 500 280",

  /* RIGHT 2 */
  "M 945 168 C 825 118, 710 135, 615 225 C 565 270, 525 280, 500 280",

  /* RIGHT 3 */
  "M 955 280 C 835 280, 715 280, 610 280 C 560 280, 525 280, 500 280",

  /* RIGHT 4 */
  "M 945 392 C 825 442, 710 425, 615 335 C 565 290, 525 280, 500 280",

  /* RIGHT 5 */
  "M 910 504 C 795 535, 680 515, 595 370 C 550 305, 520 285, 500 280",
];

/* =========================================================
   MOVING POINT
========================================================= */

function MovingPoint({
  path,
  index,
}: {
  path: string;
  index: number;
}) {
  /*
   * Serial start:
   *
   * 0s
   * 1.2s
   * 2.4s
   * 3.6s
   * ...
   *
   * But ALL points repeat indefinitely.
   */

  const delay =
    index * STAGGER;

  return (
    <g>
      {/* subtle glow */}
      <circle
        r="5"
        fill="#38bdf8"
        opacity="0.13"
        filter="url(#pointGlow)"
      >
        <animateMotion
          path={path}
          dur={`${TRAVEL_TIME}s`}
          begin={`${delay}s`}
          repeatCount="indefinite"
        />
      </circle>

      {/* SINGLE BLUE POINT */}
      <circle
        r="2.8"
        fill="#38bdf8"
      >
        <animateMotion
          path={path}
          dur={`${TRAVEL_TIME}s`}
          begin={`${delay}s`}
          repeatCount="indefinite"
        />
      </circle>
    </g>
  );
}

/* =========================================================
   CURVED CONNECTION
========================================================= */

function CurvedConnection({
  path,
  index,
}: {
  path: string;
  index: number;
}) {
  return (
    <svg
      className="
        pointer-events-none
        absolute
        inset-0
        h-full
        w-full
        overflow-visible
      "
      viewBox="0 0 1000 560"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={`curve-${index}`}
          x1="0"
          y1="0"
          x2="1"
          y2="0"
        >
          <stop
            offset="0%"
            stopColor="rgba(255,255,255,0.17)"
          />

          <stop
            offset="50%"
            stopColor="rgba(255,255,255,0.055)"
          />

          <stop
            offset="100%"
            stopColor="rgba(56,189,248,0.14)"
          />
        </linearGradient>

        <filter
          id="pointGlow"
          x="-500%"
          y="-500%"
          width="1000%"
          height="1000%"
        >
          <feGaussianBlur
            stdDeviation="2.5"
          />
        </filter>
      </defs>

      {/* soft line */}
      <path
        d={path}
        fill="none"
        stroke="rgba(255,255,255,0.025)"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* main curved line */}
      <path
        d={path}
        fill="none"
        stroke={`url(#curve-${index})`}
        strokeWidth="1.25"
        strokeLinecap="round"
      />

      {/* moving point */}
      <MovingPoint
        path={path}
        index={index}
      />
    </svg>
  );
}

/* =========================================================
   SKILL NODE
========================================================= */

function SkillNode({
  skill,
  index,
}: {
  skill: Skill;
  index: number;
}) {
  const Icon = skill.Icon;
  const position =
    NODE_POSITIONS[index];

  return (
    <div
      className="
        absolute
        z-30
        -translate-x-1/2
        -translate-y-1/2
      "
      style={{
        left: position.left,
        top: position.top,
      }}
    >
      <div
        className="
          relative
          flex
          h-[50px]
          w-[50px]
          items-center
          justify-center
          rounded-full
          border
          border-white/[0.11]
          bg-[#070c13]
          shadow-[0_8px_25px_rgba(0,0,0,0.35)]
        "
      >
        {/* inner circle */}
        <div
          className="
            pointer-events-none
            absolute
            inset-[5px]
            rounded-full
            border
            border-white/[0.035]
          "
        />

        {/* REAL ICON */}
        <Icon
          size={21}
          color={skill.color}
        />

        {/* =================================================
            NO PERCENTAGE HERE
        ================================================= */}

        {/* =================================================
            BLUE ORIGIN DOT

            This is only the STARTING POSITION.

            The animated point starts from the same area,
            covers the icon and then travels to center.
        ================================================= */}

        <span
          className="
            absolute
            top-1/2
            h-[5px]
            w-[5px]
            -translate-y-1/2
            rounded-full
            bg-sky-400
            shadow-[0_0_10px_rgba(56,189,248,0.85)]
          "
          style={
            index < 5
              ? { right: "-2px" }
              : { left: "-2px" }
          }
        />
      </div>
    </div>
  );
}

/* =========================================================
   CENTER CONTENT
========================================================= */

function Center({
  skill,
}: {
  skill: Skill;
}) {
  const Icon = skill.Icon;

  return (
    <div
      className="
        absolute
        left-1/2
        top-1/2
        z-20
        -translate-x-1/2
        -translate-y-1/2
      "
    >
      {/* ambient glow */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[270px]
          w-[270px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-sky-400/[0.025]
          blur-[85px]
        "
      />

      {/* orbit */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[190px]
          w-[190px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-dashed
          border-white/[0.055]
        "
      />

      {/* =================================================
          CENTER CIRCLE
      ================================================= */}

      <div
        className="
          relative
          flex
          h-[120px]
          w-[120px]
          flex-col
          items-center
          justify-center
          rounded-full
          border
          border-white/[0.12]
          bg-[#060a10]
          shadow-[0_0_60px_rgba(56,189,248,0.08)]
        "
      >
        {/* inner ring */}
        <div
          className="
            pointer-events-none
            absolute
            inset-[13px]
            rounded-full
            border
            border-white/[0.035]
          "
        />

        {/* =================================================
            ACTIVE SKILL ICON
        ================================================= */}

        <Icon
          key={`icon-${skill.id}`}
          size={31}
          color={skill.color}
        />

        {/* =================================================
            SKILL NAME
        ================================================= */}

        <span
          key={`name-${skill.id}`}
          className="
            mt-1
            max-w-[80px]
            truncate
            text-[8px]
            font-medium
            tracking-wide
            text-white/55
          "
        >
          {skill.name}
        </span>

        {/* =================================================
            PERCENTAGE
            INSIDE CENTER CIRCLE
        ================================================= */}

        <span
          key={`percentage-${skill.id}`}
          className="
            mt-[1px]
            font-mono
            text-[9px]
            font-medium
            text-sky-400/80
          "
        >
          {skill.percentage}%
        </span>

        {/* center blue dot */}
        <span
          className="
            absolute
            bottom-[12px]
            h-[4px]
            w-[4px]
            rounded-full
            bg-sky-400
            shadow-[0_0_10px_#38bdf8]
          "
        />
      </div>
    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export function Skills() {
  const [
    activeSkill,
    setActiveSkill,
  ] = useState(0);

  /*
   * Center skill changes serially.
   *
   * This animation is separate from
   * the 10 blue moving points.
   */

  useEffect(() => {
    const timer =
      window.setInterval(() => {
        setActiveSkill(
          (current) =>
            (current + 1) %
            SKILLS.length
        );
      }, 3200);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return (
    <section
      id="skills"
      className="
        relative
        overflow-hidden
        py-14
        sm:py-16
        lg:py-18
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-7xl
          px-5
          sm:px-6
        "
      >
        {/* =================================================
            HEADING
        ================================================= */}

        <div className="mb-5">
          <p
            className="
              font-mono
              text-[9px]
              uppercase
              tracking-[0.30em]
              text-white/35
            "
          >
            Skills
          </p>

          <h2
            className="
              mt-2
              text-2xl
              font-semibold
              tracking-tight
              text-white
              sm:text-3xl
            "
          >
            Technologies I Work With
          </h2>
        </div>

        {/* =================================================
            SKILL MAP

            Compact height.
            No internal scroll.
        ================================================= */}

        <div
          className="
            relative
            mx-auto
            h-[520px]
            w-full
            max-w-[1030px]

            max-lg:h-[470px]
            max-md:h-[400px]
            max-sm:h-[340px]
          "
        >
          {/* background glow */}
          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              h-[300px]
              w-[300px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-sky-400/[0.012]
              blur-[90px]
            "
          />

          {/* =================================================
              ALL 10 CURVED LINES
          ================================================= */}

          {PATHS.map(
            (path, index) => (
              <CurvedConnection
                key={index}
                path={path}
                index={index}
              />
            )
          )}

          {/* =================================================
              CENTER

              Icon + Name + Percentage
          ================================================= */}

          <Center
            skill={SKILLS[activeSkill]}
          />

          {/* =================================================
              ALL 10 SKILL ICONS
          ================================================= */}

          {SKILLS.map(
            (skill, index) => (
              <SkillNode
                key={skill.id}
                skill={skill}
                index={index}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
}
