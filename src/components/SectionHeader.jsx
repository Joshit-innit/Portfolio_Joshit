import Revealer from "./Revealer.jsx";

export default function SectionHeader({ eyebrow, title, copy }) {
  return (
    <Revealer className="mx-auto mb-12 max-w-3xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.36em] text-champagne/70">{eyebrow}</p>
      <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">{title}</h2>
      {copy ? <p className="mt-5 text-base leading-8 text-graphite md:text-lg">{copy}</p> : null}
    </Revealer>
  );
}
