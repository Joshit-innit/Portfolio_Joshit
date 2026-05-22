import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Tilt from "react-parallax-tilt";
import { Link } from "react-router-dom";

export default function ProjectCard({ project, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Tilt tiltMaxAngleX={6} tiltMaxAngleY={6} glareEnable glareMaxOpacity={0.08} glareColor="#ffffff" glarePosition="all" transitionSpeed={1400}>
        <Link to={`/projects/${project.id}`} className="group relative block overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-4 shadow-luxe backdrop-blur-2xl">
          <div className="absolute inset-0 rounded-[2rem] opacity-0 transition duration-500 group-hover:opacity-100">
            <div className="absolute inset-px rounded-[1.95rem] bg-gradient-to-br from-champagne/20 via-aurora/10 to-iris/20 blur-xl" />
          </div>
          <div className="absolute -inset-24 translate-x-[-80%] rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition duration-1000 group-hover:translate-x-[80%]" />
          <div className="relative overflow-hidden rounded-[1.45rem] border border-white/10 bg-obsidian">
            <motion.img layoutId={`project-image-${project.id}`} src={project.image} alt="" className="h-56 w-full bg-void object-contain transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-void via-void/10 to-transparent" />
            <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/25 px-3 py-1 text-xs text-champagne backdrop-blur-xl">{project.category}</div>
            <div className="absolute inset-x-4 bottom-4 flex translate-y-4 items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3 opacity-0 backdrop-blur-xl transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <span className="text-sm font-medium text-white">Click to Explore</span>
              <ArrowUpRight size={17} className="text-champagne" />
            </div>
          </div>
          <div className="relative p-4">
            <h3 className="text-2xl font-semibold tracking-tight text-white">{project.title}</h3>
            <p className="mt-3 line-clamp-2 text-sm leading-6 text-graphite">{project.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.techStack.slice(0, 4).map((tech) => (
                <span key={tech} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-platinum/80">{tech}</span>
              ))}
            </div>
          </div>
        </Link>
      </Tilt>
    </motion.div>
  );
}
