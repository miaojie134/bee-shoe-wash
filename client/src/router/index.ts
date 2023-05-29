import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router' 
import Home from '@/pages/Home.vue'
import Book from '@/pages/Book.vue' 
import Order from '@/pages/Order.vue' 
import Profile from '@/pages/Profile.vue' 

const routes: Array<RouteRecordRaw> = [ 
  {
    path: '/', 
    component: Home 
  },
  {
    path: '/book', 
    component: Book 
  },
  {
    path: '/order', 
    component: Order 
  },
  {
    path: '/profile', 
    component: Profile 
  }
]

const router = createRouter({ 
  history: createWebHashHistory(), 
  routes 
})

export default router