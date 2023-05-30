<template>
  <div class="nav-bar">
    <button class="back" @click="goBack">⬅️</button>
    <span class="title">{{ title }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref,watch,onMounted } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "NavBar",
  setup() {
    // 获取当前路由对象
    const route = useRoute();

    // 获取当前页面的标题
    const title = ref("");

    // 根据不同的路由路径设置不同的标题
    const setTitle = () => {
      switch (route.path) {
        case "/login":
          title.value = "登录";
          break;
        case "/register":
          title.value = "注册";
          break;
        case "/service":
          title.value = "预约服务";
          break;
        case "/order":
          title.value = "订单管理";
          break;
        case "/pay":
          title.value = "支付";
          break;
        case "/comment":
          title.value = "评价";
          break;
        case "/profile":
          title.value = "个人中心";
          break;
        default:
          title.value = "";
      }
    };

    // 返回上一页操作
    const goBack = () => {
      window.history.back();
    };

    // 在路由变化时设置标题
    watch(route, () => {
      setTitle();
    });

    // 在组件创建时设置标题
    onMounted(() => {
      setTitle();
    });

    return {
      title,
      goBack,
    };
  },
});
</script>

<style scoped>
.nav-bar {
  display: flex;
  align-items: center;
  height: 50px;
}

.back {
  margin-left: 10px;
}

.title {
  margin-left: 20px;
}
</style>
