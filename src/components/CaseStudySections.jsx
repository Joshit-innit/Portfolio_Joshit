import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, FlaskConical, GitBranch, LineChart, Network, TerminalSquare } from "lucide-react";
import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart as ReLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { getChartSeries } from "../data/caseStudies.js";
import Revealer from "./Revealer.jsx";
import SectionHeader from "./SectionHeader.jsx";

const tooltipStyle = {
  background: "rgba(5,5,5,0.86)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "16px",
  color: "#e8eef5",
  boxShadow: "0 20px 70px rgba(0,0,0,0.45)",
  backdropFilter: "blur(16px)"
};

function ResearchToggle({ enabled, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`group inline-flex items-center gap-3 rounded-full border px-5 py-3 text-sm font-semibold transition ${enabled ? "border-champagne/60 bg-champagne text-void" : "border-white/15 bg-white/[0.045] text-white hover:border-champagne/50"}`}
    >
      <TerminalSquare size={16} />
      {enabled ? "Exit Research Mode" : "Enter Research Mode"}
    </button>
  );
}

function TechnicalChart({ type }) {
  const data = getChartSeries(type);
  const keys = Object.keys(data[0]).filter((key) => key !== "name");
  const Chart = type === "regression" ? AreaChart : type === "product" ? BarChart : ReLineChart;

  return (
    <div className="h-80 rounded-[2rem] border border-white/10 bg-black/30 p-5 shadow-luxe backdrop-blur-2xl">
      <ResponsiveContainer width="100%" height="100%">
        <Chart data={data}>
          <defs>
            <linearGradient id="caseGold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f5dfb8" stopOpacity={0.75} />
              <stop offset="100%" stopColor="#f5dfb8" stopOpacity={0.03} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
          <XAxis dataKey="name" stroke="rgba(232,238,245,0.52)" tickLine={false} axisLine={false} fontSize={12} />
          <YAxis stroke="rgba(232,238,245,0.35)" tickLine={false} axisLine={false} fontSize={12} />
          <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "rgba(245,223,184,0.25)" }} />
          {type === "regression" ? (
            <>
              <Area type="monotone" dataKey="R2" stroke="#f5dfb8" fill="url(#caseGold)" strokeWidth={3} />
              <Line type="monotone" dataKey="Error" stroke="#6ee7f9" strokeWidth={3} dot={{ r: 4, fill: "#6ee7f9" }} />
            </>
          ) : type === "product" ? (
            <>
              <Bar dataKey="Value" fill="#f5dfb8" radius={[12, 12, 4, 4]} />
              <Bar dataKey="Confidence" fill="#6ee7f9" radius={[12, 12, 4, 4]} />
            </>
          ) : (
            keys.map((key, index) => (
              <Line key={key} type="monotone" dataKey={key} stroke={["#f5dfb8", "#6ee7f9", "#a78bfa", "#e8eef5"][index % 4]} strokeWidth={3} dot={{ r: 4 }} />
            ))
          )}
        </Chart>
      </ResponsiveContainer>
    </div>
  );
}

function WorkflowCard({ step, index, researchMode }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <motion.div layout className="relative rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-2xl">
      <button type="button" onClick={() => setOpen(!open)} className="flex w-full items-start justify-between gap-4 text-left">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-champagne/70">Step {String(index + 1).padStart(2, "0")}</p>
          <h3 className="mt-2 text-xl font-semibold text-white">{step.title}</h3>
        </div>
        <ChevronDown className={`mt-2 text-graphite transition ${open ? "rotate-180" : ""}`} size={18} />
      </button>
      <AnimatePresence>
        {open ? (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <p className="mt-4 leading-7 text-graphite">{step.detail}</p>
            {researchMode ? <p className="mt-4 rounded-2xl border border-aurora/20 bg-aurora/5 p-4 font-mono text-xs leading-6 text-aurora/80">{step.research}</p> : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

function ArchitectureDiagram({ nodes }) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-luxe backdrop-blur-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(110,231,249,0.12),transparent_35%),radial-gradient(circle_at_80%_100%,rgba(245,223,184,0.12),transparent_34%)]" />
      <div className="relative grid gap-4 md:grid-cols-3">
        {nodes.map((node, index) => (
          <motion.div
            key={node}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 }}
            className="group relative rounded-2xl border border-white/10 bg-black/30 p-5 backdrop-blur-xl"
          >
            <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-champagne/10 blur-2xl opacity-0 transition group-hover:opacity-100" />
            <Network size={20} className="text-champagne" />
            <p className="mt-5 font-semibold text-white">{node}</p>
            {index < nodes.length - 1 ? <div className="absolute -right-4 top-1/2 hidden h-px w-8 bg-gradient-to-r from-champagne to-aurora md:block" /> : null}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function TechEcosystem({ techStack }) {
  const groups = useMemo(() => {
    const map = {
      ML: techStack.filter((tech) => /scikit|xgboost|regression|forest|tf-idf|cosine/i.test(tech)),
      Analytics: techStack.filter((tech) => /pandas|numpy|sql|power|tableau/i.test(tech)),
      Visualization: techStack.filter((tech) => /matplotlib|seaborn|recharts|power|tableau/i.test(tech)),
      Engineering: techStack.filter((tech) => /react|node|spring|firebase|git|vite|java/i.test(tech))
    };
    return Object.entries(map).filter(([, items]) => items.length);
  }, [techStack]);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {groups.map(([group, items], index) => (
        <motion.div
          key={group}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.07 }}
          className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl"
        >
          <p className="text-sm uppercase tracking-[0.28em] text-champagne/70">{group}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {items.map((item) => (
              <span key={item} className="rounded-full border border-white/10 bg-black/25 px-4 py-2 text-sm text-platinum/85 transition hover:border-champagne/40 hover:text-champagne">{item}</span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function CaseStudySections({ project, caseStudy }) {
  const [researchMode, setResearchMode] = useState(false);

  return (
    <>
      <section className="chapter px-6 py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.36em] text-champagne/70">Case Study Mode</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">Research-grade project breakdown</h2>
          </div>
          <ResearchToggle enabled={researchMode} onChange={setResearchMode} />
        </div>
      </section>

      <section className="chapter px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Story" title="Why this project exists" />
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <Revealer className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-8 leading-8 text-graphite shadow-luxe backdrop-blur-2xl">
              {caseStudy.story.map((paragraph) => (
                <p key={paragraph} className="mb-5 last:mb-0">{paragraph}</p>
              ))}
              {researchMode ? <p className="mt-6 rounded-2xl border border-champagne/20 bg-champagne/5 p-4 font-mono text-xs text-champagne/85">{caseStudy.repositoryEvidence}</p> : null}
            </Revealer>
            <Revealer>
              <TechnicalChart type={caseStudy.chartType} />
            </Revealer>
          </div>
        </div>
      </section>

      <section className="chapter px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Implementation" title="Workflow, decisions, and evidence" copy="Each card explains a concrete stage of the project, with research mode exposing the repository-derived evidence behind the writeup." />
          <div className="grid gap-4 lg:grid-cols-2">
            {caseStudy.workflow.map((step, index) => (
              <WorkflowCard key={`${step.title}-${index}`} step={step} index={index} researchMode={researchMode} />
            ))}
          </div>
        </div>
      </section>

      <section className="chapter px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Architecture" title="Project architecture and data flow" />
          <ArchitectureDiagram nodes={caseStudy.architecture} />
        </div>
      </section>

      <section className="chapter px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Visual Output" title="Model and insight dashboard" copy="A theme-matched analytical view that replaces notebook-default visuals with a polished portfolio presentation." />
          <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
            <TechnicalChart type={caseStudy.chartType} />
            <div className="grid gap-4">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl">
                <LineChart size={22} className="text-champagne" />
                <p className="mt-5 text-sm uppercase tracking-[0.28em] text-graphite">Model Family</p>
                <p className="mt-2 text-3xl font-semibold text-white">{caseStudy.modelFamily}</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl">
                <FlaskConical size={22} className="text-aurora" />
                <p className="mt-5 text-sm uppercase tracking-[0.28em] text-graphite">Dataset</p>
                <p className="mt-2 leading-7 text-white">{caseStudy.dataset}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="chapter px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Insights" title="Executive-level findings" />
          <div className="grid gap-4 md:grid-cols-3">
            {caseStudy.insights.map((insight, index) => (
              <Revealer key={insight} delay={index * 0.05} className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-6 leading-7 text-graphite backdrop-blur-xl">
                <p className="mb-5 text-3xl font-semibold text-white">0{index + 1}</p>
                {insight}
              </Revealer>
            ))}
          </div>
        </div>
      </section>

      <section className="chapter px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow="Tech Stack" title="Ecosystem map" />
            <TechEcosystem techStack={project.techStack} />
          </div>
          <div>
            <SectionHeader eyebrow="Reflection" title="What I learned" />
            <div className="space-y-4">
              {caseStudy.learnings.map((item) => (
                <Revealer key={item} className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-5 text-graphite backdrop-blur-xl">
                  {item}
                </Revealer>
              ))}
            </div>
            <div className="mt-6 rounded-[1.5rem] border border-champagne/20 bg-champagne/5 p-6">
              <div className="flex items-center gap-3 text-champagne">
                <GitBranch size={18} />
                <p className="text-sm uppercase tracking-[0.28em]">Future Improvements</p>
              </div>
              <ul className="mt-5 space-y-3 text-graphite">
                {caseStudy.future.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
