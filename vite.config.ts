import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

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
        manualChunks: {
          react: ['react', 'react-dom'],
        },
      },
    },
  },
}))
