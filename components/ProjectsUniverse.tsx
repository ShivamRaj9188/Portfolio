"use client";
import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Torus, Float, Html } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/portfolio";
import ProjectModal from "./ProjectModal";

// Single Dynamic Planet that reacts to hovered state
function DynamicPlanet({
  color, accentColor, isHovered
}: {
  color: string; accentColor: string; isHovered: boolean;
}) {
  const planetRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  
  // Smoothly interpolate colors
  const targetColor = new THREE.Color(color);
  const targetAccent = new THREE.Color(accentColor);

  useFrame((_, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * (isHovered ? 0.8 : 0.2);
      
      const mat = planetRef.current.material as THREE.MeshPhongMaterial;
      mat.color.lerp(targetColor, 0.05);
      mat.emissive.lerp(targetColor, 0.05);
      mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, isHovered ? 0.8 : 0.1, 0.05);
      
      const s = isHovered ? 1.5 : 1.2;
      planetRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.05);
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * (isHovered ? 0.6 : 0.2);
      (ring1Ref.current.material as THREE.MeshPhongMaterial).color.lerp(targetColor, 0.05);
      (ring1Ref.current.material as THREE.MeshPhongMaterial).emissive.lerp(targetColor, 0.05);
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x += delta * (isHovered ? 0.5 : 0.15);
      (ring2Ref.current.material as THREE.MeshPhongMaterial).color.lerp(targetAccent, 0.05);
      (ring2Ref.current.material as THREE.MeshPhongMaterial).emissive.lerp(targetAccent, 0.05);
    }
  });

  return (
    <group position={[3, 0, -2]}>
      {/* Main planet */}
      <Sphere ref={planetRef} args={[1, 64, 64]}>
        <meshPhongMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          specular={new THREE.Color(accentColor)}
          shininess={100}
        />
      </Sphere>

      {/* Rings */}
      <Torus ref={ring1Ref} args={[2.5, 0.02, 16, 100]} rotation={[Math.PI / 2.5, 0.3, 0]}>
        <meshPhongMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={isHovered ? 0.8 : 0.2} />
      </Torus>
      <Torus ref={ring2Ref} args={[3.2, 0.01, 16, 100]} rotation={[Math.PI / 3, 0.5, 0.2]}>
        <meshPhongMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.8} transparent opacity={isHovered ? 0.6 : 0.1} />
      </Torus>

      {/* Planet glow */}
      <pointLight position={[0, 0, 0]} intensity={isHovered ? 5 : 1} color={color} distance={15} />
    </group>
  );
}

// Energy field particles
function EnergyField({ color, isHovered }: { color: string; isHovered: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const targetColor = new THREE.Color(color);
  
  const positions = new Float32Array(
    Array.from({ length: 150 * 3 }, (_, i) => {
      const idx = i % 3;
      if (idx === 0) return 3 + (Math.random() - 0.5) * 10;
      if (idx === 1) return (Math.random() - 0.5) * 10;
      return -2 + (Math.random() - 0.5) * 10;
    })
  );

  useFrame(({ clock }, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * (isHovered ? 0.2 : 0.02);
      (ref.current.material as THREE.PointsMaterial).color.lerp(targetColor, 0.05);
      (ref.current.material as THREE.PointsMaterial).opacity = THREE.MathUtils.lerp(
        (ref.current.material as THREE.PointsMaterial).opacity,
        isHovered ? 0.8 : 0.2,
        0.05
      );
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color={color} transparent opacity={0.2} sizeAttenuation />
    </points>
  );
}

// Background starfield
function Stars() {
  const positions = new Float32Array(
    Array.from({ length: 1500 * 3 }, () => (Math.random() - 0.5) * 150)
  );
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="#ff003c" transparent opacity={0.2} />
    </points>
  );
}

function ProjectsCanvas({ hoveredIndex }: { hoveredIndex: number | null }) {
  const activeProject = hoveredIndex !== null ? projects[hoveredIndex] : { color: "#333333", accentColor: "#555555" };
  const isHovered = hoveredIndex !== null;

  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 60 }} dpr={[1, 1.5]} gl={{ antialias: false, alpha: true }} style={{ position: "absolute", inset: 0 }}>
      <ambientLight intensity={0.1} />
      <directionalLight position={[-10, 10, 10]} intensity={0.2} />
      <Stars />

      <DynamicPlanet 
        color={activeProject.color} 
        accentColor={activeProject.accentColor} 
        isHovered={isHovered} 
      />
      
      <EnergyField 
        color={activeProject.color} 
        isHovered={isHovered} 
      />
    </Canvas>
  );
}

export default function ProjectsUniverse() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  return (
    <section id="projects" className="relative w-full min-h-screen py-32 overflow-hidden bg-transparent">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <ProjectsCanvas hoveredIndex={hoveredProject} />
      </div>

      <div className="relative z-10 w-full md:w-8/12 lg:w-7/12 md:ml-[16.66%] px-6 h-full flex flex-col justify-center gap-10">
        
        {/* Section Header */}
        <div className="mb-10">
          <p className="text-[#ff003c] text-sm md:text-base tracking-[0.5em] uppercase font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            02 / Selected Works
          </p>
        </div>

        {/* Massive Interactive List */}
        <div className="flex flex-col border-t border-white/20">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              onMouseEnter={() => setHoveredProject(i)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => setSelectedProject(i)}
              className="group relative border-b border-white/20 py-10 md:py-16 transition-colors duration-500 cursor-pointer interactive"
            >
              {/* Hover Highlight Fill */}
              <div 
                className="absolute inset-0 scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0"
                style={{ backgroundColor: `${project.color}15` }}
              />

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 px-4 pointer-events-none">
                <div className="flex flex-col gap-2">
                  <h3 
                    className="text-3xl sm:text-4xl md:text-6xl lg:text-[6rem] font-black uppercase tracking-tighter text-white/50 group-hover:text-white transition-colors duration-500"
                    style={{ fontFamily: "'Orbitron', sans-serif", WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}
                  >
                    {project.name}
                  </h3>
                  
                  {/* Expanding Tech Stack on Hover */}
                  <div className="h-0 overflow-hidden group-hover:h-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-0 group-hover:opacity-100 mt-2">
                    <p className="text-sm md:text-lg font-bold tracking-widest uppercase" style={{ color: project.color, fontFamily: "'Space Grotesk', sans-serif" }}>
                      {project.tech.slice(0, 3).join(" • ")}
                    </p>
                  </div>
                </div>

                {/* View Project Arrow (Visible on Hover) */}
                <div className="md:opacity-0 group-hover:opacity-100 md:-translate-x-10 group-hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none">
                  <div className="w-16 h-16 rounded-full border border-white/40 flex items-center justify-center backdrop-blur-sm group-hover:border-transparent transition-colors duration-300" style={{ backgroundColor: `${project.color}33` }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-45 group-hover:rotate-0 transition-transform duration-500">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedProject !== null && (
          <ProjectModal
            project={projects[selectedProject]}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
