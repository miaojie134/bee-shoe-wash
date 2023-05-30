import { defineStore } from "pinia";
import axios from "axios";

// 定义服务相关的状态管理模块
export const useServicetore = defineStore('service',{
  // 定义状态
  state: () => ({
    // 服务的类型列表
    types: [],
    // 服务的价格列表
    prices: [],
    // 服务的介绍列表
    intros: [],
  }),
  // 定义方法
  actions: {
    // 获取服务类型列表方法
    async getServiceTypes() {
      try {
        // 发送获取服务类型列表请求
        const res = await axios.get("/api/service/types");
        if (res.data.code === 200) {
          // 获取成功，更新服务类型列表数据
          this.types = res.data.data;
        }
        // 返回响应数据
        return res.data;
      } catch (error) {
        // 抛出异常
        throw error;
      }
    },
    // 获取服务价格列表方法
    async getServicePrices() {
      try {
        // 发送获取服务价格列表请求
        const res = await axios.get("/api/service/prices");
        if (res.data.code === 200) {
          // 获取成功，更新服务价格列表数据
          this.prices = res.data.data;
        }
        // 返回响应数据
        return res.data;
      } catch (error) {
        // 抛出异常
        throw error;
      }
    },
    // 获取服务介绍列表方法
    async getServiceIntros() {
      try {
        // 发送获取服务介绍列表请求
        const res = await axios.get("/api/service/intros");
        if (res.data.code === 200) {
          // 获取成功，更新服务介绍列表数据
          this.intros = res.data.data;
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

