import { defineConfig } from 'vite' // 引入vite核心库，用于定义配置对象
import vue from '@vitejs/plugin-vue' // 引入vite插件，用于支持vue单文件组件的解析和编译

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), // 使用vue插件
  ],
  resolve: {
    alias: { // 配置别名，用于解析非相对模块名
      '@': '/src' // 将@符号指向src文件夹
    }
  },
  server: { // 配置开发服务器相关选项
    port: 3000, // 指定端口号，默认是3000，你也可以修改为其他端口
    open: true, // 是否在启动时自动打开浏览器，默认是false，你也可以修改为true或者指定一个路径
    proxy: { // 配置代理，用于解决跨域问题
      '/api': { // 将所有以/api开头的请求转发到后端服务器
        target: 'http://localhost:4000', // 后端服务器地址，这里假设是本地的4000端口
        changeOrigin: true, // 是否改变请求头中的origin字段
        rewrite: (path) => path.replace(/^\/api/, '') // 是否重写请求路径，这里是去掉/api前缀
      }
    }
  }
})
