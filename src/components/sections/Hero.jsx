import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ease, Morph } from "../motion.jsx";

const nav = [
  ["Work", "#work"],
  ["About", "#about"],
  ["SDE résumé", "/documents/tammana-joshit-sde-resume.pdf"],
  ["ML résumé", "/documents/tammana-joshit-ml-resume.pdf"],
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
  const ref = useRef(null);
  // names and photo come in while the hero is mostly on screen, and fly back out when you scroll past it
  const shown = useInView(ref, { amount: 0.5 });
  const state = shown ? "in" : "out";

  return (
    <header id="top">
      {/* the portrait is a transparent cut-out (keyed from its flat indigo), so the name shows around it */}
      <Morph enter={false}>
      <section ref={ref} className="relative isolate h-[100svh] min-h-[40rem] overflow-hidden bg-[#5663d5] text-white">
        <nav className="wrap relative z-30 flex items-center justify-between py-6 text-[0.95rem]">
          <a href="#top" className="font-medium">Tammana Joshit</a>
          <ul className="flex gap-5 sm:gap-8">
            {nav.map(([label, href]) => (
              <li key={label} className={label === "About" || label === "Work" ? "max-sm:hidden" : undefined}>
                <a href={href} {...(href.endsWith(".pdf") && { target: "_blank", rel: "noreferrer" })} className="underline-offset-4 hover:underline">{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <h1 aria-label="Tammana Joshit" className="display text-gold">
          {/* behind the photo */}
          <motion.span
            aria-hidden
            initial="out"
            animate={state}
            variants={{ out: { opacity: 0, x: "-110%" }, in: { opacity: 1, x: 0 } }}
            transition={{ duration: 1.4, ease }}
            className="absolute top-[13%] left-6 z-0 text-[clamp(5.5rem,22vw,9rem)] sm:left-10 lg:top-[17%] lg:left-[4vw] lg:text-[clamp(8rem,15vw,16rem)]"
          >
            Tammana
          </motion.span>
          {/* in front of the photo */}
          <motion.span
            aria-hidden
            initial="out"
            animate={state}
            variants={{ out: { opacity: 0, x: "110%" }, in: { opacity: 1, x: 0 } }}
            transition={{ duration: 1.4, delay: 0.2, ease }}
            className="absolute right-6 bottom-[4%] z-20 text-[clamp(5.5rem,22vw,9rem)] sm:right-10 lg:right-[4vw] lg:bottom-[5%] lg:text-[clamp(8rem,15vw,16rem)]"
          >
            Joshit
          </motion.span>
        </h1>

        <motion.img
          src="/work/portrait-cutout.png"
          alt="Tammana Joshit"
          initial="out"
          animate={state}
          variants={{ out: { opacity: 0, y: "100%" }, in: { opacity: 1, y: 0 } }}
          transition={{ duration: 1.5, delay: 0.1, ease }}
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
      </Morph>

      <Morph>
        {/* fills one screen: headline across the top, the who-am-i row underneath */}
        <div className="wrap flex min-h-[100svh] flex-col justify-center gap-14 py-20 lg:gap-20">
          <p className="display text-fg text-[clamp(3.25rem,8vw,9.5rem)] leading-[0.88]">
            Backends that <em className="serif whitespace-nowrap text-gold">hold up.</em>
            <br />
            Models that <em className="serif text-brand">leave the notebook.</em>
          </p>
          <div className="grid gap-8 border-t border-line pt-10 lg:grid-cols-[4fr_8fr] lg:gap-16">
            <div>
              <h2 className="serif text-gold text-[clamp(2.75rem,5vw,4.5rem)] leading-none">Who am I?</h2>
              <p className="mt-5 flex items-center gap-2 font-mono text-[0.85rem] text-muted">
                <span aria-hidden className="size-2 animate-pulse rounded-full bg-gold motion-reduce:animate-none" />
                open to internships · bengaluru, on-site or hybrid
              </p>
            </div>
            <div className="grid gap-6 text-lg leading-relaxed sm:grid-cols-2 sm:gap-10 lg:text-xl">
              <p className="text-fg/90">
                I'm Joshit, a computer science student at <span className="text-fg">KL University</span> who likes building things people actually use. I write backend services in Java and Spring Boot, and I take machine learning models out of notebooks and into real apps.
              </p>
              <p className="text-muted">
                So far that's an e-commerce store on Spring Boot microservices, a mutual fund platform with dashboards for investors and advisors, and an app that finds where any film is streaming. <span className="text-fg">I don't give up until it works.</span>
              </p>
            </div>
          </div>
        </div>
      </Morph>
    </header>
  );
}
