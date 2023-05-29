<template>
  <div class="login">
    <h1>用户登录</h1>
    <form @submit.prevent="handleLogin"> <!-- 使用表单元素，并阻止默认的提交行为 -->
      <div class="form-item"> <!-- 使用div元素作为表单项的容器 -->
        <label for="phone">手机号</label> <!-- 使用label元素作为表单项的标签，并指定for属性为对应的输入元素的id -->
        <input id="phone" type="tel" v-model="phone"> <!-- 使用input元素作为输入框，并指定type属性为tel，表示电话号码输入，并使用v-model指令绑定phone变量 -->
      </div>
      <div class="form-item">
        <label for="password">密码</label>
        <input id="password" type="password" v-model="password">
        <!-- 使用input元素作为输入框，并指定type属性为password，表示密码输入，并使用v-model指令绑定password变量 -->
      </div>
      <button type="submit">登录</button> <!-- 使用button元素作为提交按钮，并指定type属性为submit，表示提交表单 -->
    </form>
    <p>没有账号？<router-link to="/register">立即注册</router-link></p> <!-- 使用router-link组件作为导航链接，并指定to属性为注册页面的路由路径 -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue' // 引入vue核心库，用于定义组件和创建响应式变量
import { useStore } from 'pinia' // 引入pinia核心库，用于使用状态管理实例
import { useRouter } from 'vue-router' // 引入vue-router核心库，用于使用路由实例
import userStore from '@/store/user' // 引入用户状态管理模块

export default defineComponent({
  name: 'Login',
  setup() { // 使用setup函数定义组件逻辑
    const phone = ref('') // 创建一个响应式变量，表示手机号，默认值为空字符串
    const password = ref('') // 创建一个响应式变量，表示密码，默认值为空字符串
    const store = useStore(userStore) // 使用用户状态管理实例
    const router = useRouter() // 使用路由实例

    // 定义一个函数，用于处理表单提交事件
    const handleLogin = async () => {
      // 这里省略了表单验证的过程，假设所有的表单项都已经填写完整并且合法
      await store.login(phone.value, password.value) // 调用用户状态管理模块中的login方法，并传入phone.value和password.value作为参数，表示手机号和密码
      router.push('/') // 跳转到首页
    }

    return { // 返回所有需要在模板中使用的变量和函数
      phone,
      password,
      handleLogin
    }
  }
})
</script>

<style lang="less" scoped>
.login {
  padding: 20px;
}

.form-item {
  margin-bottom: 20px;
}

.form-item label {
  display: block;
  margin-bottom: 10px;
}

.form-item input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
}

button {
  width: 100%;
  padding: 10px;
  border: none;
  background-color: #1890ff;
  color: white;
}
</style>