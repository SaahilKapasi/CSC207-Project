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
      "/hifive/api": {
        target: "http://cashapp-dashboard-f15aa2695eea.herokuapp.com/",
      },
    },
  },
  plugins: [react()],
});
