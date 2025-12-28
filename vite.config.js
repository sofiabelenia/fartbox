import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      include: '**/*.{jsx,js,react}'
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.react', '.ts', '.tsx']
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.react': 'jsx'
      }
    }
  },
  publicDir: 'public'
})
