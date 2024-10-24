import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/hifive/",
  server: {
    proxy: {
      "/api": {
        target: "https://cashapp-dashboard-f15aa2695eea.herokuapp.com/",
      },
    },
  },
  plugins: [react()],
});
