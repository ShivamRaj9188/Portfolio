"use client";
import ScrubText from "@/components/ScrubText";
import { motion } from "framer-motion";
import { softSkills } from "@/data/portfolio";

export default function MottoSection() {
  return (
    <section className="relative w-full overflow-hidden py-28 bg-transparent">
      <div className="relative z-10 w-full md:w-8/12 lg:w-9/12 md:ml-[12.5%] px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[#ff003c] text-sm md:text-base tracking-[0.5em] uppercase font-bold mb-8"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Motto
        </motion.p>

        <ScrubText
          text="Things don't happen on their own — they are made to happen."
          hoverText="Good results come from showing up, doing the work, and finishing what you start."
          highlights={["happen", "made", "work", "finishing"]}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-[3.5rem] font-black uppercase leading-[1.1] text-white tracking-tighter"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        />

        {/* Soft Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16"
        >
          <div className="flex items-center gap-6 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#ff003c]/30 to-transparent" />
            <p className="text-[#ff003c] text-xs tracking-[0.4em] uppercase font-black" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Soft Skills
            </p>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#ff003c]/30 to-transparent" />
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {softSkills.map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.6 }}
                className="glass-strong px-6 py-3 rounded-full border border-white/5 hover:border-[#ff003c]/40 transition-all duration-500 group cursor-default"
              >
                <span className="text-xs uppercase tracking-[0.2em] text-white/60 font-bold group-hover:text-[#ff003c] transition-colors duration-300" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {skill}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
