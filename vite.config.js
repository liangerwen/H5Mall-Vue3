import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'
import babel from 'vite-babel-plugin'
import { resolve } from 'path'

export default defineConfig({
  base: './',
  plugins: [
    babel(),
    vue(),
    viteMockServe({
      supportTs: true
    })
  ],
  build: {
    minify: 'esbuild'
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/css/global.scss";`
      }
    }
  },
  optimizeDeps: {
    include: ['axios', 'mockjs']
  },
  server: {
    port: 8888,
    // open: true,
    server: {
      '/api': 'http://localhost:8888/api'
    },
    hmr: {
      overlay: false
    }
  }
})
