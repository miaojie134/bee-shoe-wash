const Router = require("koa-router"); // 引入koa-router库，用于创建路由对象
const serviceController = require("../controllers/service"); // 引入服务相关控制器模块

const router = new Router(); // 创建一个路由对象

router.get("/api/service", serviceController.getServices); // 定义GET请求的/api/service路由，使用serviceController.getServices作为处理器
router.post("/api/service", serviceController.createService); // 定义POST请求的/api/service路由，使用serviceController.createService作为处理器

module.exports = router; // 导出路由对象