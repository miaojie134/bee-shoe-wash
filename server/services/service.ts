const db = require("../db"); // 引入数据库操作模块

module.exports = {
  async getServices() {
    // 定义获取服务服务方法
    const sql = "select * from service"; // 定义查询语句，查询所有的服务记录
    const [rows] = await db.query(sql); // 调用数据库操作模块的query方法，传入查询语句，返回一个结果数组
    return rows; // 返回结果数组
  },
  async createService(type, price, description) {
    // 定义创建服务服务方法，接收服务类型、价格和介绍作为参数
    const sql = "insert into service (type, price, description) values (?, ?, ?)"; // 定义插入语句，向服务表中插入一条新记录，包含服务类型、价格和介绍
    await db.query(sql, [type, price, description]);
  }
}