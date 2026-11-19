import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // "@/..." matches the import paths Watermelon UI components ship with
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } }
});
