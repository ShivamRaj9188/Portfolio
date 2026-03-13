"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, MotionValue, AnimatePresence } from "framer-motion";

export default function ScrubText({ 
  text, 
  hoverText,
  className, 
  style 
}: { 
  text: string; 
  hoverText?: string;
  className?: string; 
  style?: React.CSSProperties 
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 50%"],
  });

  const words = text.split(" ");
  const hoverWords = hoverText ? hoverText.split(" ") : words;

  // Use the longer array to ensure all words are covered if they differ in count
  const maxWords = Math.max(words.length, hoverWords.length);

  return (
    <div 
      ref={containerRef} 
      className={`flex flex-wrap gap-x-[0.25em] cursor-default ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={style}
    >
      {Array.from({ length: maxWords }).map((_, i) => {
        const start = i / maxWords;
        const end = start + (1 / maxWords);
        return (
          <Word 
            key={i} 
            word={words[i] || ""} 
            hoverWord={hoverWords[i] || words[i] || ""}
            progress={scrollYProgress} 
            range={[start, end]} 
            isHovered={isHovered}
          />
        );
      })}
    </div>
  );
}

function Word({ 
  word, 
  hoverWord, 
  progress, 
  range, 
  isHovered 
}: { 
  word: string; 
  hoverWord: string;
  progress: MotionValue<number>; 
  range: [number, number];
  isHovered: boolean;
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  
  // Only swap if hoverWord is different
  const displayWord = isHovered ? hoverWord : word;

  return (
    <span className="relative inline-block mt-1 transition-colors duration-500">
      <span className="absolute opacity-10 select-none">{displayWord}</span>
      <motion.span 
        style={{ opacity }}
        animate={{ 
          color: isHovered ? "#ff003c" : "#ffffff",
          scale: isHovered ? 1.05 : 1,
          filter: isHovered ? "blur(0px)" : "blur(0px)"
        }}
        className="inline-block"
      >
        {displayWord}
      </motion.span>
    </span>
  );
}
