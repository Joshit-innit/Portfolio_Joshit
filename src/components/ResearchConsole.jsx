import { motion } from "framer-motion";
import { Activity, Database, GitBranch, LineChart } from "lucide-react";
import Revealer from "./Revealer.jsx";

const logs = [
  "loading analytics notebooks...",
  "extracting model signals...",
  "mapping business relevance...",
  "rendering project intelligence layer..."
];

const stats = [
  { label: "Project Systems", value: "12+", icon: GitBranch },
  { label: "Core Domain", value: "ML", icon: Activity },
  { label: "Data Workflows", value: "EDA", icon: Database },
  { label: "Visual Layer", value: "BI", icon: LineChart }
];

export default function ResearchConsole() {
  return (
    <section id="research-console" className="px-6 py-28">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <Revealer>
          <p className="text-xs font-semibold uppercase tracking-[0.36em] text-champagne/70">Research Mode</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">Open Research Console</h2>
          <p className="mt-6 text-lg leading-8 text-graphite">
            A compact intelligence panel for the portfolio: projects, model thinking, datasets, visual systems, and the engineering habits behind them.
          </p>
        </Revealer>
        <Revealer className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/35 p-5 shadow-luxe backdrop-blur-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_0%,rgba(110,231,249,0.14),transparent_38%)]" />
          <div className="relative flex items-center gap-2 border-b border-white/10 pb-4">
            <span className="h-3 w-3 rounded-full bg-red-400/80" />
            <span className="h-3 w-3 rounded-full bg-amber-300/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-300/80" />
            <span className="ml-4 text-xs uppercase tracking-[0.28em] text-white/45">joshit.system</span>
          </div>
          <div className="relative grid gap-4 py-5 md:grid-cols-4">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                <Icon size={18} className="text-champagne" />
                <p className="mt-5 text-3xl font-semibold text-white">{value}</p>
                <p className="mt-1 text-xs text-graphite">{label}</p>
              </div>
            ))}
          </div>
          <div className="relative space-y-3 rounded-2xl border border-white/10 bg-void/70 p-5 font-mono text-sm text-aurora/80">
            {logs.map((log, index) => (
              <motion.p key={log} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.18 }}>
                <span className="text-champagne">[{String(index + 1).padStart(2, "0")}]</span> {log}
              </motion.p>
            ))}
            <motion.div className="h-5 w-2 bg-champagne" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity }} />
          </div>
        </Revealer>
      </div>
    </section>
  );
}
