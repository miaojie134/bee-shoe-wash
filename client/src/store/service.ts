import { defineStore } from "pinia"; // 引入pinia库，用于创建状态管理对象
import axios from "axios"; // 引入axios库，用于发送HTTP请求

export const useServiceStore = defineStore("service", {
  state: () => ({
    services: [] as any[], // 服务信息数组，初始值为空数组
  }),
  actions: {
    async getServices() {
      // 定义获取服务操作方法
      const response = await axios.get("/api/service"); // 发送GET请求到后端的获取服务接口
      if (response.data.code === 0) {
        // 如果响应数据中的code为0，表示获取服务成功
        this.services = response.data.data; // 将响应数据中的data赋值给services状态数组
      } else {
        // 如果响应数据中的code不为0，表示获取服务失败
        throw new Error(response.data.message); // 抛出一个错误对象，错误信息为响应数据中的message
      }
    },
    async createService(type: string, price: number, description: string) {
      // 定义创建服务操作方法，接收服务类型、价格和介绍作为参数
      const response = await axios.post("/api/service", {
        type,
        price,
        description,
      }); // 发送POST请求到后端的创建服务接口，携带服务类型、价格和介绍作为请求体数据
      if (response.data.code === 0) {
        // 如果响应数据中的code为0，表示创建服务成功


      } else {
        // 如果响应数据中的code不为0，表示创建服务失败
        throw new Error(response.data.message); // 抛出一个错误对象，错误信息为响应数据中的message
      }
    },

  },
});