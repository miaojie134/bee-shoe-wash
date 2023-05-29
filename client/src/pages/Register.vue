<!-- 注册页面 -->
<template>
  <div class="register">
    <h1>蜜蜂洗鞋</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="phone">手机号</label>
        <input type="tel" id="phone" v-model.trim="phone" placeholder="请输入手机号" required />
      </div>
      <div class="form-group">
        <label for="password">密码</label>
        <input type="password" id="password" v-model.trim="password" placeholder="请输入密码" required />
      </div>
      <button type="submit" class="btn btn-primary">注册</button>
    </form>
    <p class="link">
      已有账号？<router-link to="/login">立即登录</router-link>
    </p>
  </div>
</template>
  
<script lang="ts">
import { defineComponent } from "vue";
import { useUserStore } from "../stores/user"; // 引入用户状态管理模块
import { useRouter } from "vue-router"; // 引入路由模块
export default defineComponent({
  name: "Register",
  data() {
    return {
      phone: "", // 手机号
      password: "", // 密码
    };
  },
  methods: {
    async handleSubmit() {
      // 处理表单提交事件
      try {
        const userStore = useUserStore(); // 获取用户状态管理对象
        const router = useRouter(); // 获取路由对象
        await userStore.register(this.phone, this.password); // 调用用户状态管理对象的注册方法，传入手机号和密码
        router.push("/login"); // 注册成功后，跳转到登录页面
      } catch (error) {
        // 注册失败后，弹出错误提示
        alert(error.message);
      }
    },
  },
});
</script>
  
<style scoped>
.register-page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.register-form {
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

.register-button {
  width: 100%;
  height: 40px;
  background-color: #00a0e9;
  /* new Bing主题颜色 */
  color: white;
  border: none;
}

.login-link {
  margin-top: 20px;
}
</style>
  
  