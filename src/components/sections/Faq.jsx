import { certificates, links } from "../../data.js";

const ext = { target: "_blank", rel: "noreferrer", className: "text-fg underline decoration-gold/60 underline-offset-4 hover:decoration-gold" };

// every answer comes from facts already on the site
const qa = [
  ["When can you start?", <>Now. I'm open to software engineering, backend and machine learning internships, on-site or hybrid in Bengaluru.</>],
  ["What are you doing right now?", <>Machine Learning Intern at SkillOrbit. On the side I practice data structures and algorithms in Java and learn system design.</>],
  ["What do you build best?", <>Java and Spring Boot backends split into services, with service discovery and circuit breakers so one failure doesn't take the rest down. And ML models wired into real apps.</>],
  ["Where do you study?", <>B.Tech in Computer Science at KL University, with a 9.34 GPA.</>],
  ["Do you put in the reps?", <>150+ problems solved on <a href={links.leetcode} {...ext}>LeetCode</a>, all in Java.</>],
  ["Anything certified?", <>{certificates.map(([t, by, f], i) => <span key={t}>{i ? "; " : ""}<a href={f} {...ext}>{t}</a> ({by})</span>)}</>]
];

export default function Faq() {
  return (
    <section className="wrap grid gap-12 py-24 sm:py-32 lg:grid-cols-[4fr_8fr]">
      <h2 className="display text-gold text-[clamp(3.5rem,7vw,6.5rem)]">Quick answers</h2>
      <dl className="grid gap-x-12 gap-y-12 sm:grid-cols-2">
        {qa.map(([q, a]) => (
          <div key={q}>
            <dt className="display text-[2rem] leading-none">{q}</dt>
            <dd className="mt-3 text-base leading-relaxed text-muted">{a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
