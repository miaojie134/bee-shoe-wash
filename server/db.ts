const mysql = require("mysql2/promise"); // 引入mysql2/promise库，用于创建异步的数据库连接池

const pool = mysql.createPool({
  // 创建一个数据库连接池对象
  host: "localhost", // 数据库主机地址
  user: "root", // 数据库用户名
  password: "123456", // 数据库密码
  database: "bee_shoe_wash", // 数据库名称
});

module.exports = {
  async query(sql, params) {
    // 定义query方法，接收sql语句和参数数组作为参数
    const [rows] = await pool.query(sql, params); // 调用连接池对象的query方法，传入sql语句和参数数组，返回一个结果数组
    return rows; // 返回结果数组
  },
};