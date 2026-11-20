import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { work } from "../../data.js";

const featured = ["NutriNation", "FindMyMovie", "MutualifyX"].map((t) => work.find((p) => p.title === t));
const landing = [-5, 2, -3]; // final tilt of each card on the table

function useWide() {
  const q = "(min-width: 64rem) and (min-height: 44rem)";
  const [wide, setWide] = useState(() => typeof window !== "undefined" && window.matchMedia(q).matches);
  useEffect(() => {
    const m = window.matchMedia(q);
    const on = () => setWide(m.matches);
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);
  return wide;
}

export default function Work() {
  const wide = useWide();
  const reduce = useReducedMotion();
  return wide && !reduce ? <Deck /> : <Stack />;
}

/** Desktop: the heading sits on the table and the three sites are dealt onto it as you scroll. */
function Deck() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <section id="work" ref={ref} className="relative h-[300vh] scroll-mt-0">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <h2 className="display pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-gold text-[clamp(6rem,15vw,15rem)]">
          Work that ships
        </h2>
        <div className="wrap relative grid grid-cols-3 gap-8">
          {featured.map((p, i) => (
            <Dealt key={p.title} p={p} i={i} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Dealt({ p, i, progress }) {
  const start = 0.08 + i * 0.22;
  const range = [start, start + 0.28];
  const y = useTransform(progress, range, ["110vh", "0vh"]);
  const rotate = useTransform(progress, range, [i % 2 ? -14 : 14, landing[i]]);
  return (
    <motion.div style={{ y, rotate }}>
      <Card p={p} />
    </motion.div>
  );
}

/** Phones, short screens and reduced motion: the same cards, stacked. */
function Stack() {
  return (
    <section id="work" className="wrap scroll-mt-4 py-24 sm:py-32">
      <h2 className="display text-gold text-[clamp(4rem,14vw,9rem)]">Work that ships</h2>
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((p) => <Card key={p.title} p={p} />)}
      </div>
    </section>
  );
}

function Card({ p }) {
  return (
    <a
      href={p.live}
      target="_blank"
      rel="noreferrer"
      className="group block overflow-hidden rounded-xl bg-surface ring-1 ring-line shadow-[0_24px_48px_-20px_rgba(0,0,0,0.7)] transition-[box-shadow] duration-150 hover:ring-gold"
    >
      <img src={p.image} alt={`${p.title} homepage`} loading="lazy" className="aspect-[16/10] w-full object-cover object-top" />
      <div className="p-6">
        <p className="font-mono text-[0.8rem] text-muted">{p.kind} · {p.year}</p>
        <h3 className="display mt-3 text-gold text-5xl">{p.title}</h3>
        <p className="mt-3 line-clamp-3 text-[0.95rem] leading-relaxed text-muted">{p.summary}</p>
        <div className="mt-5 border-t border-line pt-5">
          <span className="inline-flex items-center gap-3 rounded-full bg-gold py-1.5 pr-1.5 pl-5 text-[0.95rem] font-medium text-ink transition-colors duration-150 group-hover:bg-bone">
            Check it out
            <span className="grid size-8 place-items-center rounded-full bg-ink text-gold transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight size={16} strokeWidth={1.75} />
            </span>
          </span>
        </div>
      </div>
    </a>
  );
}
