import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, Brain, Code2, Database, LineChart, Sparkles, TerminalSquare } from "lucide-react";
import AmbientBackground from "../components/AmbientBackground.jsx";
import AnimatedText from "../components/AnimatedText.jsx";
import MagneticLink from "../components/MagneticLink.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import ResearchConsole from "../components/ResearchConsole.jsx";
import Revealer from "../components/Revealer.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { useProjects } from "../hooks.js";

const interests = ["Machine Learning", "Data Analytics", "Python Development", "Data Visualization", "AI Systems", "Problem Solving", "DSA"];
const skills = [
  { title: "Programming", icon: Code2, items: ["Python", "Java", "C", "SQL"] },
  { title: "Data Analytics", icon: LineChart, items: ["Pandas", "NumPy", "EDA", "Statistics"] },
  { title: "Machine Learning", icon: Brain, items: ["Scikit-learn", "XGBoost", "Models", "Evaluation"] },
  { title: "Databases", icon: Database, items: ["SQL", "Data modeling", "Queries", "Cleaning"] },
  { title: "Visualization", icon: Sparkles, items: ["Matplotlib", "Power BI", "Tableau", "Seaborn"] },
  { title: "Tools", icon: TerminalSquare, items: ["Git", "GitHub", "Jupyter", "Vite"] }
];

export default function Home() {
  const { projects, loading } = useProjects();
  const preview = projects.slice(0, 3);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0.2]);
  const heroScale = useTransform(scrollYProgress, [0, 0.18], [1, 0.94]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, -180]);

  return (
    <>
      <AmbientBackground />
      <section className="chapter chapter-hero relative flex min-h-screen items-center px-6 pb-20 pt-36">
        <motion.div style={{ y: orbY }} className="absolute right-[8%] top-[18%] hidden h-64 w-64 rounded-full border border-champagne/20 bg-[radial-gradient(circle,rgba(245,223,184,0.12),transparent_62%)] blur-sm lg:block" />
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]">
          <motion.div style={{ opacity: heroOpacity, scale: heroScale }}>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-champagne backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-aurora shadow-[0_0_18px_rgba(110,231,249,0.9)]" />
              Data Analytics | Machine Learning | Intelligent Systems
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.95, delay: 0.1 }} className="max-w-5xl text-6xl font-semibold leading-[0.94] tracking-tight text-white md:text-8xl lg:text-9xl">
              <AnimatedText text="Joshit Tammana" />
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.24 }} className="mt-8 max-w-2xl text-lg leading-8 text-graphite md:text-xl">
              I study Computer Science and build intelligent systems shaped by machine learning, data analytics, AI systems, and disciplined problem solving.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.38 }} className="mt-10 flex flex-col gap-4 sm:flex-row">
              <MagneticLink to="/projects" className="group inline-flex items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-semibold text-void transition hover:bg-champagne">
                Explore Projects <ArrowRight size={17} className="transition group-hover:translate-x-1" />
              </MagneticLink>
              <MagneticLink href="#contact" className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-4 text-sm font-semibold text-white backdrop-blur-xl transition hover:border-champagne/50 hover:text-champagne">
                Contact Me
              </MagneticLink>
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9, rotateX: 12 }} animate={{ opacity: 1, scale: 1, rotateX: 0 }} transition={{ duration: 1.1, delay: 0.2 }} className="relative hidden min-h-[620px] lg:block">
            <div className="absolute inset-0 rounded-[3rem] border border-white/10 bg-white/[0.035] shadow-luxe backdrop-blur-2xl" />
            <div className="absolute inset-3 overflow-hidden rounded-[2.55rem]">
              <img src="/images/joshit-profile-luxury.png" alt="Joshit Tammana" className="h-full w-full object-cover object-[50%_42%]" />
              <div className="absolute inset-0 bg-gradient-to-t from-void via-void/10 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_34%,transparent_0%,rgba(5,5,5,0.18)_42%,rgba(5,5,5,0.68)_100%)]" />
              <div className="noise-layer absolute inset-0 opacity-[0.08]" />
            </div>
            <motion.div animate={{ y: [-18, 18, -18] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute left-8 top-9 w-72 rounded-[2rem] border border-white/10 bg-black/35 p-6 backdrop-blur-2xl">
              <p className="text-xs uppercase tracking-[0.28em] text-champagne/70">Current Focus</p>
              <p className="mt-4 text-3xl font-semibold text-white">Turning data into decisions.</p>
            </motion.div>
            <motion.div animate={{ y: [20, -20, 20] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-10 right-8 w-80 rounded-[2rem] border border-white/10 bg-black/35 p-6 backdrop-blur-2xl">
              <div className="grid grid-cols-3 gap-3">
                {["AI", "ML", "EDA", "SQL", "DSA", "BI"].map((item) => (
                  <span key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] py-5 text-center text-sm font-semibold text-white">{item}</span>
                ))}
              </div>
            </motion.div>
            <div className="absolute -right-10 top-24 h-80 w-80 rounded-full border border-champagne/20 bg-[radial-gradient(circle,rgba(245,223,184,0.18),transparent_58%)] blur-sm" />
          </motion.div>
        </div>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.8, repeat: Infinity }} className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-graphite md:flex">
          <span className="text-xs uppercase tracking-[0.3em]">Scroll</span>
          <ArrowDown size={18} />
        </motion.div>
      </section>

      <section className="px-6 pb-10 lg:hidden">
        <div className="mx-auto max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-3 shadow-luxe backdrop-blur-2xl">
          <img src="/images/joshit-profile-luxury.png" alt="Joshit Tammana" className="aspect-square w-full rounded-[1.45rem] object-cover object-[50%_38%]" />
        </div>
      </section>

      <section id="about" className="chapter chapter-about px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="About" title="A computer science mind with an analyst's eye." copy="I like systems that explain themselves: clean datasets, useful models, crisp visuals, and algorithms that make hard problems feel approachable." />
          <div className="grid gap-4 md:grid-cols-3">
            {interests.map((item, index) => (
              <Revealer key={item} delay={index * 0.04} className="group rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-champagne/30 hover:bg-white/[0.07]">
                <p className="text-xl font-semibold text-white">{item}</p>
                <div className="mt-6 h-px bg-gradient-to-r from-champagne/70 via-aurora/30 to-transparent" />
              </Revealer>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="chapter chapter-skills px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Skills" title="A refined toolkit for data-first engineering." />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {skills.map(({ title, icon: Icon, items }, index) => (
              <Revealer key={title} delay={index * 0.05} className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-2xl transition hover:-translate-y-1 hover:border-champagne/35">
                <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                  <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-aurora/15 blur-3xl" />
                </div>
                <Icon className="relative text-champagne" size={28} />
                <h3 className="relative mt-6 text-2xl font-semibold text-white">{title}</h3>
                <div className="relative mt-5 flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span key={skill} className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-platinum/80">{skill}</span>
                  ))}
                </div>
              </Revealer>
            ))}
          </div>
        </div>
      </section>

      <section id="why" className="chapter chapter-why px-6 py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <Revealer>
            <p className="text-xs font-semibold uppercase tracking-[0.36em] text-champagne/70">Why I Build</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">Data feels powerful when it becomes understanding.</h2>
          </Revealer>
          <Revealer className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-8 text-lg leading-9 text-graphite shadow-luxe backdrop-blur-2xl md:p-10">
            <p>
              I am drawn to machine learning because it sits between curiosity and consequence. A dataset can look ordinary at first, but with the right questions it starts revealing behavior, risk, opportunity, and human decisions.
            </p>
            <p className="mt-6">
              The engineer I want to become is someone who can move from messy information to reliable systems: analytical enough to measure, creative enough to visualize, and disciplined enough to build tools people can trust.
            </p>
          </Revealer>
        </div>
      </section>

      <ResearchConsole />

      <section className="chapter chapter-work px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Selected Work" title="Explore My Work" copy="A preview of projects across analytics, machine learning, finance, healthcare, retail, and intelligent decision systems." />
          {loading ? <p className="text-center text-graphite">Loading projects...</p> : <div className="grid gap-6 md:grid-cols-3">{preview.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}</div>}
        </div>
      </section>
    </>
  );
}
