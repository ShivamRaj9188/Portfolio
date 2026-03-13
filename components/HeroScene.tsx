"use client";
import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Torus, Box, Sphere, Line } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { developer } from "@/data/portfolio";

// Dense starfield using BufferGeometry
function Starfield({ count = 5000 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 200;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 200;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 200;
      siz[i] = Math.random() * 1.5 + 0.5;
    }
    return [pos, siz];
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.005;
      pointsRef.current.rotation.x += delta * 0.002;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        sizeAttenuation
        color="#a0d8ef"
        transparent
        opacity={0.6}
        vertexColors={false}
      />
    </points>
  );
}

// Nebula cloud cluster
function Nebula() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const count = 1500;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = Math.random() * 30 + 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.4;
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.003;
  });

  return (
    <points ref={ref} position={[0, 0, -30]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.4} color="#ff1a53" transparent opacity={0.15} sizeAttenuation />
    </points>
  );
}

// Floating wireframe cube
function FloatingCube({ position, color, speed }: { position: [number, number, number]; color: string; speed: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * speed;
      ref.current.rotation.y += delta * speed * 0.7;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <Box ref={ref} args={[0.6, 0.6, 0.6]} position={position}>
        <meshPhongMaterial color={color} wireframe />
      </Box>
    </Float>
  );
}

// Rotating torus ring
function TorusRing({ position, color, radius }: { position: [number, number, number]; color: string; radius: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.3;
      ref.current.rotation.z += delta * 0.2;
    }
  });
  return (
    <Torus ref={ref} args={[radius, 0.04, 16, 60]} position={position}>
      <meshPhongMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.7} />
    </Torus>
  );
}

// Neural network node
function NeuralNode({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 2 + position[0]) * 0.15);
    }
  });
  return (
    <Sphere ref={ref} args={[0.12, 16, 16]} position={position}>
      <meshPhongMaterial color={color} emissive={color} emissiveIntensity={0.8} />
    </Sphere>
  );
}

// Neural connections
function NeuralConnections() {
  const nodes: [number, number, number][] = [
    [-2, 1, -2], [0, 2, -3], [2, 0.5, -2],
    [-1.5, -1, -2], [1.5, -1, -2.5], [0, -0.5, -1.5],
    [-3, 0, -3], [3, 1, -3], [0, 3, -4],
  ];
  const colors = ["#ff003c", "#ff1a53", "#ff0080", "#ffd700", "#ff003c", "#ff1a53", "#ff0080", "#ff003c", "#ff1a53"];

  return (
    <group>
      {nodes.map((pos, i) => (
        <NeuralNode key={i} position={pos} color={colors[i % colors.length]} />
      ))}
      {nodes.map((a, i) =>
        nodes.slice(i + 1, i + 3).map((b, j) => (
          <Line
            key={`${i}-${j}`}
            points={[a, b]}
            color="#ff003c"
            lineWidth={0.5}
            transparent
            opacity={0.3}
          />
        ))
      )}
    </group>
  );
}

// Camera drift
function CameraRig() {
  const { camera } = useThree();
  useFrame(({ clock }) => {
    camera.position.x = Math.sin(clock.elapsedTime * 0.1) * 1.5;
    camera.position.y = Math.cos(clock.elapsedTime * 0.08) * 0.8 + 0.5;
  });
  return null;
}

function HeroCanvas({ isMobile }: { isMobile: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8], fov: 75 }}
      gl={{ antialias: false, alpha: true }}
      style={{ position: "absolute", inset: 0 }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ff003c" />
      <directionalLight position={[-5, -5, -5]} intensity={0.4} color="#ff1a53" />
      <pointLight position={[0, 0, 2]} intensity={2} color="#ff003c" distance={20} />

      <Starfield count={isMobile ? 3000 : 8000} />
      <Nebula />
      <NeuralConnections />

      {/* Floating cubes */}
      <FloatingCube position={[-4, 2, -2]} color="#ff003c" speed={0.5} />
      <FloatingCube position={[4, -1, -3]} color="#ff1a53" speed={0.3} />
      <FloatingCube position={[-5, -2, -4]} color="#ff0080" speed={0.7} />
      <FloatingCube position={[5, 3, -5]} color="#ffd700" speed={0.4} />
      <FloatingCube position={[0, -3, -2]} color="#ff003c" speed={0.6} />
      <FloatingCube position={[3, 2, -1]} color="#ff0080" speed={0.35} />

      {/* Torus rings */}
      <TorusRing position={[-3, 0, -4]} color="#ff003c" radius={1.5} />
      <TorusRing position={[3, 1, -5]} color="#ff1a53" radius={2} />
      <TorusRing position={[0, -2, -3]} color="#ff0080" radius={1} />

      <CameraRig />
    </Canvas>
  );
}

export default function HeroScene({ isMobile }: { isMobile: boolean }) {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      <HeroCanvas isMobile={isMobile} />

      {/* Hero content overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="relative z-10 w-full h-full flex items-center justify-center px-6 pt-20 pointer-events-none"
      >
        
        <div className="flex flex-col items-center justify-center text-center">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="overflow-hidden mb-8"
          >
            <p className="text-[#ff003c] text-sm md:text-base tracking-[0.5em] uppercase font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Shivam Raj — Portfolio 2026
            </p>
          </motion.div>
 
          {/* Massive Stacked Title */}
          <div className="flex flex-col items-center justify-center relative">
            <motion.h1
              initial={{ y: 200, opacity: 0, filter: "blur(10px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="text-6xl md:text-[9vw] font-black uppercase leading-[0.85] text-white tracking-tighter"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              BUILDING
            </motion.h1>
            
            <motion.h1
              initial={{ y: 200, opacity: 0, filter: "blur(10px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              className="text-6xl md:text-[9vw] font-black uppercase leading-[0.85] text-transparent bg-clip-text bg-gradient-to-r from-[#ff003c] to-[#ff4d79] tracking-tighter"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              DIGITAL
            </motion.h1>
 
            <motion.h1
              initial={{ y: 200, opacity: 0, filter: "blur(10px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
              className="text-6xl md:text-[9vw] font-black uppercase leading-[0.85] text-white tracking-tighter"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              UNIVERSES
            </motion.h1>
          </div>

          {/* Sub description / CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.2 }}
            className="mt-16 flex flex-col items-center gap-6 pointer-events-auto"
          >
            <p className="text-white/50 max-w-lg text-sm md:text-base font-medium leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              I’m a selectively skilled Full Stack Developer & AI Enthusiast with a strong focus on producing high quality & impactful digital experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 pointer-events-auto">
              <button
                onClick={() => scrollTo("#projects")}
                className="px-10 py-5 rounded-full bg-white text-black font-black text-xs tracking-[0.3em] uppercase hover:scale-105 hover:bg-[#ff003c] hover:text-white transition-all duration-300 interactive shadow-[0_0_40px_rgba(255,0,60,0.3)]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Explore Work
              </button>
              
              <a
                href={developer.resumeFile}
                download="Shivam_Raj_CV.pdf"
                className="px-10 py-5 rounded-full border border-[#ff003c]/40 text-white font-black text-xs tracking-[0.3em] uppercase hover:scale-105 hover:bg-[#ff003c]/10 hover:border-[#ff003c] transition-all duration-300 interactive shadow-[0_0_40px_rgba(255,0,60,0.1)]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Download CV
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-[10px] text-white/30 tracking-widest font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            SCROLL
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-[2px] h-10 bg-gradient-to-b from-[#ff003c] to-transparent rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
