import { defineConfig } from 'vite'
import react from '@vitejs/react-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Tələb olunan port: 3000
  },
})