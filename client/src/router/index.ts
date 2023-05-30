import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router' 

import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Book from "../pages/Book.vue";
import Order from "../pages/Order.vue";
import OrderDetail from "../pages/OrderDetail.vue";
import Rate from "../pages/Rate.vue";
import Profile from "../pages/Profile.vue";
import Favorite from "../pages/Favorite.vue";
import Share from "../pages/Share.vue";

const routes:Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
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
    path: "/book/:id",
    name: "Book",
    component: Book,
  },
  {
    path: "/order",
    name: "Order",
    component: Order,
  },
  {
    path: "/order/:id",
    name: "OrderDetail",
    component: OrderDetail,
  },
  {
    path: "/rate/:id",
    name: "Rate",
    component: Rate,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/favorite",
    name: "Favorite",
    component: Favorite,
  },
  {
    path: "/share",
    name: "Share",
    component: Share,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
