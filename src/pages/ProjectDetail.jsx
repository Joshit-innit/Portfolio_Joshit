import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import AmbientBackground from "../components/AmbientBackground.jsx";
import CaseStudySections from "../components/CaseStudySections.jsx";
import MagneticLink from "../components/MagneticLink.jsx";
import ProjectDNA from "../components/ProjectDNA.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { getCaseStudy } from "../data/caseStudies.js";
import { useProject } from "../hooks.js";

export default function ProjectDetail() {
  const { id } = useParams();
  const { project, loading } = useProject(id);

  if (loading) {
    return <div className="min-h-screen px-6 pt-40 text-center text-graphite">Loading project...</div>;
  }

  if (!project) {
    return <div className="min-h-screen px-6 pt-40 text-center text-graphite">Project not found.</div>;
  }

  const caseStudy = getCaseStudy(project);

  return (
    <>
      <AmbientBackground />
      <section className="chapter px-6 pb-20 pt-36">
        <div className="mx-auto max-w-7xl">
          <Link to="/projects" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-graphite transition hover:text-champagne">
            <ArrowLeft size={16} /> Back to Projects
          </Link>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <motion.span initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="inline-flex rounded-full border border-champagne/25 bg-champagne/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-champagne">
                {project.category}
              </motion.span>
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-6 text-5xl font-semibold leading-none tracking-tight text-white md:text-8xl">
                {project.title}
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-7 max-w-2xl text-lg leading-8 text-graphite">
                {caseStudy.tagline}
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }} className="mt-8 flex flex-wrap gap-3">
                <MagneticLink href={project.github} external className="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-void transition hover:bg-champagne">
                  Repository <ExternalLink size={15} />
                </MagneticLink>
                <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.045] px-5 py-3 text-sm text-platinum/80 backdrop-blur-xl">{caseStudy.modelFamily}</span>
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.75 }} className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-3 shadow-luxe backdrop-blur-xl">
              <motion.img layoutId={`project-image-${project.id}`} src={project.image} alt="" className="h-[420px] w-full rounded-[1.45rem] bg-void object-contain" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="chapter px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <SectionHeader eyebrow="Purpose" title="Research brief" copy={project.purpose} />
          </div>
          <ProjectDNA project={project} />
        </div>
      </section>

      <CaseStudySections project={project} caseStudy={caseStudy} />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <MagneticLink href={project.github} external className="inline-flex items-center rounded-full bg-white px-6 py-4 text-sm font-semibold text-void transition hover:bg-champagne">
              Open Repository <ExternalLink size={16} />
            </MagneticLink>
            <MagneticLink to="/projects" className="inline-flex items-center rounded-full border border-white/15 px-6 py-4 text-sm font-semibold text-white transition hover:border-champagne/50 hover:text-champagne">
              Back to Projects
            </MagneticLink>
          </div>
        </div>
      </section>
    </>
  );
}
