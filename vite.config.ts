// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname, 'client'), // Root points to client folder
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'client/src'),
      '@shared': path.resolve(__dirname, 'shared'),
      '@assets': path.resolve(__dirname, 'client/src/assets'),
    },
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'), // Build output goes to project root /dist
    emptyOutDir: true,
  },
  server: {
    port: 5173, // optional: dev server port
  },
});