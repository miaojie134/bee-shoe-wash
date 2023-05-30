import { defineStore } from "pinia";
import { api } from "@/api/index";


// 定义pay模块，用于存储和操作支付相关的数据

export const usePayStore = defineStore('pay', {
  // 定义状态，用于存储支付二维码
  state: () => ({
    payCode: '' as string // 支付二维码，初始为空字符串
  }),
  // 定义getters，用于计算派生状态
  getters: {},
  // 定义actions，用于执行异步操作或修改状态
  actions: {
    // 获取支付二维码方法，接收订单id作为参数，调用后端接口获取支付二维码，并保存到状态中
    async getPayCode(orderId: number) {
      try {
        // 调用后端接口，传递订单id
        const res = await api.getPayCode(orderId)
        // 判断返回结果是否成功
        if (res.code === 200) {
          // 如果成功，将返回的支付二维码赋值给状态中的payCode属性
          this.payCode = res.data
          // 返回成功的提示信息
          return res.message
        } else {
          // 如果失败，抛出错误信息
          throw new Error(res.message)
        }
      } catch (error) {
        // 捕获错误，并返回错误信息
        return error.message
      }
    },
    // 支付成功回调方法，接收订单id作为参数，调用后端接口通知支付成功，并清空状态中的支付二维码
    async paySuccess(orderId: number) {
      try {
        // 调用后端接口，传递订单id
        const res = await api.paySuccess(orderId)
        // 判断返回结果是否成功
        if (res.code === 200) {
          // 如果成功，将状态中的payCode属性赋值为空字符串
          this.payCode = ''
          // 返回成功的提示信息
          return res.message
        } else {
          // 如果失败，抛出错误信息
          throw new Error(res.message)
        }
      } catch (error) {
        // 捕获错误，并返回错误信息
        return error.message
      }
    }
  }
})