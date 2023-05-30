// utils.ts
// 定义一些常用的工具函数

// 格式化时间
export function formatTime(time: string) {
  // 你可以根据你的需求修改这个函数的逻辑
  return time.slice(0, 16).replace('T', ' ')
}

// 格式化价格
export function formatPrice(price: number) {
  // 你可以根据你的需求修改这个函数的逻辑
  return `￥${price.toFixed(2)}`
}

// 验证手机号
export function validatePhone(phone: string) {
  // 你可以根据你的需求修改这个函数的逻辑
  const reg = /^1[3-9]\d{9}$/
  return reg.test(phone)
}

// 验证密码
export function validatePassword(password: string) {
  // 你可以根据你的需求修改这个函数的逻辑
  const reg = /^\w{6,20}$/
  return reg.test(password)
}
