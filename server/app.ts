const Koa = require("koa"); // 引入koa库，用于创建web服务器实例
const bodyParser = require("koa-bodyparser"); // 引入koa-bodyparser库，用于解析请求体数据
const cors = require("@koa/cors"); // 引入@koa/cors库，用于处理跨域请求

const userRouter = require("./routes/user"); // 引入用户相关路由模块

const app = new Koa(); // 创建一个koa实例

app.use(bodyParser()); // 使用koa-bodyparser中间件，解析请求体数据并挂载到ctx.request.body上
app.use(cors()); // 使用@koa/cors中间件，允许跨域请求

app.use(userRouter.routes()); // 使用用户相关路由中间件

app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000"); // 在控制台打印服务器启动信息
});