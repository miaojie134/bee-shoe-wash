<template>
  <div class="order">
    <NavBar>订单管理</NavBar>
    <div class="order-list">
      <div
        class="order-item"
        v-for="item in orders"
        :key="item.id"
        @click="$router.push('/order/' + item.id)"
      >
        <div class="order-item-header">
          <div class="order-item-status">{{ item.status }}</div>
          <div class="order-item-date">{{ item.date }}</div>
        </div>
        <div class="order-item-body">
          <img :src="item.service.image" alt="service" />
          <div class="order-item-info">
            <div class="order-item-name">{{ item.service.name }}</div>
            <div class="order-item-price">￥{{ item.service.price }}</div>
          </div>
        </div>
      </div>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "../components/NavBar.vue";
import TabBar from "../components/TabBar.vue";
import { useStore } from "../store";

export default defineComponent({
  name: "Order",
  components: {
    NavBar,
    TabBar,
  },
  setup() {
    const store = useStore();

    const orders = store.getters.orders;

    return {
      orders,
    };
  },
});
</script>

<style scoped lang="scss">
.order {
  height: 100%;
}

.order-list {
  margin: 10px;
}

.order-item {
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 5px;
}

.order-item-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
}

.order-item-status {
  font-size: 14px;
}

.order-item-date {
  font-size: 12px;
}

.order-item-body {
  display: flex;
  align-items: center;
}

.order-item-body img {
  width: 80px;
  height: 80px;
}

.order-item-info {
  margin-left: 10px;
}

.order-item-name {
  font-size: 16px;
}

.order-item-price {
  font-size: 14px;
}
</style>
