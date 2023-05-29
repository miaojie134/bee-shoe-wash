const userService = require("../services/user"); // 引入用户相关服务模块

module.exports = {
  async login(ctx) {
    // 定义登录处理器方法，接收ctx作为参数
    try {
      const { phone, password } = ctx.request.body; // 从请求体数据中解构出手机号和密码
      const user = await userService.login(phone, password); // 调用用户服务模块的登录方法，传入手机号和密码，返回一个用户对象
      ctx.body = {
        code: 0,
        data: user,
        message: "登录成功",
      }; // 设置响应体数据，code为0表示成功，data为用户对象，message为提示信息
    } catch (error) {
      // 捕获错误对象
      ctx.body = {
        code: 1,
        data: null,
        message: error.message,
      }; // 设置响应体数据，code为1表示失败，data为null，message为错误信息
    }
  },
  async register(ctx) {
    // 定义注册处理器方法，接收ctx作为参数
    try {
      const { phone, password } = ctx.request.body; // 从请求体数据中解构出手机号和密码
      await userService.register(phone, password); // 调用用户服务模块的注册方法，传入手机号和密码
      ctx.body = {
        code: 0,
        data: null,
        message: "注册成功",
      }; // 设置响应体数据，code为0表示成功，data为null，message为提示信息
    } catch (error) {
      // 捕获错误对象
      ctx.body = {
        code: 1,
        data: null,
        message: error.message,
      }; // 设置响应体数据，code为1表示失败，data为null，message为错误信息
    }
  },
  async getUserInfo(ctx) {
    // 定义获取用户信息处理器方法，接收ctx作为参数
    try {
      const user = await userService.getUserInfo(); // 调用用户服务模块的获取用户信息方法，返回一个用户对象
      ctx.body = {
        code: 0,
        data: user,
        message: "获取成功",
      }; // 设置响应体数据，code为0表示成功，data为用户对象，message为提示信息
    } catch (error) {
      // 捕获错误对象
      ctx.body = {
        code: 1,
        data: null,
        message: error.message,
      }; // 设置响应体数据，code为1表示失败，data为null，message为错误信息
    }
  },
};