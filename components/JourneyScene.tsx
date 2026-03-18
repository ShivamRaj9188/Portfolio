"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, Torus } from "@react-three/drei";
import * as THREE from "three";
import { motion, useInView } from "framer-motion";
import { education, training, aboutMe } from "@/data/portfolio";
import ScrubText from "./ScrubText";

// Floating platform
function Platform({ position, color, width = 3 }: { position: [number, number, number]; color: string; width?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.5 + position[0]) * 0.3;
    }
  });
  return (
    <mesh ref={ref} position={position} receiveShadow>
      <boxGeometry args={[width, 0.1, 1.5]} />
      <meshPhongMaterial color={color} emissive={color} emissiveIntensity={0.3} transparent opacity={0.6} />
    </mesh>
  );
}

// Dust particles
function DustParticles() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.08} color="#ff1a53" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

// Light beam
function LightBeam({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      (ref.current.material as THREE.MeshPhongMaterial).opacity =
        0.1 + Math.sin(clock.elapsedTime * 1.5 + position[0]) * 0.08;
    }
  });
  return (
    <mesh ref={ref} position={position}>
      <cylinderGeometry args={[0.05, 0.3, 8, 8]} />
      <meshPhongMaterial color="#ff003c" transparent opacity={0.15} />
    </mesh>
  );
}

function JourneyCanvas() {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 10], fov: 60 }} gl={{ antialias: false, alpha: true }} style={{ position: "absolute", inset: 0 }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[-3, 5, 3]} intensity={3} color="#ff003c" distance={25} />
      <pointLight position={[3, -2, 3]} intensity={2} color="#ff1a53" distance={20} />
      <DustParticles />
      <Platform position={[-3, 1, -3]} color="#ff003c" width={3} />
      <Platform position={[0, -0.5, -5]} color="#ff1a53" width={4} />
      <Platform position={[3, 0.5, -7]} color="#ff0080" width={2.5} />
      <LightBeam position={[-3, -4, -3]} />
      <LightBeam position={[0, -4, -5]} />
      <LightBeam position={[3, -4, -7]} />
      <Float speed={2} floatIntensity={1.5}>
        <mesh position={[5, 2, -6]} rotation={[0.5, 0.5, 0]}>
          <octahedronGeometry args={[0.5]} />
          <meshPhongMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={0.4} wireframe />
        </mesh>
      </Float>
      <Float speed={1.5} floatIntensity={1}>
        <mesh position={[-5, -1, -4]} rotation={[0.3, 0.7, 0]}>
          <icosahedronGeometry args={[0.4]} />
          <meshPhongMaterial color="#ff003c" emissive="#ff003c" emissiveIntensity={0.4} wireframe />
        </mesh>
      </Float>
    </Canvas>
  );
}

// Training Achievement Component with Optimized 3D Visuals
function TrainingAchievement({ item }: { item: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 }); 

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="group relative glass-strong px-6 py-10 md:px-8 md:py-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-white/5 hover:border-[#ff003c]/40 transition-all duration-700 flex flex-col md:flex-row items-center gap-8 md:gap-12 overflow-hidden shadow-2xl"
    >
      {/* Background Orbital Glow */}
      <div className="absolute -inset-10 opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle at 70% 30%, #ff003c, transparent 60%)`,
          filter: "blur(60px)"
        }}
      />
      
      {/* 3D Visual Section */}
      <div className="w-48 h-48 md:w-56 md:h-56 flex-shrink-0 relative">
        {isInView ? (
          <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
            <ambientLight intensity={1} />
            <pointLight position={[5, 5, 5]} intensity={1.5} color="#ff003c" />
            <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.8}>
              {/* Restored segments back to original high quality */}
              <Sphere args={[1.5, 32, 32]}>
                <meshPhongMaterial
                  color="#ff003c"
                  emissive="#ff003c"
                  emissiveIntensity={0.5}
                  shininess={80}
                />
              </Sphere>
              {/* Restored segments for Torus */}
              <Torus args={[2.5, 0.03, 8, 48]} rotation={[Math.PI / 2.5, 0, 0]}>
                <meshPhongMaterial color="white" emissive="#ff4d79" emissiveIntensity={1} transparent opacity={0.6} />
              </Torus>
              {/* Achievement Satellites */}
              {[0, 1, 2].map((i) => (
                <mesh key={i} position={[Math.cos(i * 2.1) * 3, Math.sin(i * 2.1) * 3, 0]}>
                  <sphereGeometry args={[0.2, 8, 8]} />
                  <meshPhongMaterial color="#ff003c" emissive="#ff003c" emissiveIntensity={2} />
                </mesh>
              ))}
            </Float>
          </Canvas>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Visual placeholder while off-screen */}
            <div className="w-24 h-24 rounded-full bg-[#ff003c]/10 border border-[#ff003c]/20 animate-pulse" />
          </div>
        )}
        
        {/* Floating Icons/Labels Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full h-full border border-white/5 rounded-full animate-spin-slow opacity-10" />
        </div>
      </div>

      {/* Content Section */}
      <div className="relative z-10 flex-1 text-center md:text-left">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
              <span className="w-3 h-3 rounded-full bg-[#ff003c] shadow-[0_0_15px_#ff003c] animate-pulse" />
              <span className="text-xs tracking-[0.4em] text-[#ff003c] font-black uppercase">Core Specialization</span>
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-5xl font-black text-white uppercase tracking-tighter mb-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              {item.title}
            </h3>
            <p className="text-[#ff4d79] text-base font-black tracking-widest uppercase mb-2">
              {item.provider} • {item.period}
            </p>
            {item.role && (
              <p className="text-white/60 text-sm font-bold tracking-widest uppercase mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Role: {item.role}
              </p>
            )}
          </div>

          {item.link && (
            <a 
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-4 px-8 py-4 rounded-full bg-white text-black font-black text-xs uppercase tracking-[0.2em] hover:bg-[#ff003c] hover:text-white transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.1)] group/btn"
            >
              Verify Credential
              <svg className="w-4 h-4 transform group-hover/btn:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          )}
        </div>

        {item.tasks && (
          <p className="text-white/60 text-sm leading-relaxed font-medium mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <span className="text-[#ff003c] font-black">Key Tasks:</span> {item.tasks}
          </p>
        )}
        
        <p className="text-white/70 text-base md:text-lg leading-relaxed font-medium mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {item.description}
        </p>

        {/* Skills Gained Tags */}
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          {(item.skillsGained || []).map((tag: string) => (
            <span key={tag} className="px-4 py-2 rounded-[1rem] bg-white/5 border border-white/10 text-[10px] text-white/50 uppercase font-black tracking-widest hover:border-[#ff003c]/40 hover:text-[#ff003c] transition-all duration-300">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function JourneyScene() {
  return (
    <section id="about" className="relative w-full overflow-hidden py-20">
      <JourneyCanvas />

      <div className="relative z-10 w-full md:w-8/12 lg:w-9/12 md:ml-[12.5%] px-6">
        
        {/* Section Header */}
        <div className="mb-12">
          <p className="text-[#ff003c] text-sm md:text-base tracking-[0.5em] uppercase font-bold mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            01 / About Me
          </p>
          
          <ScrubText 
            text="Full Stack Developer and AI Enthusiast — building intelligent, high-performance digital products from concept to deployment." 
            hoverText="Building absolute cinema in tech. MERN, AI, and Vision — we making top-tier systems that hit different."
            highlights={["Full Stack", "AI", "high-performance", "absolute cinema", "MERN", "top-tier"]}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[3.5rem] font-black uppercase leading-[1.1] text-white tracking-tighter"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          />
        </div>

        {/* Career Snapshot */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="glass-strong rounded-[2rem] p-8 md:p-10 border border-white/5 hover:border-[#ff003c]/30 transition-all duration-500 mb-16 relative overflow-hidden"
        >
          <div className="absolute -inset-10 opacity-10 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 30% 50%, #ff003c, transparent 60%)`,
              filter: "blur(60px)"
            }}
          />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-3 h-3 rounded-full bg-[#ff003c] shadow-[0_0_15px_#ff003c] animate-pulse" />
              <span className="text-xs tracking-[0.4em] text-[#ff003c] font-black uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Career Snapshot
              </span>
            </div>
            <p className="text-white/70 text-base md:text-lg leading-relaxed font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {aboutMe}
            </p>
          </div>
        </motion.div>

        {/* Training Section - Planetary Focus */}
        <div className="mt-20 space-y-16">
          <div className="flex items-center gap-6 mb-12">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#ff003c]/30 to-transparent" />
            <p className="text-[#ff003c] text-sm md:text-base tracking-[0.6em] uppercase font-black" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Training / High Command
            </p>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#ff003c]/30 to-transparent" />
          </div>

          <div className="space-y-16 max-w-5xl mx-auto">
            {training.map((item, i) => (
              <TrainingAchievement key={i} item={item} />
            ))}
          </div>
        </div>

        {/* Education Timeline */}
        <div className="mt-20 space-y-16">
          <p className="text-[#ff003c] text-sm md:text-base tracking-[0.6em] uppercase font-black border-b border-[#ff003c]/20 pb-6 mb-12" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Educational Core
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="group glass p-8 rounded-[2rem] border border-white/5 hover:border-[#ff003c]/30 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="flex flex-col h-full justify-between gap-8">
                  <div>
                    <span className="text-white/20 group-hover:text-[#ff003c] text-xs font-bold tracking-widest uppercase transition-colors duration-500">Academic node {i+1}</span>
                    <h3 className="text-xl md:text-2xl text-white font-black uppercase tracking-tight mt-4 leading-none" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                      {edu.degree}
                    </h3>
                    <p className="text-white/50 text-sm font-bold uppercase tracking-wider mt-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {edu.institution}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="px-4 py-1.5 rounded-full border border-white/10 text-white/40 text-[10px] uppercase font-black group-hover:border-[#ff003c]/30 group-hover:text-[#ff003c]">
                      {edu.grade}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
