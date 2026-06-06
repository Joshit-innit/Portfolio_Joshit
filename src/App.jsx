import Lenis from "lenis";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import CursorGlow from "./components/CursorGlow.jsx";
import FloatingDock from "./components/FloatingDock.jsx";
import Footer from "./components/Footer.jsx";
import IntroLoader from "./components/IntroLoader.jsx";
import Navbar from "./components/Navbar.jsx";
import StoryProgress from "./components/StoryProgress.jsx";
import Home from "./pages/Home.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import Projects from "./pages/Projects.jsx";

export default function App() {
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.45,
      smoothWheel: true,
      wheelMultiplier: 0.72,
      touchMultiplier: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });
    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-void text-platinum selection:bg-champagne selection:text-void">
      <IntroLoader />
      <CursorGlow />
      <motion.div className="fixed left-0 top-0 z-[80] h-px origin-left bg-gradient-to-r from-champagne via-aurora to-iris" style={{ scaleX }} />
      <Navbar />
      <StoryProgress />
      <FloatingDock />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -18, filter: "blur(10px)" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
