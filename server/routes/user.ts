const Router = require("koa-router"); // 引入koa-router库，用于创建路由对象
const userController = require("../controllers/user"); // 引入用户相关控制器模块

const router = new Router(); // 创建一个路由对象

router.post("/api/login", userController.login); // 定义POST请求的/api/login路由，使用userController.login作为处理器
router.post("/api/register", userController.register); // 定义POST请求的/api/register路由，使用userController.register作为处理器
router.get("/api/user", userController.getUserInfo); // 定义GET请求的/api/user路由，使用userController.getUserInfo作为处理器

module.exports = router; // 导出路由对象