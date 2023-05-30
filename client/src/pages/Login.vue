<template>
  <div class="login">
    <NavBar />
    <div class="logo">
      <img src="../assets/logo.png" alt="logo" />
    </div>
    <div class="form">
      <div class="input-group">
        <label for="phone">手机号</label>
        <input
          id="phone"
          type="tel"
          v-model="phone"
          placeholder="请输入手机号"
          @input="validatePhone"
        />
        <span class="error" v-if="phoneError">{{ phoneError }}</span>
      </div>
      <div class="input-group">
        <label for="password">密码</label>
        <input
          id="password"
          type="password"
          v-model="password"
          placeholder="请输入密码"
          @input="validatePassword"
        />
        <span class="error" v-if="passwordError">{{ passwordError }}</span>
      </div>
      <button class="submit" :disabled="!isValid" @click="login">登录</button>
      <p class="register">
        没有账号？<router-link to="/register">立即注册</router-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../store";
import NavBar from "../components/NavBar.vue";

export default defineComponent({
  name: "Login",
  components: {
    NavBar,
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    // 用户输入的手机号
    const phone = ref("");

    // 用户输入的密码
    const password = ref("");

    // 手机号错误信息
    const phoneError = ref("");

    // 密码错误信息
    const passwordError = ref("");

    // 表单是否有效
    const isValid = ref(false);

    // 验证手机号格式
    const validatePhone = () => {
      const reg = /^1[3-9]\d{9}$/;
      if (!phone.value) {
        phoneError.value = "手机号不能为空";
      } else if (!reg.test(phone.value)) {
        phoneError.value = "手机号格式不正确";
      } else {
        phoneError.value = "";
      }
      checkValidity();
    };

    // 验证密码长度
    const validatePassword = () => {
      if (!password.value) {
        passwordError.value = "密码不能为空";
      } else if (password.value.length < 6 || password.value.length > 16) {
        passwordError.value = "密码长度应为6-16位";
      } else {
        passwordError.value = "";
      }
      checkValidity();
    };

    // 检查表单是否有效
    const checkValidity = () => {
      isValid.value = !phoneError.value && !passwordError.value;
    };

    // 登录操作
    const login = async () => {
      try {
        // 调用登录接口
        const res = await store.login(phone.value, password.value);
        if (res.code === 200) {
          // 登录成功，跳转到预约服务页面
          router.push("/service");
        } else {
          // 登录失败，提示错误信息
          alert(res.message);
        }
      } catch (error) {
        // 网络异常，提示错误信息
        alert(error.message);
      }
    };

    return {
      phone,
      password,
      phoneError,
      passwordError,
      isValid,
      validatePhone,
      validatePassword,
      login,
    };
  },
});
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  margin-top: 50px;
}

.logo img {
  width: 100px;
  height: 100px;
}

.form {
  margin-top: 50px;
  width: 80%;
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  font-size: 14px;
}

.input-group input {
  display: block;
  width: 100%;
  height: 40px;
  border: none;
  border-bottom: 1px solid #cccccc;
}

.error {
  display: block;
  margin-top: 5px;
  font-size: 12px;
  color: red;
}

.submit {
  display: block;
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 20px;
  background-color: #0078d4;
  color: white;
}

.submit:disabled {
  opacity: 0.5;
}

.register {
  margin-top: 20px;
}

.register a {
  color: #0078d4;
}
</style>
