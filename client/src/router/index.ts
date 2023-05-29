import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router' // 引入vue-router核心库，用于创建路由实例和定义路由规则
import Home from '@/pages/Home.vue' // 引入首页组件
import Book from '@/pages/Book.vue' // 引入预约组件
import Order from '@/pages/Order.vue' // 引入订单组件
import Profile from '@/pages/Profile.vue' // 引入个人中心组件

const routes: Array<RouteRecordRaw> = [ // 定义路由规则，每个规则是一个对象，包含path和component两个属性
  {
    path: '/', // 路由路径，这里是根路径
    component: Home // 路由组件，这里是首页组件
  },
  {
    path: '/book', // 路由路径，这里是预约路径
    component: Book // 路由组件，这里是预约组件
  },
  {
    path: '/order', // 路由路径，这里是订单路径
    component: Order // 路由组件，这里是订单组件
  },
  {
    path: '/profile', // 路由路径，这里是个人中心路径
    component: Profile // 路由组件，这里是个人中心组件
  }
]

const router = createRouter({ // 创建路由实例，并传入配置对象
  history: createWebHashHistory(), // 使用hash模式的历史记录，即在url中使用#来标识不同的路由路径
  routes // 使用上面定义的路由规则
})

export default router