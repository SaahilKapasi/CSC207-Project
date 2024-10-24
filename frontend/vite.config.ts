import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/hifive/",
  build: {
    outDir: "./dist/hifive",
  },
  server: {
    proxy: {
      "/api": {
        target: "https://cashapp-dashboard-f15aa2695eea.herokuapp.com/"
      }
    },
  },
  plugins: [react()],
})
