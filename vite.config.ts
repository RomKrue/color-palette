import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './123/',
  build: {
    outDir: './dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        assetFileNames: '[ext]/[name]-[hash][extname]',
        chunkFileNames: 'js/[chunks]/[name].[hash].js',
        entryFileNames: 'index.js',
      },
    },
  },
})
