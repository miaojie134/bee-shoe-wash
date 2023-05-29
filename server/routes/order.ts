const Router = require("koa-router"); // 引入koa-router库，用于创建路由对象
const orderController = require("../controllers/order"); // 引入订单相关控制器模块

const router = new Router(); // 创建一个路由对象

router.post("/api/order", orderController.createOrder); // 定义POST请求的/api/order路由，使用orderController.createOrder作为处理器
router.get("/api/order", orderController.getOrders); // 定义GET请求的/api/order路由，使用orderController.getOrders作为处理器
router.post("/api/pay", orderController.payOrder); // 定义POST请求的/api/pay路由，使用orderController.payOrder作为处理器
router.post("/api/rate", orderController.rateOrder); // 定义POST请求的/api/rate路由，使用orderController.rateOrder作为处理器

module.exports = router; // 导出路由对象