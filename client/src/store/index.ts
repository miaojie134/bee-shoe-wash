// src/store/index.ts
import { createPinia } from 'pinia'

// 创建pinia实例
export const pinia = createPinia()

export * from './order'
export * from './user'
export * from './pay'
export * from './service'