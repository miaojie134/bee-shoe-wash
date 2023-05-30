import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router' 
import { useStore } from "../store";

// 导入页面组件
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Service from "../pages/Service.vue";
import Order from "../pages/Order.vue";
import Pay from "../pages/Pay.vue";
import Profile from "../pages/Profile.vue";

const routes:Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/service",
    name: "Service",
    component: Service,
  },
  {
    path: "/order",
    name: "Order",
    component: Order,
  },
  {
    path: "/pay",
    name: "Pay",
    component: Pay,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 获取状态管理实例
const store = useStore();
// 添加路由守卫
router.beforeEach((to, from, next) => {
  // 如果要跳转的页面不是登录或注册页面
  if (to.name !== "Login" && to.name !== "Register") {
    // 检查是否已经登录
    if (store.isLogin) {
      // 已经登录，放行
      next();
    } else {
      // 没有登录，跳转到登录页面
      next("/login");
    }
  } else {
    // 要跳转的页面是登录或注册页面，放行
    next();
  }
});

export default router;
