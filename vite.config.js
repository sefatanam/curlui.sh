import { defineConfig } from 'vite';
import terminalPlugin from './terminal-plugin.js';

// @REVIEW: Vite configuration with terminal interface plugin
export default defineConfig({
  plugins: [
    terminalPlugin()
  ],
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
});
