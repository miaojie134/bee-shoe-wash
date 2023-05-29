const Koa = require('koa') // 引入koa核心库，用于创建koa应用实例
const cors = require('@koa/cors') // 引入koa中间件，用于支持跨域请求的处理
const bodyParser = require('koa-bodyparser') // 引入koa中间件，用于解析请求体中的数据，并将其挂载到ctx.request.body上
const router = require('./routes/index') // 引入路由模块
const app = new Koa() // 创建koa应用实例

app.use(cors()) // 使用cors中间件
app.use(bodyParser()) // 使用bodyParser中间件
app.use(router.routes()) // 使用路由中间件

app.listen(4000, () => { // 监听4000端口，并在启动时打印一条日志
  console.log('Server is running at http://localhost:4000')
})

export default app