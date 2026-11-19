import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { archive, links } from "../../data.js";
import { FluidTabs } from "../watermelon/fluid-tabs";

const count = (cat) => archive.filter((a) => a.cat === cat).length;
const tabs = [
  { id: "all", label: "All", count: archive.length },
  { id: "backend", label: "Backend", count: count("backend") },
  { id: "data", label: "Data", count: count("data") },
  { id: "web", label: "Web", count: count("web") }
];

export default function Archive() {
  const [filter, setFilter] = useState("all");
  const items = filter === "all" ? archive : archive.filter((a) => a.cat === filter);

  return (
    <section id="archive" className="wrap scroll-mt-4 py-24 sm:py-32">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <h2 className="display text-[clamp(3.5rem,8vw,7rem)]">More projects</h2>
        <FluidTabs tabs={tabs} onChange={setFilter} />
      </div>

      <ul className="mt-12 border-t border-line">
        {items.map((a) => (
          <li key={a.name} className="border-b border-line">
            <a
              href={a.href}
              target="_blank"
              rel="noreferrer"
              className="group grid grid-cols-[4rem_1fr_auto] items-baseline gap-x-4 gap-y-1 px-1 py-6 transition-colors duration-150 hover:bg-surface sm:grid-cols-[5.5rem_16rem_1fr_7.5rem_auto] sm:px-4"
            >
              <span className="font-mono text-sm tabular-nums text-muted">{a.year}</span>
              <span className="text-lg font-medium sm:text-xl">{a.name}</span>
              <span className="col-start-2 text-base text-muted sm:col-start-auto">{a.note}</span>
              <span className="hidden font-mono text-sm text-muted sm:block">{a.lang}</span>
              <ArrowUpRight size={18} strokeWidth={1.5} className="col-start-3 row-start-1 text-muted transition-colors duration-150 group-hover:text-accent sm:col-start-auto sm:row-start-auto" />
            </a>
          </li>
        ))}
      </ul>
      <a href={links.github} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 py-2 font-medium text-accent underline-offset-4 hover:underline">
        See all repositories on GitHub <ArrowUpRight size={16} strokeWidth={1.5} />
      </a>
    </section>
  );
}
