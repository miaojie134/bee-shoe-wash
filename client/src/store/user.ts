import { defineStore } from 'pinia' // 引入pinia核心库，用于定义状态管理模块
import axios from 'axios' // 引入axios库，用于发送http请求
import { WxUserInfo } from '@/types/WxTypes' // 引入微信用户信息的类型定义

export default defineStore({ // 定义一个状态管理模块，并导出
  id: 'user', // 指定模块的id，必须是唯一的
  state: () => ({ // 定义模块的状态，必须是一个函数，返回一个对象
    token: '', // 定义一个状态，表示用户的登录凭证，默认值为空字符串
    userInfo: null as WxUserInfo | null // 定义一个状态，表示用户的微信信息，默认值为null，类型为WxUserInfo或null
  }),
  actions: { // 定义模块的动作，即修改状态的方法
    // 定义一个动作，用于用户登录，并传入phone和password两个参数，表示手机号和密码
    async login(phone: string, password: string) {
      try {
        const res = await axios.post('/api/login', { phone, password }) // 发送post请求到后端的登录接口，并传入phone和password作为请求体数据
        if (res.data.code === 0) { // 如果响应数据中的code为0，表示登录成功
          this.token = res.data.data.token // 将token状态设置为响应数据中的token值
          this.userInfo = res.data.data.userInfo // 将userInfo状态设置为响应数据中的userInfo值
        } else { // 如果响应数据中的code不为0，表示登录失败
          throw new Error(res.data.message) // 抛出一个错误，错误信息为响应数据中的message值
        }
      } catch (err) { // 捕获错误
        alert(err.message) // 弹出一个提示框，显示错误信息
      }
    },
    // 定义一个动作，用于用户注册，并传入phone和password两个参数，表示手机号和密码
    async register(phone: string, password: string) {
      try {
        const res = await axios.post('/api/register', { phone, password }) // 发送post请求到后端的注册接口，并传入phone和password作为请求体数据
        if (res.data.code === 0) { // 如果响应数据中的code为0，表示注册成功
          alert('注册成功') // 弹出一个提示框，显示注册成功
        } else { // 如果响应数据中的code不为0，表示注册失败
          throw new Error(res.data.message) // 抛出一个错误，错误信息为响应数据中的message值
        }
      } catch (err) { // 捕获错误
        alert(err.message) // 弹出一个提示框，显示错误信息
      }
    },
    // 定义一个动作，用于微信登录，并传入code和encryptedData两个参数，表示微信登录凭证和加密数据
    async wxLogin(code: string, encryptedData: string) {
      try {
        const res = await axios.post('/api/wxLogin', { code, encryptedData }) // 发送post请求到后端的微信登录接口，并传入code和encryptedData作为请求体数据
        if (res.data.code === 0) { // 如果响应数据中的code为0，表示微信登录成功
          this.token = res.data.data.token // 将token状态设置为响应数据中的token值
          this.userInfo = res.data.data.userInfo // 将userInfo状态设置为响应数据中的userInfo值
        } else { // 如果响应数据中的code不为0，表示微信登录失败
          throw new Error(res.data.message) // 抛出一个错误，错误信息为响应数据中的message值
        }
      } catch (err) { // 捕获错误
        alert(err.message) // 弹出一个提示框，显示错误信息
      }
    }
  }
})