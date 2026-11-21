import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = dirname(fileURLToPath(import.meta.url));
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: { "/api": { target: "http://localhost:3001", changeOrigin: true } },
  },
  build: { rollupOptions: { input: {
    home: resolve(root, 'index.html'),
    product: resolve(root, 'product.html'),
    account: resolve(root, 'account.html'),
    checkout: resolve(root, 'checkout.html'),
  } } },
});
