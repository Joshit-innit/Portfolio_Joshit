import { MotionConfig } from "motion/react";
import Archive from "./components/sections/Archive.jsx";
import Contact from "./components/sections/Contact.jsx";
import Faq from "./components/sections/Faq.jsx";
import Hero from "./components/sections/Hero.jsx";
import Skills from "./components/sections/Skills.jsx";
import Work from "./components/sections/Work.jsx";
import { Morph } from "./components/motion.jsx";

export default function App() {
  return (
    // reducedMotion="user": transform animations are skipped for people who ask for less motion
    <MotionConfig reducedMotion="user">
      <a href="#work" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-gold focus:px-3 focus:py-2 focus:text-ink">
        Skip to projects
      </a>
      <Hero />
      <main>
        <Morph><Work /></Morph>
        <Morph className="bg-surface"><Archive /></Morph>
        <Morph><Skills /></Morph>
        <Morph className="bg-surface"><Faq /></Morph>
      </main>
      <Morph exit={false}><Contact /></Morph>
    </MotionConfig>
  );
}
