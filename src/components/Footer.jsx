import { motion } from "framer-motion";
import { socials } from "../data/socials.js";

export default function Footer() {
  return (
    <footer id="contact" className="relative border-t border-white/10 bg-void/80 px-6 py-16 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.36em] text-champagne/70">Contact</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-white md:text-5xl">
            Building thoughtful systems with data, code, and taste.
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {socials.map(({ label, href, icon: Icon }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noreferrer"
              className="group grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-graphite shadow-luxe backdrop-blur-xl transition hover:border-champagne/50 hover:text-champagne"
              whileHover={{ y: -5, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              aria-label={label}
            >
              <Icon size={19} />
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}
