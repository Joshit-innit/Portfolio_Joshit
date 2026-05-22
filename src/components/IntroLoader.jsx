import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function IntroLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1450);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[120] grid place-items-center bg-void"
          exit={{ opacity: 0, filter: "blur(14px)" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 bg-radial-luxe opacity-80" />
          <div className="noise-layer absolute inset-0 opacity-[0.07]" />
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="relative text-center">
            <motion.div
              className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-champagne/30 bg-white/[0.04] text-xl font-bold text-white backdrop-blur-2xl"
              animate={{ boxShadow: ["0 0 0 rgba(245,223,184,0)", "0 0 70px rgba(245,223,184,0.32)", "0 0 0 rgba(245,223,184,0)"] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            >
              JT
            </motion.div>
            <p className="mt-7 text-xs uppercase tracking-[0.42em] text-champagne/80">Initializing Intelligence Systems</p>
            <div className="mx-auto mt-6 h-px w-72 overflow-hidden rounded-full bg-white/10">
              <motion.div className="h-full bg-gradient-to-r from-champagne via-aurora to-iris" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 1.25, ease: "easeInOut" }} />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
