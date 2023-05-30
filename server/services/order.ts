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
  async payOrder(id) {
    // 定义支付订单服务方法，接收订单id作为参数
    const sql = "update order set status = '已支付' where id = ?"; // 定义更新语句，根据订单id更新订单表中的状态字段为'已支付'
    await db.query(sql, [id]); // 调用数据库操作模块的query方法，传入更新语句和参数数组
  },
  async rateOrder(id, rating, comment) {
    // 定义评价订单服务方法，接收订单id、评分和评论作为参数
    const sql = "update order set rating = ?, comment = ? where id = ?"; // 定义更新语句，根据订单id更新订单表中的评分和评论字段
    await db.query(sql, [rating, comment, id]); // 调用数据库操作模块的query方法，传入更新语句和参数数组
  },
};