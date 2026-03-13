"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/portfolio";

type Project = (typeof projects)[number] & { image?: string };

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  // Lock body scroll when modal is open
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="modal-overlay"
        onClick={onClose}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="glass-strong rounded-[2.5rem] max-w-3xl w-full relative overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
          style={{
            border: `1px solid ${project.color}33`,
            boxShadow: `0 20px 60px -10px ${project.color}40, 0 0 20px ${project.color}22 inset`
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Hero Image Section */}
          <div className="relative w-full h-72 md:h-96 overflow-hidden flex-shrink-0">
            {project.image ? (
              <img 
                src={project.image} 
                alt={project.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full" style={{ backgroundColor: `${project.color}22` }} />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            
            {/* Project Accent Glow */}
            <div
              className="absolute -inset-10 opacity-30 pointer-events-none animate-pulse-slow"
              style={{
                background: `radial-gradient(circle at 50% 0%, ${project.color}, transparent 70%)`,
                filter: "blur(40px)"
              }}
            />

            {/* Floating Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center glass-strong border border-white/20 text-white hover:bg-[#ff003c] hover:border-[#ff003c] transition-all duration-300 z-50 group shadow-lg"
            >
              <span className="transform group-hover:rotate-90 transition-transform duration-300 font-bold">✕</span>
            </button>
          </div>

          <div 
            className="p-8 md:p-12 relative z-10 overflow-y-auto custom-scrollbar flex-1"
            style={{ overscrollBehavior: 'contain' }}
          >
            {/* Header */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-3 h-3 rounded-full" style={{ background: project.color, boxShadow: `0 0 15px ${project.color}` }} />
                <span className="text-xs tracking-[0.3em] text-white/60 uppercase font-black" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  System Overview
                </span>
              </div>
              <h2 className="cinematic-title text-4xl md:text-6xl mb-3" style={{ color: project.color, textShadow: `0 0 30px ${project.color}88` }}>
                {project.name}
              </h2>
              <p className="text-white/60 text-sm tracking-widest uppercase font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {project.tagline}
              </p>
            </div>

            {/* Description */}
            <p className="text-white/80 text-sm leading-relaxed mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {project.description}
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              {/* Features */}
              <div>
                <p className="cinematic-subtitle text-[10px] text-white/40 mb-4">
                  Core Features
                </p>
                <ul className="space-y-3">
                  {project.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      className="flex items-start gap-3 text-sm text-white/70"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: project.color, boxShadow: `0 0 8px ${project.color}` }} />
                      <span className="leading-relaxed">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div>
                <p className="cinematic-subtitle text-[10px] text-white/40 mb-4">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, i) => (
                    <motion.span
                      key={t}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                      className="px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-bold glass border"
                      style={{
                        borderColor: `${project.color}33`,
                        color: project.color,
                        fontFamily: "'Space Grotesk', sans-serif",
                        textShadow: `0 0 10px ${project.color}44`
                      }}
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-col sm:flex-row gap-4">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-3 py-4 rounded-full font-bold text-xs uppercase tracking-widest text-black transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(255,255,255,0.2)]"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}, ${project.accentColor})`,
                    boxShadow: `0 8px 30px ${project.color}33`,
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Live Demo
                </a>
              )}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-3 py-4 rounded-full font-bold text-xs uppercase tracking-widest text-white glass-strong border transition-all duration-300 hover:scale-[1.02]"
                style={{
                  borderColor: `${project.color}44`,
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub Code
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
