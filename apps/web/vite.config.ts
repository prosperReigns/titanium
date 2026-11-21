import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: { "/api": { target: "http://localhost:3001", changeOrigin: true } },
  },
  build: { rollupOptions: { input: {
    home: resolve(__dirname, 'index.html'),
    product: resolve(__dirname, 'product.html'),
    account: resolve(__dirname, 'account.html'),
  } } },
});
