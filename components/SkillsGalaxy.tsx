"use client";
import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, Box, Torus } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { skills } from "@/data/portfolio";

// Central energy core
function EnergyCore() {
  const ref = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.3;
    if (innerRef.current) {
      innerRef.current.rotation.x = clock.elapsedTime * 0.5;
      const pulse = 1 + Math.sin(clock.elapsedTime * 2) * 0.1;
      innerRef.current.scale.setScalar(pulse);
    }
  });
  return (
    <group>
      <Sphere ref={ref} args={[0.6, 32, 32]} position={[0, 0, 0]}>
        <meshPhongMaterial color="#ff003c" emissive="#ff003c" emissiveIntensity={1} transparent opacity={0.9} />
      </Sphere>
      <Sphere ref={innerRef} args={[0.9, 16, 16]} position={[0, 0, 0]}>
        <meshPhongMaterial color="#ff1a53" emissive="#ff1a53" emissiveIntensity={0.3} transparent opacity={0.15} wireframe />
      </Sphere>
      <pointLight position={[0, 0, 0]} intensity={3} color="#ff003c" distance={15} />
    </group>
  );
}

// Orbiting skill cube (languages)
function OrbitingCube({ angle, radius, speed, color, label, onHover }: {
  angle: number; radius: number; speed: number; color: string; label: string;
  onHover: (label: string | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.elapsedTime * speed + angle;
      groupRef.current.position.x = Math.cos(t) * radius;
      groupRef.current.position.z = Math.sin(t) * radius;
    }
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.02;
      meshRef.current.rotation.y += 0.015;
      const scale = hovered ? 1.4 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }
  });

  return (
    <group ref={groupRef}>
      <Box
        ref={meshRef}
        args={[0.35, 0.35, 0.35]}
        onPointerEnter={(e) => { e.stopPropagation(); setHovered(true); onHover(label); }}
        onPointerLeave={() => { setHovered(false); onHover(null); }}
      >
        <meshPhongMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 1.2 : 0.4}
          wireframe={!hovered}
        />
      </Box>
      {hovered && (
        <pointLight position={[0, 0, 0]} intensity={2} color={color} distance={5} />
      )}
    </group>
  );
}

// Orbiting sphere (frameworks)
function OrbitingSphere({ angle, radius, speed, color, label, yOffset, onHover }: {
  angle: number; radius: number; speed: number; color: string; label: string; yOffset: number;
  onHover: (label: string | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.elapsedTime * speed + angle;
      groupRef.current.position.x = Math.cos(t) * radius;
      groupRef.current.position.z = Math.sin(t) * radius;
      groupRef.current.position.y = yOffset + Math.sin(t * 2) * 0.2;
    }
    if (meshRef.current) {
      const scale = hovered ? 1.5 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }
  });

  return (
    <group ref={groupRef}>
      <Sphere
        ref={meshRef}
        args={[0.22, 20, 20]}
        onPointerEnter={(e) => { e.stopPropagation(); setHovered(true); onHover(label); }}
        onPointerLeave={() => { setHovered(false); onHover(null); }}
      >
        <meshPhongMaterial color={color} emissive={color} emissiveIntensity={hovered ? 1 : 0.5} />
      </Sphere>
      {hovered && <pointLight position={[0, 0, 0]} intensity={1.5} color={color} distance={4} />}
    </group>
  );
}

// Orbit ring guide
function OrbitRing({ radius, color, y = 0 }: { radius: number; color: string; y?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  return (
    <Torus ref={ref} args={[radius, 0.01, 4, 80]} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <meshPhongMaterial color={color} transparent opacity={0.2} />
    </Torus>
  );
}

function SkillsCanvas({ onHover }: { onHover: (label: string | null) => void }) {
  const langColors = ["#ff003c", "#ff1a53", "#ff0080", "#ffd700"];
  const fwColors = ["#00ff88", "#ff6b6b", "#4ecdc4", "#45b7d1"];
  const toolColors = ["#fdcb6e", "#e17055", "#74b9ff"];

  return (
    <Canvas 
      dpr={[1, 1.5]}
      camera={{ position: [0, 3, 10], fov: 60 }} 
      gl={{ antialias: false, alpha: true }} 
      style={{ position: "absolute", inset: 0 }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 10, 0]} intensity={1} color="white" />
      <EnergyCore />

      {/* Language cubes – inner orbit */}
      <OrbitRing radius={2.5} color="#ff003c" />
      {skills.languages.map((lang, i) => (
        <OrbitingCube
          key={lang}
          angle={(i / skills.languages.length) * Math.PI * 2}
          radius={2.5}
          speed={0.4}
          color={langColors[i % langColors.length]}
          label={lang}
          onHover={onHover}
        />
      ))}

      {/* Framework spheres – middle orbit */}
      <OrbitRing radius={4} color="#ff1a53" y={0.5} />
      {skills.frameworks.map((fw, i) => (
        <OrbitingSphere
          key={fw}
          angle={(i / skills.frameworks.length) * Math.PI * 2}
          radius={4}
          speed={0.25}
          color={fwColors[i % fwColors.length]}
          label={fw}
          yOffset={0.5}
          onHover={onHover}
        />
      ))}

      {/* Tool rings – outer orbit */}
      <OrbitRing radius={5.5} color="#ff0080" y={-0.5} />
      {skills.tools.map((tool, i) => (
        <OrbitingSphere
          key={tool}
          angle={(i / skills.tools.length) * Math.PI * 2}
          radius={5.5}
          speed={0.15}
          color={toolColors[i % toolColors.length]}
          label={tool}
          yOffset={-0.5}
          onHover={onHover}
        />
      ))}
    </Canvas>
  );
}

export default function SkillsGalaxy() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const allSkills = useMemo(() => [
    ...skills.languages.map((s) => ({ name: s, category: "Language", color: "#ff003c" })),
    ...skills.frameworks.map((s) => ({ name: s, category: "Framework", color: "#ff1a53" })),
    ...skills.libraries.map((s) => ({ name: s, category: "Library", color: "#ff0080" })),
    ...skills.tools.map((s) => ({ name: s, category: "Tool", color: "#ffd700" })),
    ...skills.soft.map((s) => ({ name: s, category: "Soft Skill", color: "#00ff88" })),
  ], []);

  return (
    <section id="skills" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-32">
      <SkillsCanvas onHover={setHoveredSkill} />

      {/* Hovered skill label */}
      <AnimatePresence>
        {hoveredSkill && (
          <motion.div
            key={hoveredSkill}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20"
          >
            <div className="glass-strong rounded-2xl px-6 py-3 text-center glow-red-dark">
              <p className="text-xl font-bold text-[#ff003c]" style={{ fontFamily: "'Orbitron', sans-serif" }}>{hoveredSkill}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section content */}
      <div className="relative z-10 w-full md:w-10/12 lg:w-8/12 px-6 h-full flex flex-col justify-center items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="text-[#ff003c] text-sm md:text-base tracking-[0.5em] uppercase font-bold mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            02.5 / Proficiency
          </p>
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-[1.1] text-white tracking-tighter"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Skills Engine
          </h2>
          <p className="mt-6 mx-auto text-white/50 text-sm md:text-base font-medium max-w-md leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Hover over the orbiting objects to explore the technology stack powering my universes.
          </p>
        </motion.div>

        {/* Skill legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mt-8"
        >
          {[
            { label: "Languages", color: "#ff003c" },
            { label: "Frameworks", color: "#ff1a53" },
            { label: "Tools", color: "#ff0080" },
          ].map((cat) => (
            <div key={cat.label} className="flex items-center gap-3 glass-strong px-6 py-3 rounded-full border border-white/5 hover:border-[#ff003c]/30 transition-colors shadow-[0_4px_15px_rgba(0,0,0,0.5)] cursor-default">
              <span className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor]" style={{ background: cat.color, color: cat.color }} />
              <span className="text-xs uppercase tracking-[0.2em] text-white/80 font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {cat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* All skills list */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 flex flex-wrap justify-center gap-3 max-w-4xl"
        >
          {allSkills.map((skill) => (
            <span
              key={skill.name + skill.category}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
              className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] glass border border-white/5 text-white/50 hover:text-white hover:border-[#ff003c]/40 hover:bg-[#ff003c]/10 transition-all duration-300 pointer-events-auto cursor-default interactive"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {skill.name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
