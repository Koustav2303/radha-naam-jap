import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/radha-naam-jap/', 
  build: {
    // 1. Increase the warning limit slightly since 3D apps are inherently larger
    chunkSizeWarningLimit: 1000, 
    
    // 2. Tell Vite how to split the code
    rollupOptions: {
      output: {
        manualChunks: {
          // Put Three.js and React Three Fiber in their own massive chunk
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          
          // Put the heavy post-processing effects in another chunk
          'postprocessing': ['@react-three/postprocessing'],
          
          // Put standard React in a core chunk
          'react-vendor': ['react', 'react-dom']
        }
      }
    }
  }
})