import { motion, useScroll, useSpring } from "framer-motion";

const chapters = ["Hero", "About", "Skills", "Why", "Work", "Contact"];

export default function StoryProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  return (
    <div className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 items-center gap-4 xl:flex">
      <div className="relative h-64 w-px overflow-hidden rounded-full bg-white/10">
        <motion.div className="absolute inset-x-0 top-0 origin-top bg-gradient-to-b from-champagne via-aurora to-iris" style={{ scaleY }} />
      </div>
      <div className="space-y-3">
        {chapters.map((chapter) => (
          <div key={chapter} className="text-[10px] uppercase tracking-[0.24em] text-white/35">{chapter}</div>
        ))}
      </div>
    </div>
  );
}
