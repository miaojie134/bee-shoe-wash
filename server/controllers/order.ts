const orderService = require("../services/order"); // 引入订单相关服务模块

module.exports = {
  async createOrder(ctx) {
    // 定义创建订单处理器方法，接收ctx作为参数
    try {
      const { type, time, address } = ctx.request.body; // 从请求体数据中解构出服务类型、时间和地址
      await orderService.createOrder(type, time, address); // 调用订单服务模块的创建订单方法，传入服务类型、时间和地址
      ctx.body = {
        code: 0,
        data: null,
        message: "下单成功",
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
  async getOrders(ctx) {
    // 定义获取订单处理器方法，接收ctx作为参数
    try {
      const orders = await orderService.getOrders(); // 调用订单服务模块的获取订单方法，返回一个订单数组
      ctx.body = {
        code: 0,
        data: orders,
        message: "获取成功",
      }; // 设置响应体数据，code为0表示成功，data为订单数组，message为提示信息
    } catch (error) {
      // 捕获错误对象
      ctx.body = {
        code: 1,
        data: null,
        message: error.message,
      }; // 设置响应体数据，code为1表示失败，data为null，message为错误信息
    }
  },
  async payOrder(ctx) {
    // 定义支付订单处理器方法，接收ctx作为参数
    try {
      const { id } = ctx.request.body; // 从请求体数据中解构出订单id
      await orderService.payOrder(id); // 调用订单服务模块的支付订单方法，传入订单id
      ctx.body = {
        code: 0,
        data: null,
        message: "支付成功",
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
  async rateOrder(ctx) {
    // 定义评价订单处理器方法，接收ctx作为参数
    try {
      const { id, rating, comment } = ctx.request.body; // 从请求体数据中解构出订单id、评分和评论
      await orderService.rateOrder(id, rating, comment); // 调用订单服务模块的评价订单方法，传入订单id、评分和评论
      ctx.body = {
        code: 0,
        data: null,
        message: "评价成功",
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
};

