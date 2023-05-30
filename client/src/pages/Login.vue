<template>
  <div class="login-container">
    <h1 class="title">蜜蜂洗鞋</h1>
    <form class="form" @submit.prevent="submitForm">
      <div class="form-item">
        <input type="text" v-model="phone" placeholder="请输入手机号" required pattern="^1[3-9]\d{9}$" />
      </div>
      <div class="form-item">
        <input type="password" v-model="password" placeholder="请输入密码" required minlength="6" />
      </div>
      <div class="form-item">
        <button type="submit">登录</button>
      </div>
      <div class="form-item">
        <a href="/register">没有账号？去注册</a>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store';

// 定义登录页面组件的选项 
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

    // 定义一个方法，用于提交表单，并调用登录接口进行验证，如果成功，跳转到首页或者之前的页面 
    const submitForm = async () => {
      // 调用用户状态管理对象的登录方法，传递手机号和密码，并获取返回结果 
      const result = await userStore.login(phone.value, password.value)
      // 判断返回结果是否成功 
      if (result) {
        // 如果成功，获取路由参数中的redirect属性，如果存在，则跳转到该路径，否则跳转到首页 
        const redirect = router.currentRoute.value.query.redirect as string | undefined
        router.push(redirect || '/home')
      } else {
        // 如果失败，弹出错误信息 
        alert(result)
      }
    }
    // 返回需要在模板中使用的数据和方法 
    return { phone, password, submitForm }
  }
}
)
</script>
<style scoped>
/* 定义组件的样式 */
.login-container {
  /* 登录容器样式 */
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