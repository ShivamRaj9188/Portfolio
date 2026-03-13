"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { developer } from "@/data/portfolio";

const navLinks = [
  { label: "ABOUT", href: "#about" },
  { label: "SKILLS", href: "#skills" },
  { label: "WORK", href: "#projects" },
  { label: "CONTACT", href: "#contact" },
];

const socialLinks = [
  { label: "IN", href: developer.linkedin },
  { label: "GH", href: developer.github },
  { label: "CV", href: developer.resumeFile, download: "Shivam_Raj_CV.pdf" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Desktop Fixed UI Overlay */}
      <div className="hidden md:block fixed inset-0 pointer-events-none z-50">
        
        {/* Top Left Logo */}
        <div className="absolute top-10 left-10 pointer-events-auto">
          <button
            onClick={() => scrollTo("#home")}
            className="text-2xl font-black text-white hover:text-[#ff003c] transition-colors duration-300 interactive tracking-tighter"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            SR.
          </button>
        </div>

        {/* Top Right Navigation Stack */}
        <nav className="absolute top-10 right-10 flex flex-col items-end gap-2 pointer-events-auto">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="text-xs uppercase tracking-[0.3em] font-bold text-white/50 hover:text-white transition-colors duration-500 interactive group relative py-1"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <span className="relative z-10">{link.label}</span>
              <span className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-px bg-[#ff003c] transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100" />
            </button>
          ))}
        </nav>

        {/* Bottom Left Social Stack */}
        <div className="absolute bottom-10 left-10 flex flex-col items-start gap-4 pointer-events-auto">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.download ? undefined : "_blank"}
              download={link.download}
              rel={link.download ? undefined : "noopener noreferrer"}
              className="text-[10px] font-bold text-white/40 hover:text-[#ff003c] transition-colors duration-300 interactive"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Bottom Right Sound/Status Toggle */}
        <div className="absolute bottom-10 right-10 flex flex-col items-end gap-1 pointer-events-auto">
          <span className="w-1 h-1 bg-[#ff003c] rounded-full animate-pulse shadow-[0_0_10px_#ff003c]" />
          <span className="text-[10px] tracking-widest text-white/30 uppercase mt-2 font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            SYSTEM ONLINE
          </span>
        </div>
      </div>

      {/* Mobile Header (Simplified) */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent pointer-events-auto">
        <button
          onClick={() => scrollTo("#home")}
          className="text-xl font-black text-white"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          SR.
        </button>
        
        <button
          className="flex flex-col gap-1.5 interactive group p-2 relative z-50"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {[0, 1].map((i) => (
            <span
              key={i}
              className={`block h-0.5 bg-white transition-all duration-500 ${
                i === 0
                  ? menuOpen ? "w-6 rotate-45 translate-y-2 bg-[#ff003c]" : "w-6"
                  : menuOpen ? "w-6 -rotate-45 bg-[#ff003c]" : "w-4 ml-auto"
              }`}
            />
          ))}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden fixed inset-0 z-40 bg-[#050000] flex flex-col justify-center px-10 pointer-events-auto"
          >
            <nav className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                >
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-4xl font-black text-white/50 hover:text-[#ff003c] uppercase tracking-widest text-left interactive w-full transition-colors"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    {link.label}
                  </button>
                </motion.div>
              ))}
            </nav>
            
            <div className="absolute bottom-10 left-10 flex gap-6">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.download ? undefined : "_blank"}
                  download={link.download}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                  className="text-xs font-bold text-[#ff003c] tracking-widest uppercase interactive"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
