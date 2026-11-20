import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export const ease = [0.22, 1, 0.36, 1];

/** Scroll morph: the panel grows from a rounded card to full bleed as it enters, and shrinks back as it leaves. */
export function Morph({ children, className = "", enter = true, exit = true }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: inP } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const { scrollYProgress: outP } = useScroll({ target: ref, offset: ["end end", "end start"] });
  // 0 = full bleed, 1 = fully morphed into a card; whichever edge is further off-screen wins
  const t = useTransform([inP, outP], ([a, b]) => Math.max(enter ? 1 - a : 0, exit ? b : 0));
  const scale = useTransform(t, [0, 1], [1, 0.86]);
  const borderRadius = useTransform(t, [0, 1], [0, 72]);
  // grow from the top edge, shrink toward the bottom edge, so tall sticky sections don't drift
  const transformOrigin = useTransform(inP, (a) => (a < 1 ? "50% 0%" : "50% 100%"));

  return (
    // overflow-clip (not hidden) so sticky children inside keep working
    <motion.div ref={ref} style={reduce ? undefined : { scale, borderRadius, transformOrigin }} className={`overflow-clip ${className}`}>
      {children}
    </motion.div>
  );
}
