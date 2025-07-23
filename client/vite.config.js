import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
  preview: {
    port: 4173,
    allowedHosts: [
      "gamehub-uqe6.onrender.com", // Add your Render frontend domain
      "localhost" // (optional for local testing)
    ]
  }
})
