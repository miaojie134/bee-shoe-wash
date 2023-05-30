import { defineStore } from "pinia";
import { api } from "@/api/index";
import { User } from "@/types/user";

// 定义user模块，用于存储和操作用户相关的数据
export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null // 用户对象，初始为null
  }),
  getters: {
    // 判断用户是否已登录
    isLogin(): boolean {
      return !!this.user
    }
  },
  // 定义actions，用于执行异步操作或修改状态
  actions: {
    setUser(user: User) {
      this.user = user
    },
    clearUser() {
      this.user = null
    },
    // 登录方法，接收手机号和密码作为参数，调用后端接口进行验证，如果成功，将返回的用户信息保存到状态中，并存储到本地
    async login(phone: string, password: string) {
      const res = await api.login(phone, password)
      if (res.data.code === 200) {
        this.user = res.data
        localStorage.setItem('user', JSON.stringify(this.user))
        return res.data.message
      } else {
        throw new Error(res.data.message)
      }
    },
    // 注册方法，接收手机号和密码作为参数，调用后端接口进行注册，如果成功，返回成功的提示信息
    async register(phone: string, password: string) {
      // 调用后端接口，传递手机号和密码
      const res = await api.register(phone, password)
      if (res.data.code === 200) {
        return res.data.message
      } else {
        throw new Error(res.data.message)
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

