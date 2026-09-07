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
        fill="#38bdf8"
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
        fill="#38bdf8"
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
        fill="#38bdf8"
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
          <feGaussianBlur stdDeviation="2.5" />
        </filter>

        <filter
          id="smallPointGlow"
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
        stroke="rgba(255,255,255,0.025)"
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
      className="absolute z-30 -translate-x-1/2 -translate-y-1/2 group"
      style={{
        left: position.left,
        top: position.top,
      }}
    >
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[64px]
          w-[64px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-sky-400/[0.04]
          opacity-0
          blur-xl
          transition-all
          duration-500
          group-hover:scale-125
          group-hover:opacity-100
        "
      />

      <div
        className="
          skill-node
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
          transition-all
          duration-500
          ease-out
          group-hover:scale-[1.08]
          group-hover:border-sky-400/[0.25]
          group-hover:shadow-[0_0_30px_rgba(56,189,248,0.10)]
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
            inset-[5px]
            rounded-full
            border
            border-white/[0.035]
            transition-all
            duration-500
            group-hover:border-sky-400/[0.10]
          "
        />

        <Icon
          size={21}
          color={skill.color}
          className="
            relative
            z-10
            transition-transform
            duration-500
            ease-out
            group-hover:scale-110
          "
        />

        <span
          className="
            origin-dot
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
              ? {
                  right: "-2px",
                  animationDelay: `${index * 0.15}s`,
                }
              : {
                  left: "-2px",
                  animationDelay: `${index * 0.15}s`,
                }
          }
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
        style={{
          animation: "ambientPulse 5s ease-in-out infinite",
        }}
      />

      <div
        className="
          pulse-ring
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[145px]
          w-[145px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-sky-400/[0.07]
        "
      />

      <div
        className="
          pulse-ring
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[145px]
          w-[145px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-sky-400/[0.035]
        "
        style={{
          animationDelay: "1.7s",
        }}
      />

      <div
        className="
          orbit
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

      <div
        className="
          center-circle
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

        <div
          key={skill.id}
          className="relative z-10 flex flex-col items-center"
          style={{
            animation:
              "skillContentIn 550ms cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <Icon
            size={31}
            color={skill.color}
            style={{
              filter: `drop-shadow(0 0 8px ${skill.color}25)`,
            }}
          />

          <span
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

          <span
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
        </div>

        <span
          className="
            center-dot
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

export function Skills() {
  const [activeSkill, setActiveSkill] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSkill(
        (current) =>
          (current + 1) % SKILLS.length
      );
    }, 3200);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return (
    <>
      {/* =====================================================
          GLOBAL ANIMATIONS
      ===================================================== */}

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
              0 0 6px rgba(56, 189, 248, 0.55);
          }

          50% {
            opacity: 1;
            transform: translateY(-50%) scale(1.2);
            box-shadow:
              0 0 14px rgba(56, 189, 248, 0.95);
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
            {/* Background glow */}

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

            {/* Curved connections */}

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

            {/* Skill nodes */}

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
