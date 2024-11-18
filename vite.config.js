import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: '/Kick-A-Flick/', // Set the base URL for your app
  plugins: [react()], // Use React plugin
  build: {
    rollupOptions: {
      // External dependencies are generally used when bundling libraries,
      // but for normal usage (like axios in your app), you don't need to mark it as external.
      external: [], // Empty or remove this if you don't have specific external dependencies
    },
  },
});
