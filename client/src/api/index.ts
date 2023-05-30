import axios from 'axios' // 引入axios库

// 创建axios实例，并设置一些默认参数

const instance = axios.create({

  baseURL: '/api', // 基础URL，与vite.config.ts中的proxy配置保持一致

  timeout: 5000, // 超时时间

  headers: {

    'Content-Type': 'application/json' // 请求头类型

  }

})

// 定义请求拦截器，用于在发送请求前做一些处理

instance.interceptors.request.use(

  config => {

    // 获取本地存储的用户信息

    const user = localStorage.getItem('user')

    // 如果存在用户信息，则在请求头中添加token字段

    if (user) {

      config.headers.token = JSON.parse(user).token

    }

    // 返回处理后的配置对象

    return config

  },

  error => {

    // 返回错误对象

    return Promise.reject(error)

  }

)

// 定义响应拦截器，用于在接收响应后做一些处理

instance.interceptors.response.use(

  response => {

    // 返回响应数据

    return response.data

  },

  error => {

    // 返回错误对象

    return Promise.reject(error)

  }

)

// 定义登录接口的请求方法，接收手机号和密码作为参数，并返回一个Promise对象

export const login = (phone: string, password: string) => {

  return instance.post('/login', { phone, password })

}

// 定义注册接口的请求方法，接收手机号和密码作为参数，并返回一个Promise对象
export const register = (phone: string, password: string) => {
  return instance.post('/register', { phone, password })
}

// 定义获取订单列表接口的请求方法，接收用户id作为参数，并返回一个Promise对象
export const getOrders = (userId: number) => {
  return instance.get('/orders', { params: { userId } })
}

// 定义创建订单接口的请求方法，接收服务类型、时间、地址等参数，并返回一个Promise对象
export const createOrder = (serviceType: string, time: string, address: string) => {
  return instance.post('/orders', { serviceType, time, address })
}

// 定义取消订单接口的请求方法，接收订单id作为参数，并返回一个Promise对象
export const cancelOrder = (orderId: number) => {
  return instance.delete('/orders', { params: { orderId } })
}

// 定义获取支付二维码接口的请求方法，接收订单id作为参数，并返回一个Promise对象
export const getPayCode = (orderId: number) => {
  return instance.get('/pay', { params: { orderId } })
}

// 定义支付成功回调接口的请求方法，接收订单id作为参数，并返回一个Promise对象
export const paySuccess = (orderId: number) => {
  return instance.put('/pay', { orderId })
}

// 导出所有的请求方法，方便在其他地方引用
export  const api =  {
  login,
  register,
  getOrders,
  createOrder,
  cancelOrder,
  getPayCode,
  paySuccess
}