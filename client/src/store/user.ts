import { defineStore } from "pinia"; // 引入pinia库，用于创建状态管理对象
import axios from "axios"; // 引入axios库，用于发送HTTP请求

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as any, // 用户信息对象，初始值为null
  }),
  actions: {
    async login(phone: string, password: string) {
      // 定义登录操作方法，接收手机号和密码作为参数
      const response = await axios.post("/api/login", { phone, password }); // 发送POST请求到后端的登录接口，携带手机号和密码作为请求体数据
      if (response.data.code === 0) {
        // 如果响应数据中的code为0，表示登录成功
        this.user = response.data.data; // 将响应数据中的data赋值给user状态对象
      } else {
        // 如果响应数据中的code不为0，表示登录失败
        throw new Error(response.data.message); // 抛出一个错误对象，错误信息为响应数据中的message
      }
    },
    async register(phone: string, password: string) {
      // 定义注册操作方法，接收手机号和密码作为参数
      const response = await axios.post("/api/register", { phone, password }); // 发送POST请求到后端的注册接口，携带手机号和密码作为请求体数据
      if (response.data.code === 0) {
        // 如果响应数据中的code为0，表示注册成功
        

      } else {
        // 如果响应数据中的code不为0，表示注册失败
        throw new Error(response.data.message); // 抛出一个错误对象，错误信息为响应数据中的message
      }
    },

  },
});