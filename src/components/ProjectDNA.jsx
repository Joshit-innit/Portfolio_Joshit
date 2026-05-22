import { motion } from "framer-motion";

const axes = ["Complexity", "ML Depth", "Visualization", "Data Scale", "Business Impact"];

export default function ProjectDNA({ project }) {
  const values = axes.map((axis, index) => {
    const seed = project.title.length + project.techStack.length * 9 + index * 13;
    return 46 + (seed % 42);
  });

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 shadow-luxe backdrop-blur-2xl">
      <p className="text-xs uppercase tracking-[0.32em] text-champagne/70">Project DNA</p>
      <div className="mt-8 space-y-5">
        {axes.map((axis, index) => (
          <div key={axis}>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-platinum">{axis}</span>
              <span className="text-graphite">{values[index]}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-champagne via-aurora to-iris"
                initial={{ width: 0 }}
                whileInView={{ width: `${values[index]}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
