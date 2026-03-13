"use client";
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Float } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { developer } from "@/data/portfolio";

// Central contact planet mesh (renamed to avoid collision with exported component)
function ContactPlanetMesh() {
  const ref = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.1;
    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshPhongMaterial;
      mat.opacity = 0.08 + Math.sin(clock.elapsedTime) * 0.04;
    }
  });

  return (
    <group>
      <Sphere ref={ref} args={[1.8, 32, 32]} position={[0, 0, 0]}>
        <meshPhongMaterial color="#ff003c" emissive="#0039ff" emissiveIntensity={0.3} shininess={80} />
      </Sphere>
      <Sphere ref={glowRef} args={[2.2, 16, 16]} position={[0, 0, 0]}>
        <meshPhongMaterial color="#ff003c" transparent opacity={0.08} />
      </Sphere>
      <pointLight position={[0, 0, 0]} intensity={2} color="#ff003c" distance={15} />
    </group>
  );
}

// Orbiting satellite (fixed prop name: orbitRadius instead of orbit)
function OrbitingSatellite({
  orbitRadius, speed, angleOffset, color, icon, label, link,
}: {
  orbitRadius: number; speed: number; angleOffset: number;
  color: string; icon: string; label: string; link: string;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.elapsedTime * speed + angleOffset;
      groupRef.current.position.x = Math.cos(t) * orbitRadius;
      groupRef.current.position.z = Math.sin(t) * orbitRadius;
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.5;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.02;
      const s = hovered ? 1.4 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.1);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        onPointerEnter={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
        onClick={() => window.open(link, "_blank")}
      >
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshPhongMaterial color={color} emissive={color} emissiveIntensity={hovered ? 1 : 0.4} />
      </mesh>
      {hovered && <pointLight position={[0, 0, 0]} intensity={2} color={color} distance={6} />}
    </group>
  );
}

// Orbit trail ring
function OrbitTrail({ radius }: { radius: number }) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.015, 4, 80]} />
      <meshPhongMaterial color="#ff003c" transparent opacity={0.15} />
    </mesh>
  );
}

// Background stars
function Stars() {
  const positions = new Float32Array(3000 * 3).map(() => (Math.random() - 0.5) * 120);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="#7799ff" transparent opacity={0.7} />
    </points>
  );
}

// Contact links — mapped without emojis
const contactLinks = [
  { id: "github", label: "GitHub", link: developer.github, color: "#ffffff", orbitRadius: 4, speed: 0.5, angleOffset: 0 },
  { id: "linkedin", label: "LinkedIn", link: developer.linkedin, color: "#990024", orbitRadius: 4, speed: 0.5, angleOffset: (2 * Math.PI) / 3 },
  { id: "email", label: "Email", link: `mailto:${developer.email}`, color: "#ff4d79", orbitRadius: 4, speed: 0.5, angleOffset: (4 * Math.PI) / 3 },
];

function getIcon(id: string) {
  switch (id) {
    case "github":
      return (
        <svg className="w-8 h-8 mx-auto mb-3 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg className="w-8 h-8 mx-auto mb-3 text-[#990024]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      );
    case "email":
      return (
        <svg className="w-8 h-8 mx-auto mb-3 text-[#ff4d79]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    default:
      return null;
  }
}

function ContactCanvas() {
  return (
    <Canvas camera={{ position: [0, 2, 10], fov: 55 }} gl={{ antialias: true, alpha: true }} style={{ position: "absolute", inset: 0 }}>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 10, 5]} intensity={0.4} />
      <Stars />
      <ContactPlanetMesh />
      <OrbitTrail radius={4} />

      {contactLinks.map((contact) => (
        <OrbitingSatellite
          key={contact.label}
          orbitRadius={contact.orbitRadius}
          speed={contact.speed}
          angleOffset={contact.angleOffset}
          color={contact.color}
          icon={contact.id}
          label={contact.label}
          link={contact.link}
        />
      ))}

      <Float speed={2} floatIntensity={1.5}>
        <mesh position={[6, 3, -4]}>
          <icosahedronGeometry args={[0.3]} />
          <meshPhongMaterial color="#990024" emissive="#990024" emissiveIntensity={0.5} wireframe />
        </mesh>
      </Float>
    </Canvas>
  );
}

export default function ContactPlanet() {
  return (
    <section id="contact" className="relative w-full min-h-screen flex items-center justify-start overflow-hidden py-32 bg-transparent">
      <div className="absolute inset-0 pointer-events-none z-0">
        <ContactCanvas />
      </div>

      <div className="relative z-10 w-full md:w-8/12 lg:w-7/12 md:ml-[16.66%] px-6">
        {/* Header */}
        <div className="mb-20">
          <p className="text-[#ff003c] text-sm md:text-base tracking-[0.5em] uppercase font-bold mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            04 / Contact
          </p>
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-[1.1] text-white tracking-tighter"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Let&apos;s Connect
          </h2>
          <p className="mt-6 text-white/50 text-sm md:text-base font-medium max-w-md leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Click the orbiting satellites or use the links below to reach out. I am open to new opportunities.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16 relative z-10">
          {contactLinks.map((contact, i) => (
            <motion.a
              key={contact.label}
              href={contact.link}
              target={contact.label !== "Email" ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass rounded-[2rem] p-8 border border-white/10 hover:border-[#ff003c]/40 hover:shadow-[0_10px_30px_rgba(255,0,60,0.15)] transition-all duration-500 text-center group cursor-pointer relative overflow-hidden interactive"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[#ff003c]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="relative z-10 transition-transform duration-500 group-hover:-translate-y-2">
                {getIcon(contact.id)}
              </div>
              <p className="font-bold text-white mb-2 group-hover:text-[#ff003c] transition-colors relative z-10 tracking-widest uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {contact.label}
              </p>
              <p className="text-white/40 text-xs group-hover:text-white transition-colors relative z-10 font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {contact.label === "Email" ? developer.email : `@${contact.label.toLowerCase()}`}
              </p>
            </motion.a>
          ))}
        </div>

        {/* Direct info card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="glass-strong rounded-[2rem] p-8 md:p-12 border border-[#ff003c]/20 relative overflow-hidden interactive"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#ff003c]/10 to-transparent pointer-events-none" />
          <p className="text-white/80 text-sm md:text-base mb-8 tracking-widest font-bold uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Ready to build something remarkable?
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-5 relative z-10">
            <a
              href={`mailto:${developer.email}`}
              className="w-full sm:w-auto px-10 py-4 rounded-full font-black text-xs tracking-[0.3em] uppercase text-white bg-[#ff003c] hover:bg-white hover:text-black transition-colors duration-300 shadow-[0_0_20px_rgba(255,0,60,0.3)] text-center"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Send Email
            </a>
            <a
              href={developer.resumeFile}
              download="Shivam_Raj_CV.pdf"
              className="w-full sm:w-auto px-10 py-4 rounded-full font-bold text-xs tracking-[0.3em] uppercase text-white border border-[#ff003c]/40 hover:bg-[#ff003c]/10 transition-colors duration-300 text-center"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Download CV
            </a>
          </div>
          <p className="mt-8 text-white/40 text-xs tracking-widest font-bold relative z-10 uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {developer.phone}
          </p>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-left text-white/30 text-[10px] font-bold tracking-[0.2em] uppercase mt-24 border-t border-white/10 pt-8"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          © {new Date().getFullYear()} Shivam Raj. All rights reserved.
        </motion.p>
      </div>
    </section>
  );
}
