<template>
  <div class="register">
    <NavBar>注册</NavBar>
    <div class="register-form">
      <div class="register-input">
        <label for="phone">手机号</label>
        <input
          type="text"
          id="phone"
          v-model.trim="phone"
          placeholder="请输入手机号"
        />
      </div>
      <div class="register-input">
        <label for="password">密码</label>
        <input
          type="password"
          id="password"
          v-model.trim="password"
          placeholder="请输入密码"
        />
      </div>
      <div class="register-button" @click="register">注册</div>
      <div class="register-link" @click="$router.push('/login')">已有账号？去登录</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import NavBar from "../components/NavBar.vue";
import { useStore } from "../store";
import { validatePhone, validatePassword } from "../utils/validate";

export default defineComponent({
  name: "Register",
  components: {
    NavBar,
  },
  setup() {
    const phone = ref("");
    const password = ref("");
    const store = useStore();

    const register = async () => {
      if (!validatePhone(phone.value)) {
        alert("请输入正确的手机号");
        return;
      }
      if (!validatePassword(password.value)) {
        alert("请输入6-20位的密码");
        return;
      }
      try {
        await store.actions.user.register({ phone: phone.value, password: password.value });
        $router.push("/login");
      } catch (error) {
        alert(error.message);
      }
    };

    return {
      phone,
      password,
      register,
    };
  },
});
</script>

<style scoped lang="scss">
.register {
  height: 100%;
}

.register-form {
  margin: 20px;
}

.register-input {
  margin-bottom: 10px;
}

.register-input label {
  display: block;
  font-size: 14px;
}

.register-input input {
  display: block;
  width: 100%;
  height: 40px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  padding: 0 10px;
}

.register-button {
  display: block;
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  background-color: #00a0e9;
  border-radius: 5px;
}

.register-link {
  display: block;
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
</style>
