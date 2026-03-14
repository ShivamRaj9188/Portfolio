"use client";
import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

function ExplosionParticles({ isExploding, onComplete }: { isExploding: boolean; onComplete: () => void }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 3000; // Optimized
  const positions = useMemo(() => new Float32Array(count * 3), []);
  const velocities = useMemo(() => {
    const v = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const speed = Math.random() * 4 + 1.2;
        v[i * 3] = speed * Math.sin(phi) * Math.cos(theta);
        v[i * 3 + 1] = speed * Math.sin(phi) * Math.sin(theta);
        v[i * 3 + 2] = speed * Math.cos(phi);
    }
    return v;
  }, []);

  const [hasTriggeredComplete, setHasTriggeredComplete] = useState(false);
  const startTime = useRef(0);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    
    if (isExploding) {
      if (startTime.current === 0) startTime.current = state.clock.elapsedTime;
      const elapsed = state.clock.elapsedTime - startTime.current;

      const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        const factor = delta * (1 + elapsed * 1.5) * 100;
        pos[i * 3] += velocities[i * 3] * factor;
        pos[i * 3 + 1] += velocities[i * 3 + 1] * factor;
        pos[i * 3 + 2] += velocities[i * 3 + 2] * factor;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.rotation.y += delta * 0.03;

      const mat = pointsRef.current.material as THREE.PointsMaterial;
      if (elapsed > 1.2) {
        mat.opacity = Math.max(0, 1 - (elapsed - 1.2) * 0.6);
      }

      if (elapsed > 1.8 && !hasTriggeredComplete) {
        setHasTriggeredComplete(true);
        onComplete();
      }
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        color="#ff003c"
        transparent
        opacity={1}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function DispersingPlanets({ isExploding }: { isExploding: boolean }) {
  const count = 15; // Optimized
  const planets = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      velocity: [(Math.random() - 0.5) * 7, (Math.random() - 0.5) * 7, (Math.random() - 0.5) * 7] as [number, number, number],
      rotationVelocity: [Math.random() * 0.2, Math.random() * 0.2, Math.random() * 0.2] as [number, number, number],
      type: i % 3,
      size: Math.random() * 0.4 + 0.2,
      color: i % 2 === 0 ? "#ff003c" : "#ffffff"
    }));
  }, []);

  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const startTime = useRef(0);

  useFrame((state, delta) => {
    if (isExploding) {
      if (startTime.current === 0) startTime.current = state.clock.elapsedTime;
      const elapsed = state.clock.elapsedTime - startTime.current;

      refs.current.forEach((ref, i) => {
        if (!ref) return;
        const p = planets[i];
        const factor = (1 + elapsed * 5) * 140;
        ref.position.x = p.velocity[0] * factor * delta + ref.position.x;
        ref.position.y = p.velocity[1] * factor * delta + ref.position.y;
        ref.position.z = p.velocity[2] * factor * delta + ref.position.z;
        ref.rotation.x += p.rotationVelocity[0] * 40 * delta;
        ref.rotation.y += p.rotationVelocity[1] * 40 * delta;

        const mat = ref.material as THREE.MeshPhongMaterial;
        if (elapsed > 1.0) {
          mat.opacity = Math.max(0, 1 - (elapsed - 1.0) * 1.5);
        }
      });
    }
  });

  return (
    <group>
      {planets.map((p, i) => (
        <mesh key={i} ref={(el) => (refs.current[i] = el)}>
          {p.type === 0 && <sphereGeometry args={[p.size, 8, 8]} />}
          {p.type === 1 && <boxGeometry args={[p.size, p.size, p.size]} />}
          {p.type === 2 && <torusGeometry args={[p.size, 0.04, 8, 16]} />}
          <meshPhongMaterial color={p.color} transparent opacity={1} emissive={p.color} emissiveIntensity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

export default function BigBangLoader({ onEnter }: { onEnter: () => void }) {
  const [isExploding, setIsExploding] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);

  const handleInitiate = () => {
    // Flash first, then explode
    setIsFlashing(true);
    setTimeout(() => {
      setIsExploding(true);
    }, 300); // Particles start 300ms after flash
  };

  return (
    <motion.div 
      className="fixed inset-0 z-[200] bg-black flex items-center justify-center overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
    >
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Canvas 
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 15] }}
          gl={{ antialias: false }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[0, 0, 0]} intensity={2.5} color="#ffffff" />
          <ExplosionParticles isExploding={isExploding} onComplete={onEnter} />
          <DispersingPlanets isExploding={isExploding} />
        </Canvas>
      </div>

      <AnimatePresence>
        {!isExploding && (
          <motion.div 
            className="z-50 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 2 }}
            transition={{ duration: 0.8 }}
          >
            <button 
              onClick={handleInitiate}
              className="group relative flex flex-col items-center justify-center cursor-pointer p-10"
            >
              {/* Outer Pulse Ring */}
              <div className="absolute w-24 h-24 rounded-full border border-white/10 animate-ping group-hover:border-[#ff003c]/30" />
              
              {/* Central Core Dot */}
              <div className="relative w-6 h-6 rounded-full bg-white shadow-[0_0_30px_rgba(255,255,255,0.8)] group-hover:bg-[#ff003c] group-hover:shadow-[0_0_50px_rgba(255,0,60,1)] transition-all duration-500 scale-100 group-hover:scale-125" />
              
              <div className="mt-12 flex flex-col items-center gap-1">
                <span className="text-white text-[10px] tracking-[1.2em] font-black uppercase opacity-40 group-hover:opacity-100 transition-opacity">
                  Initiate
                </span>
                <span className="text-[#ff003c] text-[8px] tracking-[0.6em] font-black uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                  Universe
                </span>
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-screen flash */}
      <AnimatePresence>
        {isFlashing && (
          <motion.div
            key="flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.6, times: [0, 0.1, 0.3, 1] }}
            onAnimationComplete={() => setIsFlashing(false)}
            className="absolute inset-0 z-[100] pointer-events-none"
            style={{
              background: "radial-gradient(circle, #ffffff, #ff003c44)",
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
