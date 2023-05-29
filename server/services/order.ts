const db = require("../db"); // 引入数据库操作模块

module.exports = {
  async createOrder(type, time, address) {
    // 定义创建订单服务方法，接收服务类型、时间和地址作为参数
    const sql = "insert into order (type, time, address) values (?, ?, ?)"; // 定义插入语句，向订单表中插入一条新记录，包含服务类型、时间和地址
    await db.query(sql, [type, time, address]); // 调用数据库操作模块的query方法，传入插入语句和参数数组
  },
  async getOrders() {
    // 定义获取订单服务方法
    const sql = "select * from order"; // 定义查询语句，查询所有的订单记录
    const [rows] = await db.query(sql); // 调用数据库操作模块的query方法，传入查询语句，返回一个结果数组
    return rows; // 返回结果数组
  },
};