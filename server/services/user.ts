const db = require("../db"); // 引入数据库操作模块

module.exports = {
  async login(phone, password) {
    // 定义登录服务方法，接收手机号和密码作为参数
    const sql = "select * from user where phone = ? and password = ?"; // 定义查询语句，根据手机号和密码查询用户表
    const [rows] = await db.query(sql, [phone, password]); // 调用数据库操作模块的query方法，传入查询语句和参数数组，返回一个结果数组
    if (rows.length > 0) {
      // 如果结果数组长度大于0，表示查询到了匹配的用户记录
      return rows[0]; // 返回结果数组的第一个元素，即用户对象
    } else {
      // 如果结果数组长度等于0，表示没有查询到匹配的用户记录
      throw new Error("手机号或密码错误"); // 抛出一个错误对象，错误信息为"手机号或密码错误"
    }
  },
  async register(phone, password) {
    // 定义注册服务方法，接收手机号和密码作为参数
    const sql1 = "select * from user where phone = ?"; // 定义查询语句，根据手机号查询用户表
    const [rows] = await db.query(sql1, [phone]); // 调用数据库操作模块的query方法，传入查询语句和参数数组，返回一个结果数组
    if (rows.length > 0) {
      // 如果结果数组长度大于0，表示已经存在相同手机号的用户记录
      throw new Error("手机号已被注册"); // 抛出一个错误对象，错误信息为"手机号已被注册"
    } else {
      // 如果结果数组长度等于0，表示没有存在相同手机号的用户记录
      const sql2 = "insert into user (phone, password) values (?, ?)"; // 定义插入语句，向用户表中插入一条新记录，包含手机号和密码
      await db.query(sql2, [phone, password]); // 调用数据库操作模块的query方法，传入插入语句和参数数组
    }
  },
  async getUserInfo() {
    // 定义获取用户信息服务方法
    const sql = "select * from user limit 1"; // 定义查询语句，查询用户表中的第一条记录
    const [rows] = await db.query(sql); // 调用数据库操作模块的query方法，传入查询语句，返回一个结果数组
    if (rows.length > 0) {
      // 如果结果数组长度大于0，表示查询到了用户记录
      return rows[0]; // 返回结果数组的第一个元素，即用户对象
    } else {
      // 如果结果数组长度等于0，表示没有查询到用户记录
      throw new Error("用户不存在"); // 抛出一个错误对象，错误信息为"用户不存在"
    }
  },
};

