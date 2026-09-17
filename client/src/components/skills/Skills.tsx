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

type Skill = {
  id: number;
  name: string;
  percentage: number;
  color: string;
  Icon: IconType;
};

const TOTAL_SKILLS = 10;
const TRAVEL_TIME = 12;
const STAGGER = TRAVEL_TIME / TOTAL_SKILLS;

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

const NODE_POSITIONS = [
  { left: "9%", top: "10%" },
  { left: "5.5%", top: "30%" },
  { left: "4.5%", top: "50%" },
  { left: "5.5%", top: "70%" },
  { left: "9%", top: "90%" },

  { left: "91%", top: "10%" },
  { left: "94.5%", top: "30%" },
  { left: "95.5%", top: "50%" },
  { left: "94.5%", top: "70%" },
  { left: "91%", top: "90%" },
];

const PATHS = [
  "M 90 56 C 205 25, 320 45, 405 190 C 450 255, 480 275, 500 280",
  "M 55 168 C 175 118, 290 135, 385 225 C 435 270, 475 280, 500 280",
  "M 45 280 C 165 280, 285 280, 390 280 C 440 280, 475 280, 500 280",
  "M 55 392 C 175 442, 290 425, 385 335 C 435 290, 475 280, 500 280",
  "M 90 504 C 205 535, 320 515, 405 370 C 450 305, 480 285, 500 280",

  "M 910 56 C 795 25, 680 45, 595 190 C 550 255, 520 275, 500 280",
  "M 945 168 C 825 118, 710 135, 615 225 C 565 270, 525 280, 500 280",
  "M 955 280 C 835 280, 715 280, 610 280 C 560 280, 525 280, 500 280",
  "M 945 392 C 825 442, 710 425, 615 335 C 565 290, 525 280, 500 280",
  "M 910 504 C 795 535, 680 515, 595 370 C 550 305, 520 285, 500 280",
];

function MovingPoint({
  path,
  index,
}: {
  path: string;
  index: number;
}) {
  const delay = index * STAGGER;

  return (
    <g>
      <circle
        r="7"
        fill="var(--skills-point)"
        opacity="0.08"
        filter="url(#pointGlow)"
      >
        <animateMotion
          path={path}
          dur={`${TRAVEL_TIME}s`}
          begin={`${delay}s`}
          repeatCount="indefinite"
        />

        <animate
          attributeName="opacity"
          values="0.04;0.12;0.04"
          dur="2.2s"
          repeatCount="indefinite"
        />
      </circle>

      <circle
        r="4.5"
        fill="var(--skills-point)"
        opacity="0.16"
        filter="url(#smallPointGlow)"
      >
        <animateMotion
          path={path}
          dur={`${TRAVEL_TIME}s`}
          begin={`${delay}s`}
          repeatCount="indefinite"
        />
      </circle>

      <circle
        r="2.8"
        fill="var(--skills-point)"
      >
        <animateMotion
          path={path}
          dur={`${TRAVEL_TIME}s`}
          begin={`${delay}s`}
          repeatCount="indefinite"
        />

        <animate
          attributeName="r"
          values="2.4;3.1;2.4"
          dur="1.8s"
          repeatCount="indefinite"
        />
      </circle>
    </g>
  );
}

function CurvedConnection({
  path,
  index,
}: {
  path: string;
  index: number;
}) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
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
            stopColor="var(--skills-line-start)"
          />

          <stop
            offset="50%"
            stopColor="var(--skills-line-middle)"
          />

          <stop
            offset="100%"
            stopColor="var(--skills-line-end)"
          />
        </linearGradient>

        <filter
          id={`pointGlow-${index}`}
          x="-500%"
          y="-500%"
          width="1000%"
          height="1000%"
        >
          <feGaussianBlur stdDeviation="2.5" />
        </filter>

        <filter
          id={`smallPointGlow-${index}`}
          x="-500%"
          y="-500%"
          width="1000%"
          height="1000%"
        >
          <feGaussianBlur stdDeviation="1.5" />
        </filter>
      </defs>

      <path
        d={path}
        fill="none"
        stroke="var(--skills-track)"
        strokeWidth="4"
        strokeLinecap="round"
      />

      <path
        d={path}
        fill="none"
        stroke={`url(#curve-${index})`}
        strokeWidth="1.25"
        strokeLinecap="round"
      >
        <animate
          attributeName="opacity"
          values="0.65;1;0.65"
          dur={`${4 + (index % 3)}s`}
          begin={`${index * 0.15}s`}
          repeatCount="indefinite"
        />
      </path>

      <MovingPoint
        path={path}
        index={index}
      />
    </svg>
  );
}

function SkillNode({
  skill,
  index,
}: {
  skill: Skill;
  index: number;
}) {
  const Icon = skill.Icon;
  const position = NODE_POSITIONS[index];

  return (
    <div
      className="
        absolute
        z-30
        -translate-x-1/2
        -translate-y-1/2
        group
      "
      style={{
        left: position.left,
        top: position.top,
      }}
    >
      {/* Glow */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-12
          w-12
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[var(--skills-point)]/[0.04]
          opacity-0
          blur-lg
          transition-all
          duration-500
          group-hover:scale-125
          group-hover:opacity-100
          sm:h-[58px]
          sm:w-[58px]
          sm:blur-xl
          lg:h-[64px]
          lg:w-[64px]
        "
      />

      {/* Node */}
      <div
        className="
          skill-node
          relative
          flex
          h-[38px]
          w-[38px]
          items-center
          justify-center
          rounded-full
          border
          border-[var(--skills-node-border)]
          bg-[var(--skills-node-bg)]
          shadow-[0_6px_18px_var(--skills-node-shadow)]
          transition-all
          duration-500
          ease-out
          group-hover:scale-[1.08]
          group-hover:border-[var(--skills-point)]/[0.25]
          group-hover:shadow-[0_0_25px_var(--skills-node-glow)]

          xs:h-[42px]
          xs:w-[42px]

          sm:h-[46px]
          sm:w-[46px]

          md:h-[50px]
          md:w-[50px]

          lg:shadow-[0_8px_25px_var(--skills-node-shadow)]
          lg:group-hover:shadow-[0_0_30px_var(--skills-node-glow)]
        "
        style={{
          animationDuration: `${3.5 + (index % 3) * 0.5}s`,
          animationDelay: `${index * 0.12}s`,
        }}
      >
        <div
          className="
            pointer-events-none
            absolute
            inset-[4px]
            rounded-full
            border
            border-[var(--skills-inner-border)]
            transition-all
            duration-500
            group-hover:border-[var(--skills-point)]/[0.10]
            sm:inset-[5px]
          "
        />

        <Icon
          size={17}
          color={skill.color}
          className="
            relative
            z-10
            transition-transform
            duration-500
            ease-out
            group-hover:scale-110

            sm:[&]:!h-[19px]
            sm:[&]:!w-[19px]

            md:[&]:!h-[21px]
            md:[&]:!w-[21px]
          "
        />

        
      </div>
    </div>
  );
}

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
      {/* Ambient Glow */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[170px]
          w-[170px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[var(--skills-point)]/[0.025]
          blur-[55px]
          sm:h-[220px]
          sm:w-[220px]
          sm:blur-[70px]
          lg:h-[270px]
          lg:w-[270px]
          lg:blur-[85px]
        "
        style={{
          animation: "ambientPulse 5s ease-in-out infinite",
        }}
      />

      {/* Pulse Rings */}
      <div
        className="
          pulse-ring
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[105px]
          w-[105px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-[var(--skills-point)]/[0.07]
          sm:h-[125px]
          sm:w-[125px]
          md:h-[145px]
          md:w-[145px]
        "
      />

      <div
        className="
          pulse-ring
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[105px]
          w-[105px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-[var(--skills-point)]/[0.035]
          sm:h-[125px]
          sm:w-[125px]
          md:h-[145px]
          md:w-[145px]
        "
        style={{
          animationDelay: "1.7s",
        }}
      />

      {/* Orbit */}
      <div
        className="
          orbit
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[140px]
          w-[140px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-dashed
          border-[var(--skills-orbit-border)]
          sm:h-[165px]
          sm:w-[165px]
          md:h-[190px]
          md:w-[190px]
        "
      />

      {/* Center Circle */}
      <div
        className="
          center-circle
          relative
          flex
          h-[82px]
          w-[82px]
          flex-col
          items-center
          justify-center
          rounded-full
          border
          border-[var(--skills-center-border)]
          bg-[var(--skills-center-bg)]
          shadow-[0_0_35px_var(--skills-center-glow)]

          xs:h-[90px]
          xs:w-[90px]

          sm:h-[105px]
          sm:w-[105px]

          md:h-[120px]
          md:w-[120px]

          sm:shadow-[0_0_45px_var(--skills-center-glow)]
          md:shadow-[0_0_60px_var(--skills-center-glow)]
        "
      >
        <div
          className="
            pointer-events-none
            absolute
            inset-[9px]
            rounded-full
            border
            border-[var(--skills-inner-border)]
            xs:inset-[10px]
            sm:inset-[11px]
            md:inset-[13px]
          "
        />

        <div
          key={skill.id}
          className="relative z-10 flex min-w-0 flex-col items-center"
          style={{
            animation:
              "skillContentIn 550ms cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <Icon
            size={23}
            color={skill.color}
            className="
              xs:[&]:!h-[25px]
              xs:[&]:!w-[25px]
              sm:[&]:!h-[28px]
              sm:[&]:!w-[28px]
              md:[&]:!h-[31px]
              md:[&]:!w-[31px]
            "
            style={{
              filter: `drop-shadow(0 0 8px ${skill.color}25)`,
            }}
          />

          <span
            className="
              mt-0.5
              max-w-[55px]
              truncate
              text-[7px]
              font-medium
              tracking-wide
              text-[var(--skills-center-muted)]
              xs:max-w-[65px]
              xs:text-[8px]
              sm:max-w-[75px]
              sm:text-[9px]
              md:max-w-[80px]
            "
          >
            {skill.name}
          </span>

          <span
            className="
              mt-[1px]
              font-mono
              text-[8px]
              font-medium
              text-[var(--skills-point)]
              sm:text-[9px]
            "
          >
            {skill.percentage}%
          </span>
        </div>

        <span
          className="
            center-dot
            absolute
            bottom-[7px]
            h-[3px]
            w-[3px]
            rounded-full
            bg-[var(--skills-point)]
            shadow-[0_0_8px_var(--skills-point)]
            sm:bottom-[10px]
            sm:h-[4px]
            sm:w-[4px]
            md:bottom-[12px]
          "
        />
      </div>
    </div>
  );
}

export function Skills() {
  const [activeSkill, setActiveSkill] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSkill(
        (current) =>
          (current + 1) % SKILLS.length,
      );
    }, 3200);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return (
    <>
      <style>{`
        .skill-node {
          animation-name: skillBreath;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        .origin-dot {
          animation: originPulse 1.8s ease-in-out infinite;
        }

        .pulse-ring {
          animation: centerPulse 3.5s ease-out infinite;
        }

        .orbit {
          animation: orbitRotate 28s linear infinite;
        }

        .center-circle {
          animation: centerFloat 5s ease-in-out infinite;
        }

        .center-dot {
          animation: centerDotPulse 2s ease-in-out infinite;
        }

        @keyframes skillBreath {
          0%,
          100% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.025);
          }
        }

        @keyframes originPulse {
          0%,
          100% {
            opacity: 0.7;
            transform: translateY(-50%) scale(0.85);
            box-shadow:
              0 0 6px var(--skills-point);
          }

          50% {
            opacity: 1;
            transform: translateY(-50%) scale(1.2);
            box-shadow:
              0 0 14px var(--skills-point);
          }
        }

        @keyframes ambientPulse {
          0%,
          100% {
            opacity: 0.45;
            transform:
              translate(-50%, -50%)
              scale(0.92);
          }

          50% {
            opacity: 0.8;
            transform:
              translate(-50%, -50%)
              scale(1.08);
          }
        }

        @keyframes centerPulse {
          0% {
            opacity: 0;
            transform:
              translate(-50%, -50%)
              scale(0.82);
          }

          20% {
            opacity: 0.65;
          }

          70% {
            opacity: 0.18;
          }

          100% {
            opacity: 0;
            transform:
              translate(-50%, -50%)
              scale(1.35);
          }
        }

        @keyframes orbitRotate {
          from {
            transform:
              translate(-50%, -50%)
              rotate(0deg);
          }

          to {
            transform:
              translate(-50%, -50%)
              rotate(360deg);
          }
        }

        @keyframes centerFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-2px);
          }
        }

        @keyframes skillContentIn {
          0% {
            opacity: 0;
            transform:
              translateY(5px)
              scale(0.92);
            filter: blur(2px);
          }

          55% {
            opacity: 1;
            filter: blur(0);
          }

          100% {
            opacity: 1;
            transform:
              translateY(0)
              scale(1);
            filter: blur(0);
          }
        }

        @keyframes centerDotPulse {
          0%,
          100% {
            transform: scale(0.8);
            opacity: 0.7;
          }

          50% {
            transform: scale(1.25);
            opacity: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>

      <section
        id="skills"
        className="
          relative
          overflow-hidden
          bg-[var(--skills-background)]
          py-12
          transition-colors
          duration-500

          xs:py-14
          sm:py-16
          md:py-18
          lg:py-20
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-7xl
            px-4

            xs:px-5
            sm:px-6
            lg:px-8
          "
        >
          {/* Heading */}

          <div className="mb-4 xs:mb-5 sm:mb-6">
            <p
              className="
                font-mono
                text-[8px]
                uppercase
                tracking-[0.25em]
                text-[var(--skills-label)]

                xs:text-[9px]
                xs:tracking-[0.28em]

                sm:tracking-[0.30em]
              "
            >
              Skills
            </p>

            <h2
              className="
                mt-1.5
                text-xl
                font-semibold
                tracking-tight
                text-[var(--skills-heading)]

                xs:text-2xl
                sm:mt-2
                sm:text-3xl
                lg:text-[34px]
              "
            >
              Technologies I Work With
            </h2>
          </div>

          {/* Skill Map */}

          <div
            className="
              relative
              mx-auto
              h-[330px]
              w-full
              max-w-[1030px]

              xs:h-[360px]

              sm:h-[400px]

              md:h-[440px]

              lg:h-[500px]

              xl:h-[540px]
            "
          >
            {/* Ambient Map Glow */}

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
                bg-[var(--skills-point)]/[0.012]
                blur-[65px]

                xs:h-[220px]
                xs:w-[220px]

                sm:h-[250px]
                sm:w-[250px]

                md:h-[280px]
                md:w-[280px]

                lg:h-[300px]
                lg:w-[300px]
                lg:blur-[90px]
              "
            />

            {/* Connections */}

            {PATHS.map((path, index) => (
              <CurvedConnection
                key={index}
                path={path}
                index={index}
              />
            ))}

            {/* Center */}

            <Center
              skill={SKILLS[activeSkill]}
            />

            {/* Nodes */}

            {SKILLS.map((skill, index) => (
              <SkillNode
                key={skill.id}
                skill={skill}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
