<!-- 注册页面 -->
<template>
  <div class="register-page">
  <h1>蜜蜂洗鞋</h1>
  <form class="register-form" @submit.prevent="handleRegister">
  <div class="form-item">
  <label for="phone">手机号</label>
  <input id="phone" type="tel" v-model.trim="phone" placeholder="请输入手机号" required />
  </div>
  <div class="form-item">
  <label for="password">密码</label>
  <input id="password" type="password" v-model.trim="password" placeholder="请输入密码" required />
  </div>
  <div class="form-item">
  <label for="confirm">确认密码</label>
  <input id="confirm" type="password" v-model.trim="confirm" placeholder="请再次输入密码" required />
  </div>
  <button class="register-button" type="submit">注册</button>
  </form>
  <p class="login-link">
  已有账号？<router-link to="/login">返回登录</router-link>
  </p>
  </div>
  </template>
  
  <script lang='ts'>
  import { defineComponent,ref } from "vue";
  import { useRouter } from "vue-router";
  import { register } from "../api/user";
  
  export default defineComponent({
  name: "RegisterPage",
  setup() {
  // 获取路由器实例
  const router = useRouter();
  // 定义表单数据
  const phone = ref("");
  const password = ref("");
  const confirm = ref("");
  // 定义注册处理函数
  const handleRegister = async () => {
  try {
  // 验证两次输入的密码是否一致
  if (password.value !== confirm.value) {
  throw new Error("两次输入的密码不一致");
  }
  // 调用注册接口
  const res = await register(phone.value, password.value);
  // 判断返回结果
  if (res.code === 200) {
  // 注册成功
  // 显示成功信息
  alert(res.message);
  // 跳转到登录页面
  router.push("/login");
  } else {
  // 注册失败
  // 显示错误信息
  alert(res.message);
  }
  } catch (error) {
  // 网络异常或其他错误
  // 显示错误信息
  alert(error.message);
  }
  };
  return {
  phone,
  password,
  confirm,
  handleRegister,
  };
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
  background-color:#00a0e9; /* new Bing主题颜色 */
  color:white;
  border:none;
  }
  
  .login-link{
  margin-top:20px;
  }
  </style>
  
  