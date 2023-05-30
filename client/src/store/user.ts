import { defineStore } from "pinia";
import axios from "axios";

// 定义用户相关的状态管理模块
export const useUserStore = defineStore({
  // 定义模块的id
  id: "user",
  // 定义状态
  state: () => ({
    // 是否已经登录
    isLogin: false,
    // 用户的token
    token: "",
    // 用户的信息
    info: {},
  }),
  // 定义方法
  actions: {
    // 登录方法
    async login(phone: string, password: string) {
      try {
        // 发送登录请求
        const res = await axios.post("/api/login", { phone, password });
        if (res.data.code === 200) {
          // 登录成功，更新状态
          this.isLogin = true;
          this.token = res.data.data;
        }
        // 返回响应数据
        return res.data;
      } catch (error) {
        // 抛出异常
        throw error;
      }
    },
    // 注册方法
    async register(phone: string, password: string) {
      try {
        // 发送注册请求
        const res = await axios.post("/api/register", { phone, password });
        // 返回响应数据
        return res.data;
      } catch (error) {
        // 抛出异常
        throw error;
      }
    },
    // 退出登录方法
    async logout() {
      try {
        // 发送退出登录请求，带上token
        const res = await axios.post(
          "/api/logout",
          {},
          { headers: { Authorization: `Bearer ${this.token}` } }
        );
        if (res.data.code === 200) {
          // 退出登录成功，更新状态
          this.isLogin = false;
          this.token = "";
          this.info = {};
        }
        // 返回响应数据
        return res.data;
      } catch (error) {
        // 抛出异常
        throw error;
      }
    },
    // 获取用户信息方法
    async getUserInfo() {
      try {
        // 发送获取用户信息请求，带上token
        const res = await axios.get("/api/user", {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        if (res.data.code === 200) {
          // 获取成功，更新用户信息数据
          this.info = res.data.data;
        }
        // 返回响应数据
        return res.data;
      } catch (error) {
        // 抛出异常
        throw error;
      }
    },
  },
});

