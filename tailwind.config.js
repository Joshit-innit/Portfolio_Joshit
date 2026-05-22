/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      colors: {
        void: "#050505",
        obsidian: "#0b0b0f",
        champagne: "#f5dfb8",
        platinum: "#e8eef5",
        graphite: "#9ca3af",
        aurora: "#6ee7f9",
        iris: "#a78bfa",
        ember: "#f59e0b"
      },
      boxShadow: {
        luxe: "0 30px 100px rgba(0,0,0,0.45)",
        glow: "0 0 60px rgba(110,231,249,0.18)"
      },
      backgroundImage: {
        "radial-luxe": "radial-gradient(circle at 20% 20%, rgba(110,231,249,0.18), transparent 28%), radial-gradient(circle at 80% 0%, rgba(167,139,250,0.2), transparent 24%), linear-gradient(135deg, #050505 0%, #0b0b0f 52%, #111015 100%)"
      }
    }
  },
  plugins: []
};
