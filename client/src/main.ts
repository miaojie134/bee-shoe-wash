import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import pinia from './store/index'

// 创建Vue应用实例
const app = createApp(App);

// 使用路由插件
app.use(router);

// 使用状态管理插件
app.use(pinia);

// 挂载到页面上
app.mount("#app");
