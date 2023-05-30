// src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Order from '../views/Order.vue'
import Pay from '../views/Pay.vue'

// 定义路由规则，每个路由对应一个页面组件
const routes: Array<RouteRecordRaw> = [
  {
    path: '/', // 根路径，重定向到/home
    redirect: '/home'
  },
  {
    path: '/home', // 首页路径，对应Home组件
    name: 'Home',
    component: Home
  },
  {
    path: '/login', // 登录路径，对应Login组件
    name: 'Login',
    component: Login
  },
  {
    path: '/register', // 注册路径，对应Register组件
    name: 'Register',
    component: Register
  },
  {
    path: '/order', // 订单路径，对应Order组件
    name: 'Order',
    component: Order
  },
  {
    path: '/pay', // 支付路径，对应Pay组件
    name: 'Pay',
    component: Pay
  }
]

// 创建路由实例，使用history模式
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 定义路由守卫，用于控制导航和权限
router.beforeEach((to, from, next) => {
  // 获取本地存储的用户信息
  const user = localStorage.getItem('user')
  // 如果要去登录或注册页面，直接放行
  if (to.path === '/login' || to.path === '/register') {
    next()
  } else {
    // 否则，判断用户是否已登录
    if (user) {
      // 如果已登录，放行
      next()
    } else {
      // 如果未登录，跳转到登录页面，并传递原来的路径作为参数
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})

// 导出路由实例
export default router