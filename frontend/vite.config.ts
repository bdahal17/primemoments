import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: ".", // frontend root
  base: "/", // relative paths for assets
  build: {
    outDir: "../backend/src/main/resources/static", // SPA build destination for Spring Boot
    emptyOutDir: true
  },
})
