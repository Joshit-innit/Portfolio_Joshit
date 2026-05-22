import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const nav = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/#contact" }
];

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 right-0 top-0 z-50 px-4 py-4"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-void/45 px-4 py-3 shadow-luxe backdrop-blur-2xl">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-9 w-9 overflow-hidden rounded-full border border-white/15 bg-white text-sm font-bold text-void">
            <img src="/images/joshit-profile-luxury.png" alt="Joshit Tammana" className="h-full w-full object-cover object-[52%_34%]" />
          </span>
          <span className="hidden text-sm font-medium tracking-wide text-white sm:inline">Joshit Tammana</span>
        </Link>
        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1">
          {nav.map((item) =>
            item.to.includes("#") ? (
              <a key={item.label} href={item.to} className="rounded-full px-4 py-2 text-xs font-medium text-graphite transition hover:text-white">
                {item.label}
              </a>
            ) : (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-xs font-medium transition ${isActive ? "bg-white text-void" : "text-graphite hover:text-white"}`
                }
              >
                {item.label}
              </NavLink>
            )
          )}
        </div>
        <a href="mailto:joshittammana@gmail.com" className="hidden items-center gap-2 rounded-full border border-champagne/30 px-4 py-2 text-xs font-semibold text-champagne transition hover:bg-champagne hover:text-void md:flex">
          Hire Me <ArrowUpRight size={14} />
        </a>
      </nav>
    </motion.header>
  );
}
