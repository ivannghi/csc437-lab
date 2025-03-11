import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "",
  server: {
    proxy: {
        "/api": "http://localhost:3000" // Forwards all requests at localhost:5173/api/*
    }
  }
})
