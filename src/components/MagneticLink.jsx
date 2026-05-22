import { motion, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-router-dom";

export default function MagneticLink({ to, href, children, className = "", external = false }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 16 });
  const springY = useSpring(y, { stiffness: 180, damping: 16 });
  const Component = to ? Link : "a";

  const move = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.18);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.18);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div style={{ x: springX, y: springY }} onPointerMove={move} onPointerLeave={reset}>
      <Component to={to} href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} className={`magnetic-button ${className}`}>
        <span className="relative z-10 inline-flex items-center gap-3">{children}</span>
      </Component>
    </motion.div>
  );
}
