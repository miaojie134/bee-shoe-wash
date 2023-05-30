<template>
  <div class="order">
    <NavBar />
    <TabBar />
    <div class="list">
      <div class="item" v-for="order in orders" :key="order.id">
        <div class="header">
          <span class="status">{{ getStatus(order.status) }}</span>
          <span class="time">{{ order.time }}</span>
        </div>
        <div class="content">
          <p>服务类型：{{ getType(order.type) }}</p>
          <p>服务地址：{{ order.address }}</p>
          <p>服务费用：{{ order.price }}元</p>
        </div>
        <div class="footer">
          <button
            class="pay"
            v-if="order.status === 0"
            @click="pay(order.id)"
          >
            支付
          </button>
          <button
            class="comment"
            v-if="order.status === 1"
            @click="comment(order.id)"
          >
            评价
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref, onMounted } from "vue";
import { useOrderStore } from "../store";
import { useRouter } from "vue-router";
import NavBar from "../components/NavBar.vue";
import TabBar from "../components/TabBar.vue";

export default defineComponent({
  name: "Order",
  components: {
    NavBar,
    TabBar,
  },
  setup() {
    const store = useOrderStore();
    const router = useRouter()
    // 用户的订单列表
    const orders = ref([]);

    // 获取订单状态对应的文本
    const getStatus = (status: number) => {
      switch (status) {
        case 0:
          return "待支付";
        case 1:
          return "待评价";
        case 2:
          return "已完成";
        default:
          return "";
      }
    };

    // 获取服务类型对应的文本
    const getType = (type: number) => {
      switch (type) {
        case 1:
          return "标准洗";
        case 2:
          return "深度洗";
        case 3:
          return "消毒洗";
        case 4:
          return "修复洗";
        default:
          return "";
      }
    };

    // 支付操作
    const pay = async (id: number) => {
      try {
        // 调用支付接口
        const res = await store.pay(id);
        if (res.code === 200) {
          // 支付成功，跳转到评价页面
          router.push("/comment");
        } else {
          // 支付失败，提示错误信息
          alert(res.message);
        }
      } catch (error) {
        // 网络异常，提示错误信息
        alert(error.message);
      }
    };

    // 评价操作
    const comment = async (id: number) => {
      try {
        // 跳转到评价页面，传递订单id作为参数
        router.push({ name: "Comment", params: { id } });
      } catch (error) {
        // 网络异常，提示错误信息
        alert(error.message);
      }
    };

    // 获取订单列表
    const getOrderList = async () => {
      try {
        // 调用获取订单列表接口
        const res = await store.getOrderList();
        if (res.code === 200) {
          // 获取成功，更新订单列表数据
          orders.value = res.data;
        } else {
          // 获取失败，提示错误信息
          alert(res.message);
        }
      } catch (error) {
        // 网络异常，提示错误信息
        alert(error.message);
      }
    };

    // 在组件创建时获取订单列表
    onMounted(() => {
      getOrderList();
    });

    return {
      orders,
      getStatus,
      getType,
      pay,
      comment,
    };
  },
});
</script>

<style scoped>
.order {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.list {
  margin-top: 50px;
  width: 80%;
}

.item {
  margin-bottom: 20px;
  border: 1px solid #cccccc;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
}

.status {
  margin-left: 10px;
}

.time {
  margin-right: 10px;
}

.content {
  padding: 10px;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.pay,
.comment {
  margin-right: 10px;
}
</style>
