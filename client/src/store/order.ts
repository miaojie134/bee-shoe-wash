import { defineStore } from "pinia";
import axios from "axios";

// 定义订单相关的状态管理模块
export const useOrderStore = defineStore({
  // 定义模块的id
  id: "order",
  // 定义状态
  state: () => ({
    // 用户的订单列表
    list: [],
  }),
  // 定义方法
  actions: {
    // 下单方法
    async order(type: string, time: string, address: string) {
      try {
        // 发送下单请求，带上token和参数
        const res = await axios.post(
          "/api/order",
          { type, time, address },
          { headers: { Authorization: `Bearer ${this.token}` } }
        );
        if (res.data.code === 200) {
          // 下单成功，更新订单列表数据
          this.list.push(res.data.data);
        }
        // 返回响应数据
        return res.data;
      } catch (error) {
        // 抛出异常
        throw error;
      }
    },
    // 获取订单列表方法
    async getOrderList() {
      try {
        // 发送获取订单列表请求，带上token
        const res = await axios.get("/api/order", {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        if (res.data.code === 200) {
          // 获取成功，更新订单列表数据
          this.list = res.data.data;
        }
        // 返回响应数据
        return res.data;
      } catch (error) {
        // 抛出异常
        throw error;
      }
    },
    // 支付方法
    async pay(id: number) {
      try {
        // 发送支付请求，带上token和参数
        const res = await axios.post(
          "/api/pay",
          { id },
          { headers: { Authorization: `Bearer ${this.token}` } }
        );
        if (res.data.code === 200) {
          // 支付成功，更新订单状态为待评价
          const order = this.list.find((item) => item.id === id);
          if (order) {
            order.status = 1;
          }
        }
        // 返回响应数据
        return res.data;
      } catch (error) {
        // 抛出异常
        throw error;
      }
    },
    // 获取支付二维码方法
    async getPayQrcode(type: string) {
      try {
        // 发送获取支付二维码请求，带上token和参数
        const res = await axios.post(
          "/api/qrcode",
          { type },
          { headers: { Authorization: `Bearer ${this.token}` } }
        );
        // 返回响应数据
        return res.data;
      } catch (error) {
        // 抛出异常
        throw error;
      }
    },
  },
});

