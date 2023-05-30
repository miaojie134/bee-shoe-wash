// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()], // 使用vue和vue-jsx插件
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  server: {
    // 设置开发服务器的参数
    port: 3000, // 端口号
    open: true, // 自动打开浏览器
    proxy: {
      // 设置代理，解决跨域问题
      '/api': {
        target: 'http://localhost:8080', // 后端接口地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    // 设置生产环境的参数
    outDir: 'dist', // 输出目录
    sourcemap: false // 是否生成源码映射文件
  }
})

