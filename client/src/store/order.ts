import { defineStore } from "pinia";
import { useUserStore } from "@/store";
import { Order } from '@/types/order'
import { api } from "@/api/index";
// 定义order模块，用于存储和操作订单相关的数据
const userStore = useUserStore()
export const useOrderStore = defineStore('order', {
  // 定义状态，用于存储订单列表和当前订单对象
  state: () => ({
    orders: [] as Order[], // 订单列表，初始为空数组
    currentOrder: null as Order | null // 当前订单对象，初始为null
  }),

  getters: {},

  actions: {
    // 获取订单列表方法，调用后端接口获取当前用户的所有订单，并保存到状态中

    async getOrders() {
      // 调用后端接口，传递当前用户的id
      const res = await api.getOrders(userStore.user.id)
      if (res.data.code === 200) {
        this.orders = res.data
        // 返回成功的提示信息
        return res.data.message
      } else {
        throw new Error(res.data.message)
      }
    },

    // 创建订单方法，接收服务类型、时间、地址等参数，调用后端接口创建订单，并添加到状态中
    async createOrder(serviceType: string, time: string, address: string) {
      // 调用后端接口，传递服务类型、时间、地址等参数
      const res = await api.createOrder(serviceType, time, address)
      // 判断返回结果是否成功
      if (res.data.code === 200) {
        // 如果成功，将返回的订单对象添加到状态中的orders属性中
        this.orders.push(res.data)
        return res.data.message
      } else {
        throw new Error(res.data.message)
      }
    },

    // 取消订单方法，接收订单id作为参数，调用后端接口取消订单，并从状态中移除该订单
    async cancelOrder(orderId: number) {
      // 调用后端接口，传递订单id
      const res = await api.cancelOrder(orderId)
      if (res.data.code === 200) {
        // 如果成功，在状态中的orders属性中找到该订单并移除
        this.orders = this.orders.filter(order => order.id !== orderId)
        return res.data.message
      } else {
        throw new Error(res.data.message)
      }
    },

    // 设置当前订单方法，接收订单对象作为参数，并保存到状态中
    setCurrentOrder(order: Order) {
      this.currentOrder = order;
    }
  }
})