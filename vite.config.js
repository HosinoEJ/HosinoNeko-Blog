import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import viteString from 'vite-plugin-string'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  return{
    plugins: [
      vue(),
      vueDevTools(),
      viteString({
        include: '**/*.md'
      }),
    ],
    base: command === 'build' ? '/blog/' : '/',
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
  }
})
