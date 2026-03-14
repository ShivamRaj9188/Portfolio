"use client";
import ScrubText from "@/components/ScrubText";
import { motion } from "framer-motion";

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
          hoverText="Bro things ain't gonna manifest themselves — you gotta lock in and make it happen fr fr no cap."
          highlights={["happen", "made", "manifest", "lock in", "no cap"]}
          className="text-3xl md:text-4xl lg:text-[3.5rem] font-black uppercase leading-[1.1] text-white tracking-tighter"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        />
      </div>
    </section>
  );
}
