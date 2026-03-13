"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { certifications } from "@/data/portfolio";

// Light beam shooting up
function LightBeamUp({ x, delay }: { x: number; delay: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      (ref.current.material as THREE.MeshPhongMaterial).opacity =
        0.05 + Math.sin(clock.elapsedTime * 1.2 + delay) * 0.05;
    }
  });
  return (
    <mesh ref={ref} position={[x, 4, 0]}>
      <cylinderGeometry args={[0.04, 0.4, 12, 6]} />
      <meshPhongMaterial color="#ff4d79" transparent opacity={0.1} />
    </mesh>
  );
}

// Glowing knowledge core
function KnowledgeCore() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.15;
      groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshPhongMaterial color="#990024" emissive="#990024" emissiveIntensity={0.2} wireframe transparent opacity={0.4} />
      </mesh>
      <mesh>
        <octahedronGeometry args={[0.8]} />
        <meshPhongMaterial color="#ff4d79" emissive="#ff4d79" emissiveIntensity={0.5} transparent opacity={0.8} />
      </mesh>
      <pointLight position={[0, 0, 0]} color="#ff4d79" intensity={2} distance={15} />
    </group>
  );
}

function CertificationsCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 60 }} gl={{ antialias: true, alpha: true }} style={{ position: "absolute", inset: 0 }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="white" />

      <Float speed={2} floatIntensity={1.5} rotationIntensity={0.5}>
        <KnowledgeCore />
      </Float>

      <LightBeamUp x={-3} delay={0} />
      <LightBeamUp x={0} delay={1} />
      <LightBeamUp x={3} delay={2} />
    </Canvas>
  );
}

export default function AchievementsScene() {
  return (
    <section id="achievements" className="relative w-full min-h-screen flex items-center justify-start overflow-hidden py-32 bg-transparent">
      <div className="absolute inset-0 pointer-events-none z-0">
        <CertificationsCanvas />
      </div>

      <div className="relative z-10 w-full md:w-8/12 lg:w-7/12 md:ml-[16.66%] px-6">
        {/* Section Header */}
        <div className="mb-20">
          <p className="text-[#ff003c] text-sm md:text-base tracking-[0.5em] uppercase font-bold mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            03 / Certifications
          </p>
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-[1.1] text-white tracking-tighter"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Proof of Work
          </h2>
          <p className="mt-6 text-white/50 text-sm md:text-base font-medium max-w-md leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Official credentials verifying technical proficiency and continuous learning.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 gap-8 relative z-10">
          {certifications.map((cert, i) => (
            <motion.a
              key={i}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
              whileHover={{ y: -10 }}
              className="glass-strong rounded-[2.5rem] overflow-hidden border border-white/10 hover:border-[#ff003c]/50 transition-all duration-500 group flex flex-col bg-black/40 interactive shadow-2xl"
            >
              {/* Image Preview Container */}
              <div className="relative h-64 overflow-hidden bg-black/20">
                <img 
                  src={cert.image} 
                  alt={cert.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                
                {/* Status Badge */}
                <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-[#ff003c] text-white text-[10px] font-black tracking-widest uppercase shadow-lg">
                  Verified
                </div>
              </div>

              <div className="p-8 flex-grow flex flex-col">
                <p className="text-[#ff4d79] text-[10px] font-black tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {cert.issuer}
                </p>
                <h3 className="font-bold text-white text-xl leading-tight mb-6 group-hover:text-[#ff003c] transition-colors line-clamp-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  {cert.name}
                </h3>
                
                <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
                  <span className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em] group-hover:text-white transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    View Certificate
                  </span>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#ff003c] group-hover:bg-[#ff003c] transition-all duration-500">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
