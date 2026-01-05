import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/add-student': 'http://localhost:8080',
      '/show-student': 'http://localhost:8080',
      '^/show-student-by-id/.*': 'http://localhost:8080',
      '^/update-student-by-id/.*': 'http://localhost:8080',
      '^/delete-student-by-id/.*': 'http://localhost:8080',
    }
  }
})
