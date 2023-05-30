import axios from "axios";
import { useUserStore } from "../store/index";

// 获取状态管理实例
const store = useUserStore();

// 创建一个axios实例
const http = axios.create({
  // 设置基础URL
  baseURL: "/api",
  // 设置超时时间
  timeout: 10000,
  // 设置请求头
  headers: {
    "Content-Type": "application/json",
  },
});

// 添加请求拦截器
http.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    // 如果已经登录，就在请求头中添加token
    if (store.isLogin) {
      config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    // 返回修改后的配置
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    // 返回一个带有错误信息的Promise对象
    return Promise.reject(error);
  }
);

// 添加响应拦截器
http.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    // 如果响应数据的code不是200，就抛出一个错误
    if (response.data.code !== 200) {
      throw new Error(response.data.message);
    }
    // 返回响应数据
    return response.data;
  },
  (error) => {
    // 对响应错误做点什么
    // 返回一个带有错误信息的Promise对象
    return Promise.reject(error);
  }
);

// 导出封装后的axios实例
export default http;
