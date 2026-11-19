import { ArrowDown } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { links } from "../../data.js";
import { ease } from "../motion.jsx";
import { CopyConfirm } from "../watermelon/copy-confirm";

const nav = [
  ["Work", "#work"],
  ["About", "#about"],
  ["Résumé", "/documents/joshit-tammana-resume.pdf"],
  ["Contact", "#contact"]
];
const roles = ["software engineer", "java backend", "machine learning"];

/** Types each role, holds it, deletes it, moves to the next. */
function Typed() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [n, setN] = useState(0);
  const [del, setDel] = useState(false);
  const word = roles[i];

  useEffect(() => {
    if (reduce) return;
    const done = !del && n === word.length;
    const t = setTimeout(
      () => {
        if (done) return setDel(true);
        if (del && n === 0) {
          setDel(false);
          return setI((i + 1) % roles.length);
        }
        setN(n + (del ? -1 : 1));
      },
      done ? 1600 : del ? 35 : 70
    );
    return () => clearTimeout(t);
  }, [n, del, word, i, reduce]);

  return (
    <p className="font-mono text-[clamp(1.125rem,2.1vw,2rem)]">
      <span className="sr-only">{roles.join(", ")}</span>
      <span aria-hidden>
        &gt; {reduce ? word : word.slice(0, n)}
        <span className="ml-0.5 inline-block h-[1em] w-[0.08em] translate-y-[0.15em] animate-pulse bg-white motion-reduce:animate-none" />
      </span>
    </p>
  );
}

export default function Hero() {
  return (
    <header id="top">
      {/* the portrait is a transparent cut-out (keyed from its flat indigo), so the name shows around it */}
      <section className="relative isolate h-[100svh] min-h-[40rem] overflow-hidden bg-[#5663d5] text-white">
        <nav className="wrap relative z-30 flex items-center justify-between py-6 text-[0.95rem]">
          <a href="#top" className="font-medium">Tammana Joshit</a>
          <ul className="flex gap-5 sm:gap-8">
            {nav.map(([label, href]) => (
              <li key={label} className={label === "About" ? "max-sm:hidden" : undefined}>
                <a href={href} className="underline-offset-4 hover:underline">{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <h1 aria-label="Tammana Joshit" className="display text-gold">
          {/* behind the photo */}
          <motion.span
            aria-hidden
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease }}
            className="absolute top-[13%] left-6 z-0 text-[clamp(5.5rem,22vw,9rem)] sm:left-10 lg:top-[17%] lg:left-[4vw] lg:text-[clamp(8rem,15vw,16rem)]"
          >
            Tammana
          </motion.span>
          {/* in front of the photo */}
          <motion.span
            aria-hidden
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="absolute right-6 bottom-[4%] z-20 text-[clamp(5.5rem,22vw,9rem)] sm:right-10 lg:right-[4vw] lg:bottom-[5%] lg:text-[clamp(8rem,15vw,16rem)]"
          >
            Joshit
          </motion.span>
        </h1>

        <motion.img
          src="/work/portrait-cutout.png"
          alt="Tammana Joshit"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          className="absolute bottom-0 left-1/2 z-10 h-[62%] w-auto max-w-none -translate-x-1/2 lg:h-[84%]"
        />

        <div className="absolute top-[27%] left-6 z-20 sm:left-10 lg:top-[30%] lg:right-[6vw] lg:left-auto">
          <Typed />
        </div>

        <p className="absolute bottom-[8%] left-[4vw] z-20 hidden items-center gap-2 font-mono text-[0.95rem] lg:flex">
          <span aria-hidden className="size-2 rounded-full bg-gold" />
          open to internships · bengaluru
        </p>
      </section>

      <div className="wrap grid gap-10 py-20 sm:py-24 lg:grid-cols-2 lg:gap-16">
        <p className="display text-fg text-[clamp(2.25rem,4.5vw,4rem)] leading-[0.95]">
          Backends that hold up. Models that leave the notebook.
        </p>
        <div>
          <p className="max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            I'm a computer science student at KL University. I build backend services with Java and Spring Boot, and I turn machine learning models into working applications.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#work" className="btn bg-gold text-ink hover:bg-bone">
              See the work <ArrowDown size={16} strokeWidth={1.5} />
            </a>
            <CopyConfirm value={links.email} />
          </div>
          <p className="mt-6 text-[0.95rem] text-muted">Open to internships · Bengaluru, on-site or hybrid</p>
        </div>
      </div>
    </header>
  );
}
