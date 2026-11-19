import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { links } from "../../data.js";
import { CopyConfirm } from "../watermelon/copy-confirm";

const socials = [
  ["LinkedIn", links.linkedin, Linkedin],
  ["GitHub", links.github, Github],
  ["LeetCode", links.leetcode, ArrowUpRight]
];

export default function Contact() {
  return (
    <footer id="contact" className="scroll-mt-4 bg-gold text-ink">
      <div className="wrap pt-24 pb-10 sm:pt-32">
        <h2 className="display text-[clamp(4.5rem,15vw,14rem)]">Let's build something</h2>
        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="max-w-xl text-lg sm:text-xl">
              I'm looking for internships in software engineering, backend development and machine learning. Email is the best way to reach me.
            </p>
            <a href={`mailto:${links.email}`} className="mt-4 inline-block break-all text-[1.5rem] font-medium leading-tight underline decoration-1 underline-offset-[0.2em] sm:text-4xl">
              {links.email}
            </a>
            <div className="mt-6">
              <CopyConfirm value={links.email} />
            </div>
          </div>
          <ul className="flex flex-wrap gap-3 lg:justify-end">
            {socials.map(([label, href, Icon]) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noreferrer" className="btn border border-ink/40 hover:border-ink hover:bg-ink hover:text-gold">
                  <Icon size={16} strokeWidth={1.5} /> {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-20 flex flex-wrap justify-between gap-2 border-t border-ink/20 pt-6 text-[0.95rem] sm:mt-28">
          <span>© {new Date().getFullYear()} Tammana Joshit</span>
          <span>veni, vidi, vici</span>
        </p>
      </div>
    </footer>
  );
}
