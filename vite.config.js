import { defineConfig } from 'vite';
import { resolve } from 'node:path';

const rootDir = import.meta.dirname;

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(rootDir, 'src/'),
    },
  },
});
