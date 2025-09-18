import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Production-leaning build optimizations
export default defineConfig(() => ({
  plugins: [react()],
  build: {
    target: 'es2019',
    cssCodeSplit: true,
    sourcemap: false,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      treeshake: true,
      output: {
        // Split vendor code for better long-term caching
        manualChunks: {
          react: ['react', 'react-dom'],
        },
      },
    },
  },
}))
