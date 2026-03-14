"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

export default function ScrubText({
  text,
  hoverText,
  highlights = [],
  highlightColor = "#ff003c",
  className,
  style,
}: {
  text: string;
  hoverText?: string;
  highlights?: string[];
  highlightColor?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 25%"],
  });

  const baseWords = text.split(" ");
  const revealWords = (hoverText || text).split(" ");

  // Zero-lag native mouse tracking via CSS variables
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  // Shared flex classes so both text layers wrap identically
  const textLayout = "flex flex-wrap gap-x-[0.3em] leading-[1.1]";
  const circleSize = 280; // px radius of the blob

  return (
    <div
      ref={containerRef}
      className={`relative group select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...style,
        ["--mx" as string]: "50%",
        ["--my" as string]: "50%",
      }}
    >
      {/*
        LAYER 1 — Base text (professional)
        Always visible. Inverse-masked when hovered so it disappears under the blob.
      */}
      <div
        className={textLayout}
        style={{
          maskImage: isHovered
            ? `radial-gradient(circle ${circleSize}px at var(--mx) var(--my), transparent 100%, black 100%)`
            : "none",
          WebkitMaskImage: isHovered
            ? `radial-gradient(circle ${circleSize}px at var(--mx) var(--my), transparent 100%, black 100%)`
            : "none",
        }}
      >
        {baseWords.map((w, i) => (
          <ScrollWord
            key={`b-${i}`}
            word={w}
            index={i}
            total={baseWords.length}
            progress={scrollYProgress}
            color={
              highlights.some((h) =>
                w.toLowerCase().includes(h.toLowerCase())
              )
                ? highlightColor
                : "rgba(255,255,255,0.55)"
            }
          />
        ))}
      </div>

      {/*
        LAYER 2 — Solid coloured circle blob
        Follows the cursor. Only visible on hover.
      */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{ opacity: isHovered ? 1 : 0 }}
      >
        <div
          className="absolute rounded-full"
          style={{
            width: circleSize * 2,
            height: circleSize * 2,
            left: "var(--mx)",
            top: "var(--my)",
            transform: "translate(-50%, -50%)",
            background: highlightColor,
          }}
        />
      </div>

      {/*
        LAYER 3 — Reveal text (Gen-Z / transformed)
        Dark text, only visible inside the blob circle.
      */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${textLayout}`}
        style={{
          maskImage: `radial-gradient(circle ${circleSize}px at var(--mx) var(--my), black 100%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(circle ${circleSize}px at var(--mx) var(--my), black 100%, transparent 100%)`,
          opacity: isHovered ? 1 : 0,
        }}
      >
        {revealWords.map((w, i) => (
          <ScrollWord
            key={`r-${i}`}
            word={w}
            index={i}
            total={revealWords.length}
            progress={scrollYProgress}
            color={
              highlights.some((h) =>
                w.toLowerCase().includes(h.toLowerCase())
              )
                ? "#000000"
                : "#0a0a0a"
            }
          />
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   Tiny word component that fades in on scroll
   ──────────────────────────────────────────── */
function ScrollWord({
  word,
  index,
  total,
  progress,
  color,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  color: string;
}) {
  const start = index / total;
  const end = Math.min(start + 3 / total, 1);
  const opacity = useTransform(progress, [start, end], [0.4, 1]);

  return (
    <motion.span
      style={{ opacity, color }}
      className="inline-block whitespace-nowrap py-[0.1em] font-bold"
    >
      {word}
    </motion.span>
  );
}
