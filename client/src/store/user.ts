import { defineStore } from "pinia";
import { api } from "@/api/index";


// 定义用户相关的状态管理模块
// 定义user模块，用于存储和操作用户相关的数据
export const useUserStore = defineStore('user', {
  // 定义状态，用于存储用户信息
  state: () => ({
    user: null as User | null // 用户对象，初始为null
  }),
  // 定义getters，用于计算派生状态
  getters: {
    // 判断用户是否已登录
    isLogin() {
      return !!this.user
    }
  },
  // 定义actions，用于执行异步操作或修改状态
  actions: {
    // 登录方法，接收手机号和密码作为参数，调用后端接口进行验证，如果成功，将返回的用户信息保存到状态中，并存储到本地
    async login(phone: string, password: string) {
      try {
        // 调用后端接口，传递手机号和密码
        const res = await api.login(phone, password)
        // 判断返回结果是否成功
        if (res.code === 200) {
          // 如果成功，将返回的用户信息赋值给状态中的user属性
          this.user = res.data
          // 并将用户信息转换为字符串存储到本地
          localStorage.setItem('user', JSON.stringify(this.user))
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
    // 注册方法，接收手机号和密码作为参数，调用后端接口进行注册，如果成功，返回成功的提示信息
    async register(phone: string, password: string) {
      try {
        // 调用后端接口，传递手机号和密码
        const res = await api.register(phone, password)
        // 判断返回结果是否成功
        if (res.code === 200) {
          // 如果成功，返回成功的提示信息
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
    // 注销方法，清空状态中的用户信息，并清空本地存储的用户信息
    logout() {
      // 将状态中的user属性赋值为null
      this.user = null
      // 将本地存储中的user属性移除
      localStorage.removeItem('user')
    }
  }
})

