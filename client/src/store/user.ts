import { defineStore } from "pinia"; // 引入pinia库，用于创建状态管理对象
import axios from "axios"; // 引入axios库，用于发送HTTP请求

export const useUserStore = defineStore("user", {
  state: () => ({
    phone: "" as string, // 手机号，初始值为空字符串
    password: "" as string, // 密码，初始值为空字符串
  }),
  actions: {
    async login(phone: string, password: string) {
      // 定义登录操作方法，接收手机号和密码作为参数
      const response = await axios.post("/api/login", { phone, password }); // 发送POST请求到后端的登录接口，携带手机号和密码作为请求体数据
      if (response.data.code === 0) {
        // 如果响应数据中的code为0，表示登录成功
        this.phone = phone; // 将手机号赋值给phone状态
        this.password = password; // 将密码赋值给password状态
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
        this.phone = phone; // 将手机号赋值给phone状态
        this.password = password; // 将密码赋值给password状态
      } else {
        // 如果响应数据中的code不为0，表示注册失败
        throw new Error(response.data.message); // 抛出一个错误对象，错误信息为响应数据中的message
      }
    },
    async getUserInfo() {
      // 定义获取用户信息操作方法
      const response = await axios.get("/api/user"); // 发送GET请求到后端的获取用户信息接口
      if (response.data.code === 0) {
        // 如果响应数据中的code为0，表示获取用户信息成功
        this.phone = response.data.data.phone; // 将响应数据中的data.phone赋值给phone状态
        this.password = response.data.data.password; // 将响应数据中的data.password赋值给password状态
      } else {
        // 如果响应数据中的code不为0，表示获取用户信息失败
        throw new Error(response.data.message); // 抛出一个错误对象，错误信息为响应数据中的message
      }
    },
    logout() {
      // 定义退出操作方法
      this.phone = ""; // 将phone状态置为空字符串
      this.password = ""; // 将password状态置为空字符串
    },
  },
});

