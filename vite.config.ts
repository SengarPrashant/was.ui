import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 4000,
    strictPort: true, // Fail if the port is already in use
  },
  logLevel: 'info', // Set to 'debug' for more detailed logs
});