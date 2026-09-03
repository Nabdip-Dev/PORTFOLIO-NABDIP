"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FC,
  type PointerEvent,
} from "react";

interface CurvedLoopProps {
  marqueeText?: string;
  speed?: number;
  className?: string;
  curveAmount?: number;
  direction?: "left" | "right";
  interactive?: boolean;
}

const CurvedLoop: FC<CurvedLoopProps> = ({
  marqueeText = "",
  speed = 2,
  className = "",
  curveAmount = 200,
  direction = "left",
  interactive = true,
}) => {
  const text = useMemo(
    () => marqueeText.trimEnd() + "\u00A0",
    [marqueeText]
  );

  const id = useId();
  const pathId = `curve-${id}`;

  const textRef = useRef<SVGTextPathElement>(null);
  const measureRef = useRef<SVGTextElement>(null);

  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const directionRef = useRef(direction);

  const [spacing, setSpacing] = useState(0);

  const pathD = `M-100,30 Q720,${250 + curveAmount * 0.1} 1540,30`;


  const totalText = spacing
    ? Array(Math.ceil(1800 / spacing) + 2)
        .fill(text)
        .join("")
    : text;

  /* Measure text */
  useEffect(() => {
    if (!measureRef.current) return;

    setSpacing(measureRef.current.getComputedTextLength());
  }, [text]);

  /* Animation */
  useEffect(() => {
    if (!spacing || !textRef.current) return;

    const textPath = textRef.current;

    textPath.setAttribute("startOffset", `${-spacing}px`);

    let frame: number;

    const animate = () => {
      if (!dragRef.current) {
        let offset =
          parseFloat(textPath.getAttribute("startOffset") || "0") +
          (directionRef.current === "right" ? speed : -speed);

        if (offset <= -spacing) offset += spacing;
        if (offset > 0) offset -= spacing;

        textPath.setAttribute("startOffset", `${offset}px`);
      }

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [spacing, speed]);

  /* Drag start */
  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (!interactive) return;

    dragRef.current = true;
    lastXRef.current = e.clientX;

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  /* Drag */
  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!interactive || !dragRef.current || !textRef.current) return;

    const dx = e.clientX - lastXRef.current;

    lastXRef.current = e.clientX;

    let offset =
      parseFloat(textRef.current.getAttribute("startOffset") || "0") + dx;

    if (offset <= -spacing) offset += spacing;
    if (offset > 0) offset -= spacing;

    textRef.current.setAttribute("startOffset", `${offset}px`);
  };

  /* Drag end */
  const handlePointerUp = () => {
    if (!interactive) return;

    dragRef.current = false;
  };

  return (
    <div
      className="relative -mt-6 flex w-full items-center justify-center"
      style={{
        visibility: spacing ? "visible" : "hidden",
        cursor: interactive
          ? dragRef.current
            ? "grabbing"
            : "grab"
          : "auto",
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="
          block
          h-[70px]
          w-full
          select-none
          overflow-visible
          text-[2.5rem]
          font-bold
          uppercase
          leading-none
          opacity-15
        "
      >
        <defs>
          <path
            id={pathId}
            d={pathD}
            fill="none"
          />
        </defs>

        {/* Hidden text for measuring */}
        <text
          ref={measureRef}
          xmlSpace="preserve"
          className="invisible"
        >
          {text}
        </text>

        {/* Moving text */}
        {spacing > 0 && (
          <text
            className={`fill-white ${className}`}
            xmlSpace="preserve"
          >
            <textPath
              ref={textRef}
              href={`#${pathId}`}
              startOffset={`${-spacing}px`}
              xmlSpace="preserve"
            >
              {totalText}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
};

export default CurvedLoop;
