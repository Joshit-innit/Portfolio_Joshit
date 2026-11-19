import { toolbox } from "../../data.js";

const big = ["Java", "Spring Boot", "Microservices", "REST APIs", "Python", "Machine learning", "SQL", "Docker", "AWS"];

// a marker stroke of gold on black: 10:1, unlike gold straight on indigo
function Mark({ children }) {
  return <span className="box-decoration-clone bg-ink px-1.5 text-gold">{children}</span>;
}

export default function Skills() {
  return (
    <section id="about" className="scroll-mt-4 bg-brand text-ink">
      <div className="wrap grid gap-16 py-24 sm:py-32 lg:grid-cols-[5fr_7fr]">
        <div className="lg:sticky lg:top-12 lg:self-start">
          <h2 className="display text-[clamp(3rem,6vw,5.5rem)]">I don't give up until it works</h2>
          <p className="mt-8 max-w-xl text-[clamp(1.375rem,1.9vw,1.75rem)] font-medium leading-snug">
            I'm not the most talented person in the room, but I don't give up until things work. I like building backend services that <Mark>hold up when something fails</Mark>, and taking machine learning models <Mark>from a notebook into a real product</Mark>.
          </p>
          <dl className="mt-12 max-w-xl">
            {toolbox.map(([k, v]) => (
              <div key={k} className="grid gap-x-6 gap-y-1 border-t border-ink/25 py-4 sm:grid-cols-[11rem_1fr] sm:items-baseline">
                <dt className="display text-[1.75rem] leading-none">{k}</dt>
                <dd className="text-lg leading-snug">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <ul aria-label="Core skills" className="display text-[clamp(3rem,8vw,7.5rem)] leading-[0.92]">
          {big.map((s) => (
            <li key={s} className="text-ink/35 transition-colors duration-150 hover:text-ink">{s}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
