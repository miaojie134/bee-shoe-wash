const serviceService = require("../services/service"); // 引入服务相关服务模块

module.exports = {
  async getServices(ctx) {
    // 定义获取服务处理器方法，接收ctx作为参数
    try {
      const services = await serviceService.getServices(); // 调用服务服务模块的获取服务方法，返回一个服务数组
      ctx.body = {
        code: 0,
        data: services,
        message: "获取成功",
      }; // 设置响应体数据，code为0表示成功，data为服务数组，message为提示信息
    } catch (error) {
      // 捕获错误对象
      ctx.body = {
        code: 1,
        data: null,
        message: error.message,
      }; // 设置响应体数据，code为1表示失败，data为null，message为错误信息
    }
  },
  async createService(ctx) {
    // 定义创建服务处理器方法，接收ctx作为参数
    try {
      const { type, price, description } = ctx.request.body; // 从请求体数据中解构出服务类型、价格和介绍
      await serviceService.createService(type, price, description); // 调用服务服务模块的创建服务方法，传入服务类型、价格和介绍
      ctx.body = {
        code: 0,
        data: null,
        message: "创建成功",
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