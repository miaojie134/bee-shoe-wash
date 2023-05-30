<template>
  <div class="home">
    <div class="home-banner">
      <img src="../assets/banner.jpg" alt="banner" />
    </div>
    <div class="home-service">
      <div class="home-service-title">我们的服务</div>
      <div class="home-service-list">
        <div
          class="home-service-item"
          v-for="item in services"
          :key="item.id"
          @click="$router.push('/book/' + item.id)"
        >
          <img :src="item.image" alt="service" />
          <div class="home-service-item-name">{{ item.name }}</div>
          <div class="home-service-item-price">￥{{ item.price }}</div>
        </div>
      </div>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TabBar from "../components/TabBar.vue";
import { useStore } from "../store";

export default defineComponent({
  name: "Home",
  components: {
    TabBar,
  },
  setup() {
    const store = useStore();

    const services = store.getters.services;

    return {
      services,
    };
  },
});
</script>

<style scoped lang="scss">
.home {
  height: 100%;
}

.home-banner {
  width: 100%;
}

.home-banner img {
  width: 100%;
}

.home-service {
  margin: 10px;
}

.home-service-title {
  font-size: 18px;
  font-weight: bold;
}

.home-service-list {
  display: flex;
  flex-wrap: wrap;
}

.home-service-item {
  width: calc(50% - 10px);
  margin: 5px;
}

.home-service-item img {
  width: 100%;
}

.home-service-item-name {
  font-size: 14px;
}
</style>
