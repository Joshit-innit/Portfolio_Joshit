import { motion } from "framer-motion";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import AmbientBackground from "../components/AmbientBackground.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { useProjects } from "../hooks.js";

export default function Projects() {
  const { projects, loading } = useProjects();

  return (
    <>
      <AmbientBackground />
      <section className="px-6 pb-24 pt-36">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Projects" title="A cinematic archive of systems and signals." copy="Each project is built around a practical data question: what matters, why it matters, and how a model or analysis can make it legible." />
          {loading ? (
            <p className="text-center text-graphite">Loading project archive...</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
            </div>
          )}
        </div>
      </section>
      <section className="relative overflow-hidden px-6 py-28">
        <motion.div animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.8, 0.45] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-champagne/10 blur-3xl" />
        <div className="relative mx-auto max-w-5xl text-center">
          <p className="text-4xl font-semibold leading-tight tracking-tight text-white md:text-7xl">
            “I am still cooking a lot of stuff, stay tuned to taste the aroma.”
          </p>
          <Link to="/" className="mt-10 inline-flex items-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-semibold text-void transition hover:bg-champagne">
            <Home size={17} /> Back to Home
          </Link>
        </div>
      </section>
    </>
  );
}
