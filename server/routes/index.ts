import Router from '@koa/router' // 引入koa路由库，用于定义和处理路由请求 
import userController from '../controllers/user' // 引入用户控制器模块

const router = new Router() // 创建路由实例

router.prefix('/api') // 设置路由前缀为/api

router.post('/login', userController.login) // 定义post请求到/login路径，并使用userController.login方法处理 
router.post('/register', userController.register) // 定义post请求到/register路径，并使用userController.register方法处理 


export default router