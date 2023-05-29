<!-- 登录页面 -->
<template>
  <div class="login-page">
    <h1>蜜蜂洗鞋</h1>
    <form class="login-form" @submit.prevent="handleLogin">
      <div class="form-item">
        <label for="phone">手机号</label>
        <input
          id="phone"
          type="tel"
          v-model.trim="phone"
          placeholder="请输入手机号"
          required
        />
      </div>
      <div class="form-item">
        <label for="password">密码</label>
        <input
          id="password"
          type="password"
          v-model.trim="password"
          placeholder="请输入密码"
          required
        />
      </div>
      <button class="login-button" type="submit">登录</button>
    </form>
    <p class="register-link">
      没有账号？<router-link to="/register">立即注册</router-link>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref } from "vue";
import { useStore } from "pinia";
import { useRouter } from "vue-router";
import { login } from "../api/user.js";

export default defineComponent({
  name: "LoginPage",
  setup() {
    // 获取全局状态管理器
    const store = useStore();
    // 获取路由器实例
    const router = useRouter();
    // 定义表单数据
    const phone = ref("");
    const password = ref("");
    // 定义登录处理函数
    const handleLogin = async () => {
      try {
        // 调用登录接口
        const res = await login(phone.value, password.value);
        // 判断返回结果
        if (res.code === 200) {
          // 登录成功
          // 保存用户信息到全局状态
          store.user = res.data;
          // 跳转到预约服务页面
          router.push("/service");
        } else {
          // 登录失败
          // 显示错误信息
          alert(res.message);
        }
      } catch (error:any) {
        // 网络异常或其他错误
        // 显示错误信息
        alert(error.message);
      }
    };
    return {
      phone,
      password,
      handleLogin,
    };
  },
});
</script>

<style scoped>
.login-page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.login-form {
  width: 80%;
  max-width: 400px;
}

.form-item {
  margin-bottom: 20px;
}

.form-item label {
  display: block;
  font-weight: bold;
}

.form-item input {
  width: 100%;
  height: 40px;
  border: none;
  border-bottom: 1px solid #ccc;
}

.login-button {
  width: 100%;
  height: 40px;
  background-color: #00a0e9; /* new Bing主题颜色 */
  color: white;
  border: none;
}

.register-link {
  margin-top: 20px;
}
</style>
