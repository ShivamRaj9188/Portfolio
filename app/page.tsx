"use client";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import { useIsMobile } from "@/hooks/useIsMobile";

// Dynamic imports to prevent SSR issues with Three.js
const HeroScene = dynamic(() => import("@/components/HeroScene"), { ssr: false });
const JourneyScene = dynamic(() => import("@/components/JourneyScene"), { ssr: false });
const SkillsGalaxy = dynamic(() => import("@/components/SkillsGalaxy"), { ssr: false });
const ProjectsUniverse = dynamic(() => import("@/components/ProjectsUniverse"), { ssr: false });
const AchievementsScene = dynamic(() => import("@/components/AchievementsScene"), { ssr: false });
const ContactPlanet = dynamic(() => import("@/components/ContactPlanet"), { ssr: false });

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import BigBangLoader from "@/components/BigBangLoader";

export default function Home() {
  const isMobile = useIsMobile();
  const [hasStarted, setHasStarted] = useState(false);

  return (
    <main className="relative bg-[#020010] min-h-screen overflow-x-hidden">
      <AnimatePresence>
        {!hasStarted ? (
          <BigBangLoader key="loader" onEnter={() => setHasStarted(true)} />
        ) : (
          <div key="content">
            {/* Sticky Navigation */}
            <Navbar />

            {/* Scene 1: Hero */}
            <HeroScene isMobile={isMobile} />

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#ff003c33] to-transparent" />

      {/* Scene 2: Journey */}
      <JourneyScene />

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#ff1a5333] to-transparent" />

      {/* Scene 3: Skills Galaxy */}
      <SkillsGalaxy />

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#ff008033] to-transparent" />

      {/* Scene 4: Projects Universe */}
      <ProjectsUniverse />

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#ffd70033] to-transparent" />

      {/* Scene 5: Achievements */}
      <AchievementsScene />

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#ff003c33] to-transparent" />

            {/* Scene 6: Contact */}
            <ContactPlanet />
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
