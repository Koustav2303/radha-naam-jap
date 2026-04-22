import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/radha-naam-jap/', 
  build: {
    // Suppress the warning by raising the limit to 2000kB
    chunkSizeWarningLimit: 2000, 
  }
})