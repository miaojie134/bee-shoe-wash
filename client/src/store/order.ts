import { defineStore } from "pinia"; // 引入pinia库，用于创建状态管理对象
import axios from "axios"; // 引入axios库，用于发送HTTP请求

export const useOrderStore = defineStore("order", {
  state: () => ({
    orders: [] as any[], // 订单信息数组，初始值为空数组
  }),
  actions: {
    async createOrder(type: string, time: string, address: string) {
      // 定义创建订单操作方法，接收服务类型、时间和地址作为参数
      const response = await axios.post("/api/order", { type, time, address }); // 发送POST请求到后端的创建订单接口，携带服务类型、时间和地址作为请求体数据
      if (response.data.code === 0) {
        // 如果响应数据中的code为0，表示创建订单成功


      } else {
        // 如果响应数据中的code不为0，表示创建订单失败
        throw new Error(response.data.message); // 抛出一个错误对象，错误信息为响应数据中的message
      }
    },
    async getOrders() {
      // 定义获取订单操作方法
      const response = await axios.get("/api/order"); // 发送GET请求到后端的获取订单接口
      if (response.data.code === 0) {
        // 如果响应数据中的code为0，表示获取订单成功
        this.orders = response.data.data; // 将响应数据中的data赋值给orders状态数组
      } else {
        // 如果响应数据中的code不为0，表示获取订单失败
        throw new Error(response.data.message); // 抛出一个错误对象，错误信息为响应数据中的message
      }
    },

  },
});

