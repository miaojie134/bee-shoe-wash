<template>
  <div class="tab-bar">
    <div
      class="tab-bar-item"
      v-for="item in items"
      :key="item.name"
      :class="{ active: item.name === $route.name }"
      @click="$router.push(item.path)"
    >
      <img :src="item.icon" alt="icon" />
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TabBar",
  data() {
    return {
      items: [
        {
          name: "Home",
          path: "/home",
          icon: "../assets/home.svg",
          label: "首页",
        },
        {
          name: "Order",
          path: "/order",
          icon: "../assets/order.svg",
          label: "订单管理",
        },
        {
          name: "Profile",
          path: "/profile",
          icon: "../assets/profile.svg",
          label: "个人中心",
        },
      ],
    };
  },
});
</script>

<style scoped lang="scss">
.tab-bar {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 50px;
  background-color: #f0f0f0;
  border-top: 1px solid #e0e0e0;
}

.tab-bar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tab-bar-item img {
  width: 20px;
  height: 20px;
}

.tab-bar-item span {
  font-size: 12px;
}

.active {
  color: #00a0e9;
}
</style>
