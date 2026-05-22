import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Points, PointMaterial } from "@react-three/drei";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";

function ParticleField() {
  const ref = useRef();
  const positions = useMemo(() => {
    const particles = new Float32Array(900);
    for (let i = 0; i < particles.length; i += 3) {
      particles[i] = (Math.random() - 0.5) * 8;
      particles[i + 1] = (Math.random() - 0.5) * 5;
      particles[i + 2] = (Math.random() - 0.5) * 4;
    }
    return particles;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.025;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.08;
  });

  return (
    <Float speed={0.75} rotationIntensity={0.15} floatIntensity={0.35}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#f5dfb8" size={0.012} sizeAttenuation depthWrite={false} opacity={0.42} />
      </Points>
    </Float>
  );
}

export default function LivingBackground() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 45, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 45, damping: 20 });

  useEffect(() => {
    const move = (event) => {
      x.set((event.clientX / window.innerWidth - 0.5) * 34);
      y.set((event.clientY / window.innerHeight - 0.5) * 34);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-radial-luxe">
      <div className="absolute inset-0 opacity-50">
        <Canvas camera={{ position: [0, 0, 4.5], fov: 55 }} dpr={[1, 1.5]} gl={{ antialias: false, alpha: true }}>
          <ParticleField />
        </Canvas>
      </div>
      <motion.div
        className="absolute left-1/2 top-[-18rem] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-aurora/10 blur-3xl"
        animate={{ x: [-110, 90, -110], y: [0, 70, 0], scale: [1, 1.14, 1] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-20rem] right-[-8rem] h-[38rem] w-[38rem] rounded-full bg-iris/15 blur-3xl"
        animate={{ x: [0, -140, 0], y: [0, -90, 0], scale: [1.05, 0.9, 1.05] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[12%] top-[34%] h-[28rem] w-[28rem] rounded-full bg-champagne/8 blur-3xl"
        style={{ x: smoothX, y: smoothY }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.11]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.72)_72%)]" />
      <div className="noise-layer absolute inset-0 opacity-[0.055]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,transparent,rgba(0,0,0,0.38)_55%,rgba(0,0,0,0.75)_100%)]" />
    </div>
  );
}
