<template>
  <div class="tab-bar">
    <div class="item" @click="goToService">
      <img
        src="../assets/service.png"
        alt="service"
        :class="{ active: isActive('/service') }"
      />
      <span :class="{ active: isActive('/service') }">预约服务</span>
    </div>
    <div class="item" @click="goToOrder">
      <img
        src="../assets/order.png"
        alt="order"
        :class="{ active: isActive('/order') }"
      />
      <span :class="{ active: isActive('/order') }">订单管理</span>
    </div>
    <div class="item" @click="goToProfile">
      <img
        src="../assets/profile.png"
        alt="profile"
        :class="{ active: isActive('/profile') }"
      />
      <span :class="{ active: isActive('/profile') }">个人中心</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "TabBar",
  setup() {
    // 获取当前路由对象
    const route = useRoute();

    // 获取路由实例
    const router = useRouter();

    // 判断当前路由路径是否与给定的路径匹配
    const isActive = (path: string) => {
      return route.path === path;
    };

    // 跳转到预约服务页面
    const goToService = () => {
      router.push("/service");
    };

    // 跳转到订单管理页面
    const goToOrder = () => {
      router.push("/order");
    };

    // 跳转到个人中心页面
    const goToProfile = () => {
      router.push("/profile");
    };

    return {
      isActive,
      goToService,
      goToOrder,
      goToProfile,
    };
  },
});
</script>

<style scoped>
.tab-bar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50px;
}

.item {
  display: flex;
  flex-direction: column;
}

.item img {
  width: 30px;
  height: 30px;
}

.item span {
  margin-top: 5px;
}

.active {
  color: #0078d4;
}
</style>
