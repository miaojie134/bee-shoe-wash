// 用户模块

// 引入相关模块和工具函数
const Router = require("koa-router");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { query } = require("../utils/db");
const { secret } = require("../config");

// 创建路由器实例
const router = new Router();

// 定义登录接口
router.post("/login", async (ctx) => {
  try {
    // 获取请求参数
    const { phone, password } = ctx.request.body;

    // 验证参数是否合法（省略）

    // 查询数据库中是否存在该手机号对应的用户记录
    const sql = "select * from user where phone=?";
    const result = await query(sql, [phone]);

    if (result.length === 0) {
      // 用户不存在，返回错误信息
      ctx.body = { code: -1, message: "用户不存在，请先注册" };
    } else {
      // 用户存在，比较密码是否正确（使用bcrypt加密）
      const user = result[0];
      if (bcrypt.compareSync(password, user.password)) {
        // 密码正确，生成token（使用jwt）
        const token = jwt.sign({ id: user.id }, secret, { expiresIn: "2h" });
        // 返回成功信息和用户数据（去除密码字段）
        delete user.password;
        ctx.body = { code: 200, message: "登录成功", data: { user, token } };
      } else {
        // 密码错误，返回错误信息
        ctx.body = { code: -2, message: "密码错误，请重新输入" };
      }
    }
  } catch (error) {
    // 捕获异常，返回错误信息
    ctx.body = { code: -3, message: error.message };
  }
});

// 定义注册接口
router.post("/register", async (ctx) => {
  try {
    // 获取请求参数
    const { phone, password } = ctx.request.body;

    // 验证参数是否合法（省略）

    // 查询数据库中是否已存在该手机号对应的用户记录
    const sql1 = "select * from user where phone=?";
    const result1 = await query(sql1, [phone]);

    if (result1.length > 0) {
      // 用户已存在，返回错误信息
      ctx.body = { code: -1, message: "用户已存在，请直接登录" };
    } else {
      // 用户不存在，插入新的用户记录（使用bcrypt加密密码）
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const sql2 = "insert into user (phone,password) values (?,?)";
      const result2 = await query(sql2, [phone, hash]);
      if (result2.affectedRows === 1) {
        // 插入成功，返回成功信息
        ctx.body = { code: 200, message: "注册成功" };
      } else {
        // 插入失败，返回错误信息
        ctx.body = { code: -2, message: "注册失败，请重试" };
      }
    }
  } catch (error) {
    // 捕获异常，返回错误信息
    ctx.body = { code: -3, message: error.message };
  }
});

// 导出路由器实例
module.exports = router;
