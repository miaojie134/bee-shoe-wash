<template>
  <div class="service">
    <h1>预约服务</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="type">服务类型</label>
        <select id="type" v-model="type" required>
          <option value="">请选择服务类型</option>
          <option value="普通洗鞋">普通洗鞋</option>
          <option value="高级洗鞋">高级洗鞋</option>
          <option value="专业洗鞋">专业洗鞋</option>
        </select>
      </div>
      <div class="form-group">
        <label for="time">服务时间</label>
        <input
          type="datetime-local"
          id="time"
          v-model="time"
          placeholder="请选择服务时间"
          required
        />
      </div>
      <div class="form-group">
        <label for="address">服务地址</label>
        <input
          type="text"
          id="address"
          v-model.trim="address"
          placeholder="请输入服务地址"
          required
        />
        <button type="button" class="btn btn-secondary" @click="showMap">
          在地图上选择
        </button>
      </div>
      <button type="submit" class="btn btn-primary">下单</button>
    </form>
    <!-- 省略地图组件的代码 -->
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useOrderStore } from "../stores/order"; // 引入订单状态管理模块
import { useRouter } from "vue-router"; // 引入路由模块
export default defineComponent({
  name: "Service",
  data() {
    return {
      type: "", // 服务类型
      time: "", // 服务时间
      address: "", // 服务地址
    };
  },
  methods: {
    async handleSubmit() {
      // 处理表单提交事件
      try {
        const orderStore = useOrderStore(); // 获取订单状态管理对象
        const router = useRouter(); // 获取路由对象
        await orderStore.createOrder(this.type, this.time, this.address); // 调用订单状态管理对象的创建订单方法，传入服务类型、时间和地址
        router.push("/order"); // 创建订单成功后，跳转到订单管理页面
      } catch (error) {
        // 创建订单失败后，弹出错误提示
        alert(error.message);
      }
    },
    showMap() {
      // 显示地图组件的方法
      // 省略地图组件的逻辑代码
    },
  },
});
</script>
<style scoped>
/* 省略样式代码 */
</style>