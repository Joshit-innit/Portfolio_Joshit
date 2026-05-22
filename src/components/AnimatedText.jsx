import { motion } from "framer-motion";

export default function AnimatedText({ text, className = "" }) {
  const words = text.split(" ");

  return (
    <span className={className} aria-label={text}>
      {words.map((word, index) => (
        <motion.span
          aria-hidden="true"
          key={`${word}-${index}`}
          className="inline-block overflow-hidden pr-[0.18em]"
          initial={{ opacity: 0, y: 42, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.75, delay: index * 0.055, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
