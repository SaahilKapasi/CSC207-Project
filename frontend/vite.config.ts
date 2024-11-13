import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/hifive/",
  build: {
    outDir: "./dist/hifive",
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000",
      },
    },
  },
  plugins: [react()],
});
