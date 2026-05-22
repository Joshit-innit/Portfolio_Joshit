import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function CursorGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const smoothX = useSpring(x, { stiffness: 80, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const move = (event) => {
      x.set(event.clientX - 160);
      y.set(event.clientY - 160);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed z-[70] hidden h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(245,223,184,0.14),rgba(110,231,249,0.08)_34%,transparent_66%)] blur-xl md:block"
      style={{ x: smoothX, y: smoothY }}
    />
  );
}
