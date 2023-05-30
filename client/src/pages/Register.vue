
<template>
  <!-- 定义一个注册页面组件，用于展示和交互注册表单 -->
  <div class="register-container">
    <!-- 定义一个标题，显示应用名称 -->
    <h1 class="title">蜜蜂洗鞋</h1>
    <!-- 定义一个表单，用于输入手机号和密码 -->
    <form class="form" @submit.prevent="submitForm">
      <!-- 定义一个手机号输入框，绑定手机号数据，并添加校验规则 -->
      <div class="form-item">
        <input type="text" v-model="phone" placeholder="请输入手机号" required pattern="^1[3-9]\d{9}$" />
      </div>
      <!-- 定义一个密码输入框，绑定密码数据，并添加校验规则 -->
      <div class="form-item">
        <input type="password" v-model="password" placeholder="请输入密码" required minlength="6" />
      </div>
      <!-- 定义一个确认密码输入框，绑定确认密码数据，并添加校验规则 -->
      <div class="form-item">
        <input type="password" v-model="confirmPassword" placeholder="请确认密码" required minlength="6" />
      </div>
      <!-- 定义一个注册按钮，点击时触发提交表单方法 -->
      <div class="form-item">
        <button type="submit" :disabled="!phone || !password">注册</button>
      </div>
      <!-- 定义一个登录链接，点击时跳转到登录页面 -->
      <div class="form-item">
        <a href="/login">已有账号？去登录</a>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
// 引入vue相关的库和函数
import { defineComponent, ref } from 'vue'
// 引入路由对象和状态管理对象
import { useRouter } from 'vue-router'
import { useUserStore } from '../store'

// 定义注册页面组件的选项
export default defineComponent({
  // 定义组件的状态，用于存储和操作数据
  setup() {
    // 获取路由对象
    const router = useRouter()
    // 获取用户状态管理对象
    const userStore = useUserStore()
    // 定义一个响应式数据，用于存储手机号
    const phone = ref<string>('')
    // 定义一个响应式数据，用于存储密码
    const password = ref<string>('')
    // 定义一个响应式数据，用于存储确认密码
    const confirmPassword = ref<string>('')

    // 定义一个方法，用于提交表单，并调用注册接口进行注册，如果成功，跳转到登录页面
    const submitForm = async () => {
      // 判断密码和确认密码是否一致
      if (password.value !== confirmPassword.value) {
        // 如果不一致，弹出错误信息，并返回
        alert('两次输入的密码不一致')
        return
      }
      // 调用用户状态管理对象的注册方法，传递手机号和密码，并获取返回结果
      const result = await userStore.register(phone.value, password.value)
      // 判断返回结果是否成功
      if (result === '注册成功') {
        // 如果成功，跳转到登录页面，并传递成功的提示信息
        router.push({ path: '/login', query: { message: result } })
      } else {
        // 如果失败，弹出错误信息
        alert(result)
      }
    }

    // 返回需要在模板中使用的数据和方法
    return {
      phone,
      password,
      confirmPassword,
      submitForm
    }
  }
})
</script>
  
<style scoped>
/* 定义组件的样式 */
.register-container {
  /* 注册容器样式 */
  width: 80%;
  max-width: 400px;
  margin: auto;
  padding-top: 50px;
}

.title {
  /* 标题样式 */
  text-align: center;
  font-size: 32px;
  color: #333;
  margin-bottom: 20px;
}

.form {
  /* 表单样式 */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-item {
  /* 表单项样式 */
  width: 100%;
  margin-bottom: 10px;
}

.form-item input {
  /* 输入框样式 */
  width: 100%;
  height: 40px;
  border: none;
  border-bottom: 1px solid #ccc;
  padding: 0 10px;
}

.form-item button {
  /* 按钮样式 */
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: #fff;
}

.form-item a {
  /* 链接样式 */
  color: #333;
  text-decoration: none;
}
</style>