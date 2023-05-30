<template>
  <div class="order-detail">
    <NavBar>订单详情</NavBar>
    <div class="order-detail-content">
      <div class="order-detail-header">
        <div class="order-detail-status">{{ order.status }}</div>
        <div class="order-detail-date">{{ order.date }}</div>
      </div>
      <div class="order-detail-body">
        <img :src="order.service.image" alt="service" />
        <div class="order-detail-info">
          <div class="order-detail-name">{{ order.service.name }}</div>
          <div class="order-detail-price">￥{{ order.service.price }}</div>
        </div>
      </div>
      <div class="order-detail-address">
        <label>服务地址</label>
        <p>{{ order.address }}</p>
      </div>
      <div class="order-detail-action" v-if="order.status === '待支付'">
        <div class="order-detail-pay" @click="pay">支付</div>
        <div class="order-detail-cancel" @click="cancel">取消</div>
      </div>
      <div class="order-detail-action" v-else-if="order.status === '待评价'">
        <div class="order-detail-rate" @click="$router.push('/rate/' + order.id)">
          评价
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "../components/NavBar.vue";
import { useOrderStore } from "../store";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "OrderDetail",
  components: {
    NavBar,
  },
  setup() {
    const store = useOrderStore();
    const route = useRoute();

    const orderId = route.params.id;
    const order = store.getters.orderById(orderId);

    const pay = async () => {
      try {
        await store.actions.order.pay(orderId);
        alert("支付成功");
      } catch (error) {
        alert(error.message);
      }
    };

    const cancel = async () => {
      try {
        await store.actions.order.cancel(orderId);
        alert("取消成功");
      } catch (error) {
        alert(error.message);
      }
    };

    return {
      order,
      pay,
      cancel,
    };
  },
});
</script>

<style scoped lang="scss">
.order-detail {
  height: 100%;
}

.order-detail-content {
  margin: 10px;
  background-color: #fff;
  border-radius: 5px;
}

.order-detail-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
}

.order-detail-status {
  font-size: 14px;
}

.order-detail-date {
  font-size: 12px;
}

.order-detail-body {
  display: flex;
  align-items: center;
}

.order-detail-body img {
  width: 80px;
  height: 80px;
}

.order-detail-info {
  margin-left: 10px;
}

.order-detail-name {
  font-size: 16px;
}

.order-detail-price {
  font-size: 14px;
}

.order-detail-address {
  padding: 10px;
}

.order-detail-address label {
  display: block;
  font-size: 14px;
}

.order-detail-address p {
  margin-top: 5px;
}

.order-detail-action {
  display: flex;
}

.order-detail-pay,
.order-detail-cancel,
.order-detail-rate {
  flex: 1;
  height: 40px;
  line-height: 40px;
  text-align: center;
}

.order-detail-pay {
  color: #fff;
  background-color: #00a0e9;
}

.order-detail-cancel {
  color: #fff;
  background-color: #f44336;
}

.order-detail-rate {
  color: #fff;
  background-color: #4caf50;
}
</style>
