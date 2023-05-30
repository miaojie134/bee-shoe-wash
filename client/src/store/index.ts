import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate' //导入持久化插件

// 导入各个模块
export * from './user'  
export * from './order'  
export * from './service'


 
// 创建pinia实例
const pinia = createPinia()
// 使用pinia插件
pinia.use(persist)
// 导出pinia实例，给main使用
export default pinia
