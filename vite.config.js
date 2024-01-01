import { fileURLToPath, URL } from 'node:url'
import dynamicImport from 'vite-plugin-dynamic-import';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  //环境配置 'development'|'production'
  mode: 'production',
  plugins: [
    // ...
    dynamicImport(),
    [UnoCSS(), vue()]
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
})
