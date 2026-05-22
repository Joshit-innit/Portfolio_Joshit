import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Brain, Code2, Home, Mail, PanelsTopLeft, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const dock = [
  { label: "Home", icon: Home, to: "/" },
  { label: "About", icon: Brain, href: "/#about" },
  { label: "Skills", icon: Code2, href: "/#skills" },
  { label: "Projects", icon: PanelsTopLeft, to: "/projects" },
  { label: "Console", icon: Sparkles, href: "/#research-console" },
  { label: "Contact", icon: Mail, href: "/#contact" }
];

export default function FloatingDock() {
  const location = useLocation();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? latest;
    setHidden(latest > previous && latest > 260);
  });

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: hidden ? 100 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-5 left-1/2 z-50 hidden -translate-x-1/2 rounded-full border border-white/10 bg-void/55 px-3 py-2 shadow-luxe backdrop-blur-2xl md:flex"
    >
      {dock.map(({ label, icon: Icon, to, href }) => {
        const active = to && location.pathname === to;
        const className = `group relative grid h-12 w-12 place-items-center rounded-full transition ${active ? "bg-white text-void" : "text-graphite hover:text-champagne"}`;
        const content = (
          <>
            <Icon size={18} />
            <span className="pointer-events-none absolute -top-10 rounded-full border border-white/10 bg-black/70 px-3 py-1 text-xs text-white opacity-0 backdrop-blur-xl transition group-hover:opacity-100">{label}</span>
          </>
        );
        return to ? (
          <motion.div key={label} whileHover={{ y: -7, scale: 1.12 }}>
            <Link to={to} className={className}>{content}</Link>
          </motion.div>
        ) : (
          <motion.div key={label} whileHover={{ y: -7, scale: 1.12 }}>
            <a href={href} className={className}>{content}</a>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
