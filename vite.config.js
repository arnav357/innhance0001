import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2015',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          gsap: ['gsap', '@gsap/react'],
          react: ['react', 'react-dom', 'react-router-dom'],
          i18n: ['i18next', 'react-i18next']
        }
      }
    }
  },
  server: {
    port: 5173,
    open: true
  }
})
