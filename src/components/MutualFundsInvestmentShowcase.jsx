import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Boxes,
  BrainCircuit,
  CheckCircle2,
  CircleDollarSign,
  Code2,
  Container,
  Database,
  Eye,
  ExternalLink,
  GitBranch,
  GraduationCap,
  Image as ImageIcon,
  Layers3,
  LineChart,
  LockKeyhole,
  MousePointer2,
  Network,
  Rocket,
  ShieldCheck,
  Sparkles,
  UsersRound
} from "lucide-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import MagneticLink from "./MagneticLink.jsx";
import Revealer from "./Revealer.jsx";
import SectionHeader from "./SectionHeader.jsx";

const repo = "https://github.com/Joshit-innit/Mutual-Funds-";

const developmentSteps = [
  {
    title: "Research Phase",
    icon: BrainCircuit,
    points: ["Studied how mutual funds work", "Mapped investor pain points", "Analyzed fintech dashboards", "Researched fund comparison systems"],
    detail: "The foundation was understanding why users struggle: fund terms are confusing, comparisons are scattered, and risk is often presented without guidance."
  },
  {
    title: "UI/UX Design",
    icon: Sparkles,
    points: ["Premium dashboard layouts", "Clarity and accessibility", "Fintech-inspired components", "Responsive interaction design"],
    detail: "The interface was shaped around calm financial decision-making: clear cards, legible metrics, role-specific journeys, and dashboards that reduce cognitive load."
  },
  {
    title: "Frontend Development",
    icon: Code2,
    points: ["Reusable React components", "Modular architecture", "Dashboard implementation", "Charts and analytics UI"],
    detail: "The frontend focuses on dynamic rendering, reusable surfaces, smooth interactions, and analytical UI patterns for discovery, comparison, risk, and portfolio views."
  },
  {
    title: "Backend & APIs",
    icon: Database,
    points: ["API integrations", "Fund data management", "Authentication", "Investor and advisor workflows"],
    detail: "Backend responsibilities support fund data, role-specific flows, recommendation logic, user workflows, and API-driven delivery to the frontend."
  },
  {
    title: "Deployment & Optimization",
    icon: Rocket,
    points: ["Docker containerization", "Deployment workflow", "Rendering strategy", "Scalability considerations"],
    detail: "The production path emphasizes consistent environments, maintainable services, optimized rendering, and deployment readiness."
  }
];

const workflow = [
  "User Authentication",
  "Role Detection",
  "Dashboard Rendering",
  "Mutual Fund Data Fetching",
  "Fund Analysis Engine",
  "Recommendation & Insights",
  "Investor Decision Support"
];

const techGroups = [
  { title: "Frontend", icon: Layers3, items: ["React", "Tailwind CSS", "Modern UI Components"] },
  { title: "Backend", icon: Boxes, items: ["Node.js", "APIs", "Authentication System"] },
  { title: "Deployment & DevOps", icon: Container, items: ["Docker", "Containerized deployment", "Render/Vercel style workflow"] },
  { title: "Data & Analytics", icon: LineChart, items: ["Mutual fund data APIs", "Analytics rendering", "Financial calculations"] }
];

const features = [
  ["Mutual Fund Discovery", CircleDollarSign],
  ["Fund Comparison Tools", BarChart3],
  ["Investment Insights", Sparkles],
  ["Advisor Guidance", UsersRound],
  ["Risk Understanding", ShieldCheck],
  ["Interactive Dashboards", LineChart],
  ["Responsive Design", Layers3],
  ["Role-Based Access", LockKeyhole],
  ["Educational Financial Content", GraduationCap],
  ["Analytics Visualization", BarChart3]
];

const insights = [
  {
    title: "Technical Learnings",
    items: ["Scalable frontend architecture", "API integration strategies", "Responsive dashboard design", "Role-based systems", "Deployment pipelines", "Docker workflows", "Optimization strategies"]
  },
  {
    title: "Domain Learnings",
    items: ["Understanding mutual funds", "Investment psychology", "Financial data presentation", "Investor behavior", "Fintech UX principles"]
  },
  {
    title: "Engineering Learnings",
    items: ["Balancing UI elegance with performance", "Modular architecture importance", "Production deployment practices", "Real-world workflow design"]
  }
];

const gallery = [
  {
    caption: "Authentication screen",
    src: "/images/mutual-funds-gallery/01-login.png",
    detail: "Role-based login entry for investor, advisor, and admin journeys."
  },
  {
    caption: "Investor discovery",
    src: "/images/mutual-funds-gallery/02-investor-discovery.png",
    detail: "Fund discovery, filters, risk metrics, return periods, and category education."
  },
  {
    caption: "Risk profiling",
    src: "/images/mutual-funds-gallery/03-risk-quiz.png",
    detail: "Investor profile classification with recommended funds based on risk appetite."
  },
  {
    caption: "Portfolio analytics",
    src: "/images/mutual-funds-gallery/04-portfolio-analytics.png",
    detail: "Portfolio value, profit/loss, XIRR, allocation charts, and AI-style insights."
  },
  {
    caption: "SIP management",
    src: "/images/mutual-funds-gallery/05-sip-management.png",
    detail: "SIP controls, reminders, step-up inputs, and projected corpus simulation."
  },
  {
    caption: "Advisor dashboard",
    src: "/images/mutual-funds-gallery/06-advisor-dashboard.png",
    detail: "Advisor support for client snapshots, recommendations, and reporting."
  },
  {
    caption: "Admin control",
    src: "/images/mutual-funds-gallery/07-admin-control.png",
    detail: "Admin workflows for advisors, complaints, fraud monitoring, and fund data."
  }
];

const architecture = ["Frontend", "API Layer", "Backend Services", "Database / Fund Data", "Analytics Engine"];

const chartData = [
  { name: "Discovery", Engagement: 62, Clarity: 68 },
  { name: "Compare", Engagement: 78, Clarity: 82 },
  { name: "Risk", Engagement: 84, Clarity: 88 },
  { name: "Advisor", Engagement: 73, Clarity: 80 },
  { name: "Insights", Engagement: 90, Clarity: 92 }
];

const tooltipStyle = {
  background: "rgba(5,5,5,0.88)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "16px",
  color: "#e8eef5",
  boxShadow: "0 24px 80px rgba(0,0,0,0.48)",
  backdropFilter: "blur(18px)"
};

function FinanceParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 18 }).map((_, index) => (
        <motion.span
          key={index}
          className="absolute h-1 w-1 rounded-full bg-champagne/60 shadow-[0_0_18px_rgba(245,223,184,0.55)]"
          style={{ left: `${8 + ((index * 13) % 86)}%`, top: `${12 + ((index * 19) % 72)}%` }}
          animate={{ y: [-8, 12, -8], opacity: [0.18, 0.72, 0.18], scale: [0.8, 1.35, 0.8] }}
          transition={{ duration: 4 + (index % 5), repeat: Infinity, delay: index * 0.14, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function JourneyRail() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 95, damping: 24 });
  const chapters = [
    ["Overview", "#mf-overview"],
    ["Process", "#mf-process"],
    ["Workflow", "#mf-workflow"],
    ["Features", "#mf-features"],
    ["Photos", "#mf-gallery"],
    ["Architecture", "#mf-architecture"]
  ];

  return (
    <div className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 items-center gap-4 xl:flex">
      <div className="relative h-72 w-px overflow-hidden rounded-full bg-white/10">
        <motion.div className="absolute inset-x-0 top-0 origin-top bg-gradient-to-b from-champagne via-aurora to-iris" style={{ scaleY }} />
      </div>
      <div className="space-y-3">
        {chapters.map(([label, href]) => (
          <a key={label} href={href} className="block text-[10px] uppercase tracking-[0.28em] text-white/35 transition hover:text-champagne">
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}

function ExperienceTicker() {
  const items = ["Risk clarity", "Fund comparison", "Advisor guidance", "Portfolio analytics", "SIP planning", "Admin controls", "Investor education"];

  return (
    <div className="relative mx-auto mt-14 max-w-7xl overflow-hidden rounded-full border border-white/10 bg-white/[0.035] py-3 backdrop-blur-2xl">
      <motion.div
        className="flex min-w-max gap-8 whitespace-nowrap px-6 text-xs uppercase tracking-[0.28em] text-champagne/70"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`} className="inline-flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-aurora shadow-[0_0_16px_rgba(110,231,249,0.65)]" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function MiniAnalyticsChart() {
  return (
    <div className="h-72 rounded-[1.75rem] border border-white/10 bg-black/35 p-5 backdrop-blur-2xl">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="mfGold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f5dfb8" stopOpacity={0.75} />
              <stop offset="100%" stopColor="#f5dfb8" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="mfCyan" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6ee7f9" stopOpacity={0.55} />
              <stop offset="100%" stopColor="#6ee7f9" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
          <XAxis dataKey="name" stroke="rgba(232,238,245,0.48)" tickLine={false} axisLine={false} fontSize={12} />
          <YAxis stroke="rgba(232,238,245,0.28)" tickLine={false} axisLine={false} fontSize={12} />
          <Tooltip contentStyle={tooltipStyle} />
          <Area type="monotone" dataKey="Engagement" stroke="#f5dfb8" fill="url(#mfGold)" strokeWidth={3} />
          <Area type="monotone" dataKey="Clarity" stroke="#6ee7f9" fill="url(#mfCyan)" strokeWidth={3} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function RoleCard({ title, icon: Icon, points }) {
  return (
    <motion.div whileHover={{ y: -8, scale: 1.015 }} className="group rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-7 shadow-luxe backdrop-blur-2xl transition hover:border-champagne/35">
      <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-black/30 text-champagne transition group-hover:shadow-[0_0_35px_rgba(245,223,184,0.18)]">
        <Icon size={22} />
      </div>
      <h3 className="mt-6 text-2xl font-semibold text-white">{title}</h3>
      <div className="mt-5 space-y-3 text-sm leading-6 text-graphite">
        {points.map((point) => (
          <p key={point} className="flex gap-3">
            <CheckCircle2 className="mt-1 shrink-0 text-champagne" size={15} />
            {point}
          </p>
        ))}
      </div>
    </motion.div>
  );
}

export default function MutualFundsInvestmentShowcase() {
  const [activeShot, setActiveShot] = useState(gallery[0]);

  return (
    <div className="relative">
      <JourneyRail />
      <section className="chapter relative overflow-hidden px-6 pb-24 pt-10">
        <FinanceParticles />
        <div className="absolute left-1/2 top-8 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-champagne/10 blur-3xl" />
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="relative">
            <motion.p initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-xs font-semibold uppercase tracking-[0.38em] text-champagne/75">
              Full-stack fintech case study
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 26, filter: "blur(10px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true }} transition={{ duration: 0.75 }} className="mt-5 text-5xl font-semibold leading-none tracking-tight text-white md:text-7xl">
              Mutual Funds Investment Platform
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.12 }} className="mt-7 max-w-3xl text-lg leading-8 text-graphite">
              An intelligent fintech platform designed to simplify mutual fund investing through analytics, comparison tools, investor education, and advisor-driven insights.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="mt-9 flex flex-wrap gap-3">
              <MagneticLink href={repo} external className="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-void transition hover:bg-champagne">
                View GitHub <ExternalLink size={15} />
              </MagneticLink>
              <MagneticLink href={repo} external className="inline-flex items-center rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-champagne/50 hover:text-champagne">
                Live Demo <ArrowRight size={15} />
              </MagneticLink>
              <MagneticLink href="#mf-architecture" className="inline-flex items-center rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-champagne/50 hover:text-champagne">
                Architecture
              </MagneticLink>
              <MagneticLink href="#mf-features" className="inline-flex items-center rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-champagne/50 hover:text-champagne">
                Features
              </MagneticLink>
            </motion.div>
          </div>
          <Revealer className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-5 shadow-luxe backdrop-blur-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_18%,rgba(110,231,249,0.14),transparent_38%),radial-gradient(circle_at_20%_80%,rgba(245,223,184,0.14),transparent_36%)]" />
            <div className="relative rounded-[2rem] border border-white/10 bg-black/35 p-5">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.28em] text-champagne/70">Investor intelligence</p>
                <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-200">Live-ready</span>
              </div>
              <MiniAnalyticsChart />
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {["Risk clarity", "Fund compare", "Advisor flow"].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 text-sm text-platinum/80">{item}</div>
                ))}
              </div>
            </div>
          </Revealer>
        </div>
        <ExperienceTicker />
      </section>

      <section id="mf-overview" className="chapter scroll-mt-28 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Overview" title="Built to make fund decisions clearer" copy="The platform addresses low financial awareness, difficulty comparing mutual funds, limited access to education, and poor investor guidance by combining analytics, education, and intuitive product design." />
          <div className="grid gap-5 lg:grid-cols-3">
            <RoleCard title="Admin" icon={ShieldCheck} points={["Manages the platform", "Controls users", "Updates financial content", "Oversees analytics and system management"]} />
            <RoleCard title="Investor" icon={CircleDollarSign} points={["Explores mutual funds", "Compares schemes", "Understands risk", "Tracks investments and recommendations"]} />
            <RoleCard title="Financial Advisor" icon={UsersRound} points={["Publishes educational content", "Helps investors", "Guides portfolio decisions", "Provides investment insights"]} />
          </div>
          <Revealer className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 leading-8 text-graphite shadow-luxe backdrop-blur-2xl">
            The system is designed around a scalable architecture, modular frontend surfaces, role-based access, responsive dashboards, and API-driven data flow. Instead of presenting investing as a wall of numbers, it organizes information into discovery, comparison, risk, guidance, and decision-support layers.
          </Revealer>
        </div>
      </section>

      <section id="mf-process" className="chapter scroll-mt-28 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Development Process" title="From investor pain points to production-ready fintech flow" />
          <div className="relative">
            <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-champagne via-aurora/50 to-transparent md:block" />
            <div className="space-y-5">
              {developmentSteps.map(({ title, icon: Icon, points, detail }, index) => (
                <Revealer key={title} delay={index * 0.04} className="relative md:pl-12">
                  <div className="absolute left-[0.43rem] top-8 hidden h-4 w-4 rounded-full border border-champagne bg-void shadow-[0_0_26px_rgba(245,223,184,0.48)] md:block" />
                  <div className="grid gap-5 rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl lg:grid-cols-[0.34fr_0.66fr]">
                    <div>
                      <Icon className="text-champagne" size={26} />
                      <p className="mt-4 text-xs uppercase tracking-[0.28em] text-graphite">Step {index + 1}</p>
                      <h3 className="mt-2 text-2xl font-semibold text-white">{title}</h3>
                    </div>
                    <div>
                      <p className="leading-7 text-graphite">{detail}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {points.map((point) => (
                          <span key={point} className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs text-platinum/80">{point}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Revealer>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="mf-workflow" className="chapter scroll-mt-28 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="System Workflow" title="How the product turns users into informed investors" />
          <div className="grid gap-4 lg:grid-cols-7">
            {workflow.map((step, index) => (
              <Revealer key={step} delay={index * 0.04} className="relative">
                <div className="group min-h-36 rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5 text-center backdrop-blur-xl transition hover:-translate-y-1 hover:border-champagne/35">
                  <div className="mx-auto grid h-11 w-11 place-items-center rounded-full border border-champagne/25 bg-champagne/10 text-champagne shadow-[0_0_24px_rgba(245,223,184,0.12)]">{index + 1}</div>
                  <p className="mt-4 text-sm font-semibold leading-6 text-white">{step}</p>
                </div>
                {index < workflow.length - 1 ? <div className="absolute right-[-1.1rem] top-1/2 z-10 hidden h-px w-8 bg-gradient-to-r from-champagne to-aurora lg:block" /> : null}
              </Revealer>
            ))}
          </div>
        </div>
      </section>

      <section className="chapter px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Tech Stack" title="A premium fintech ecosystem" />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {techGroups.map(({ title, icon: Icon, items }, index) => (
              <Revealer key={title} delay={index * 0.04} className="group rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-7 shadow-luxe backdrop-blur-2xl transition hover:-translate-y-1 hover:border-champagne/35">
                <Icon className="text-champagne" size={26} />
                <h3 className="mt-6 text-2xl font-semibold text-white">{title}</h3>
                <div className="mt-5 space-y-2">
                  {items.map((item) => <p key={item} className="text-sm text-graphite">{item}</p>)}
                </div>
              </Revealer>
            ))}
          </div>
        </div>
      </section>

      <section className="chapter px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <Revealer>
            <p className="text-xs font-semibold uppercase tracking-[0.36em] text-champagne/70">Deployment & Infrastructure</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">Containerized for predictable delivery</h2>
            <p className="mt-6 text-lg leading-8 text-graphite">
              The application is containerized using Docker to create a consistent deployment environment, simplify maintenance, and support a production-ready deployment strategy.
            </p>
          </Revealer>
          <Revealer className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/35 p-5 shadow-luxe backdrop-blur-2xl">
            <div className="flex items-center gap-2 border-b border-white/10 pb-4">
              <span className="h-3 w-3 rounded-full bg-red-400/80" />
              <span className="h-3 w-3 rounded-full bg-amber-300/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-300/80" />
              <span className="ml-4 text-xs uppercase tracking-[0.28em] text-white/45">deployment.pipeline</span>
            </div>
            <div className="grid gap-4 py-5 md:grid-cols-2">
              {["Docker containers", "Environment configuration", "Frontend rendering", "Backend service orchestration", "Deployment pipeline", "Scalable maintenance"].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 text-sm text-platinum/80">{item}</div>
              ))}
            </div>
            <div className="rounded-2xl border border-aurora/15 bg-aurora/5 p-5 font-mono text-xs leading-7 text-aurora/85">
              <p><span className="text-champagne">$</span> docker build fintech-platform</p>
              <p><span className="text-champagne">$</span> configure env + services</p>
              <p><span className="text-champagne">$</span> deploy frontend + backend pipeline</p>
            </div>
          </Revealer>
        </div>
      </section>

      <section id="mf-features" className="chapter px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Key Features" title="A complete investor decision-support suite" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {features.map(([feature, Icon], index) => (
              <Revealer key={feature} delay={index * 0.025} className="group rounded-[1.4rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-champagne/35">
                <Icon className="text-champagne transition group-hover:scale-110" size={22} />
                <p className="mt-5 text-sm font-semibold leading-6 text-white">{feature}</p>
              </Revealer>
            ))}
          </div>
        </div>
      </section>

      <section className="chapter px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Insights & Learnings" title="What building this platform taught me" copy="The project became more than a dashboard. It became a study in how engineering, financial literacy, and product clarity have to work together." />
          <div className="grid gap-5 lg:grid-cols-3">
            {insights.map(({ title, items }, index) => (
              <Revealer key={title} delay={index * 0.05} className="rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-7 shadow-luxe backdrop-blur-2xl">
                <h3 className="text-2xl font-semibold text-white">{title}</h3>
                <div className="mt-6 space-y-3">
                  {items.map((item) => (
                    <p key={item} className="flex gap-3 text-sm leading-6 text-graphite">
                      <CheckCircle2 className="mt-1 shrink-0 text-champagne" size={15} />
                      {item}
                    </p>
                  ))}
                </div>
              </Revealer>
            ))}
          </div>
        </div>
      </section>

      <section id="mf-gallery" className="chapter scroll-mt-28 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Frontend Screenshots" title="Website photos" copy="Actual product screens from the Mutual Funds Investment Platform, presented as an interactive gallery instead of static placeholders." />
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <Revealer className="group sticky top-28 h-fit overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-3 shadow-luxe backdrop-blur-2xl">
              <div className="relative overflow-hidden rounded-[1.55rem] border border-white/10 bg-black/40">
                <motion.img
                  key={activeShot.src}
                  src={activeShot.src}
                  alt={activeShot.caption}
                  initial={{ opacity: 0, scale: 1.045, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="aspect-[16/10] w-full bg-white object-contain object-top transition duration-700 group-hover:scale-[1.015]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/65 via-transparent to-transparent" />
              </div>
              <div className="mt-3 rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur-2xl">
                <div className="flex items-center gap-3 text-champagne">
                  <Eye size={16} />
                  <p className="text-xs uppercase tracking-[0.24em]">{activeShot.caption}</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-platinum/80">{activeShot.detail}</p>
              </div>
            </Revealer>
            <div className="grid gap-4 sm:grid-cols-2">
              {gallery.map((shot, index) => (
                <Revealer key={shot.src} delay={index * 0.035}>
                  <button
                    type="button"
                    onClick={() => setActiveShot(shot)}
                    className={`group w-full overflow-hidden rounded-[1.35rem] border bg-white/[0.04] p-2 text-left shadow-luxe backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-champagne/40 ${activeShot.src === shot.src ? "border-champagne/50" : "border-white/10"}`}
                  >
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                      <img src={shot.src} alt={shot.caption} className="aspect-[16/10] w-full bg-white object-contain object-top transition duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-void/75 via-transparent to-transparent opacity-80" />
                      <div className="absolute left-3 top-3 grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-black/45 text-champagne backdrop-blur-xl">
                        <ImageIcon size={15} />
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-3 px-2 py-4">
                      <p className="text-sm font-semibold text-white">{shot.caption}</p>
                      <MousePointer2 size={15} className="text-graphite transition group-hover:text-champagne" />
                    </div>
                  </button>
                </Revealer>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="mf-architecture" className="chapter px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Project Architecture" title="Clean service flow from interface to analytics" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-luxe backdrop-blur-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,223,184,0.12),transparent_38%)]" />
            <div className="relative grid gap-4 md:grid-cols-5">
              {architecture.map((node, index) => (
                <Revealer key={node} delay={index * 0.04} className="relative">
                  <div className="min-h-32 rounded-[1.35rem] border border-white/10 bg-black/30 p-5 text-center backdrop-blur-xl">
                    <Network className="mx-auto text-champagne" size={22} />
                    <p className="mt-5 text-sm font-semibold text-white">{node}</p>
                  </div>
                  {index < architecture.length - 1 ? <div className="absolute -right-4 top-1/2 hidden h-px w-8 bg-gradient-to-r from-champagne to-aurora md:block" /> : null}
                </Revealer>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="chapter px-6 py-24">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/[0.045] p-8 text-center shadow-luxe backdrop-blur-2xl md:p-12">
          <p className="text-xs uppercase tracking-[0.36em] text-champagne/70">Source & case study</p>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white md:text-6xl">Explore the fintech build</h2>
          <p className="mx-auto mt-6 max-w-2xl leading-8 text-graphite">
            A full-stack platform designed around financial awareness, intelligent comparison, role-based workflows, and production-minded deployment.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <MagneticLink href={repo} external className="inline-flex items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-semibold text-void transition hover:bg-champagne">
              GitHub Repository <ExternalLink size={16} />
            </MagneticLink>
            <MagneticLink href={repo} external className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-4 text-sm font-semibold text-white transition hover:border-champagne/50 hover:text-champagne">
              View Source Code
            </MagneticLink>
            <MagneticLink href="#mf-architecture" className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-4 text-sm font-semibold text-white transition hover:border-champagne/50 hover:text-champagne">
              See Architecture
            </MagneticLink>
          </div>
        </div>
      </section>
    </div>
  );
}
