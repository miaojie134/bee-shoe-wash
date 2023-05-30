<template>
  <div class="login">
    <NavBar>登录</NavBar>
    <div class="login-form">
      <div class="login-input">
        <label for="phone">手机号</label>
        <input type="text" id="phone" v-model.trim="phone" placeholder="请输入手机号" />
      </div>
      <div class="login-input">
        <label for="password">密码</label>
        <input type="password" id="password" v-model.trim="password" placeholder="请输入密码" />
      </div>
      <div class="login-button" @click="login">登录</div>
      <div class="login-link" @click="$router.push('/register')">没有账号？去注册</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import NavBar from "../components/NavBar.vue";
import { useStore } from "../store";
import { validatePhone, validatePassword } from "../utils/validate";

export default defineComponent({
  name: "Login",
  components: {
    NavBar,
  },
  setup() {
    const phone = ref("");
    const password = ref("");
    const store = useStore();

    const login = async () => {
      if (!validatePhone(phone.value)) {
        alert("请输入正确的手机号");
        return;
      }
      if (!validatePassword(password.value)) {
        alert("请输入6-20位的密码");
        return;
      }
      try {
        await store.actions.user.login({ phone: phone.value, password: password.value });
        $router.push("/home");
      } catch (error) {
        alert(error.message);
      }
    };

    return {
      phone,
      password,
      login,
    };
  },
});
</script>

<style scoped lang="scss">
.login {
  height: 100%;
}

.login-form {
  margin: 20px;
}

.login-input {
  margin-bottom: 10px;
}

.login-input label {
  display: block;
  font-size: 14px;
}

.login-input input {
  display: block;
  width: 100%;
  height: 40px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  padding: 0 10px;
}

.login-button {
  display: block;
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  background-color: #00a0e9;
  border-radius: 5px;
}

.login-link {
  display: block;
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
</style>
