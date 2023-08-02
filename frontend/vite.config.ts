import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader()],
  resolve: {
    alias: {
      '@assets': path.resolve('src', 'assets'),
      '@styles': path.resolve('src', 'styles')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/styles/variables.scss";`
      }
    }
  },
  server: {
    proxy: {
      '/api/': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace('/api/', '')
      }
    }
  }
})
