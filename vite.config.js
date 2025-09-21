import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['jspdf'], // forces Vite to pre-bundle it
  },
  build: {
    rollupOptions: {
      external: ['jspdf'], // treat it as external (won’t bundle)
    },
  },
});
