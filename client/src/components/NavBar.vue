<template>
  <div class="nav-bar">
    <div class="nav-bar-left" @click="$router.back()">
      <img src="../assets/back.svg" alt="back" />
    </div>
    <div class="nav-bar-title">
      <slot></slot>
    </div>
    <div class="nav-bar-right">
      <img src="../assets/menu.svg" alt="menu" @click="showMenu = !showMenu" />
    </div>
    <transition name="fade">
      <div class="nav-bar-menu" v-if="showMenu">
        <ul>
          <li @click="$router.push('/home')">首页</li>
          <li @click="$router.push('/order')">订单管理</li>
          <li @click="$router.push('/profile')">个人中心</li>
          <li @click="logout">退出登录</li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "../store";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "NavBar",
  setup() {
    const showMenu = ref(false);
    const store = useStore();
    const router = useRouter();

    const logout = () => {
      store.actions.user.logout();
      router.push("/login");
    };

    return {
      showMenu,
      logout,
    };
  },
});
</script>

<style scoped lang="scss">
.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding: 0 10px;
  background-color: #f0f0f0;
  border-bottom: 1px solid #e0e0e0;
}

.nav-bar-left,
.nav-bar-right {
  width: 30px;
  height: 30px;
}

.nav-bar-left img,
.nav-bar-right img {
  width: 100%;
  height: 100%;
}

.nav-bar-title {
  font-size: 18px;
  font-weight: bold;
}

.nav-bar-menu {
  position: absolute;
  top: 50px;
  right: 10px;
  width: 120px;
  background-color: #f0f0f0;
  border-radius: 5px;
}

.nav-bar-menu ul {
  list-style: none;
}

.nav-bar-menu li {
  padding: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
