<template>
  <!-- 定义一个订单页面组件，用于展示和交互订单列表 -->
  <div class="order-container"> <!-- 定义一个标题，显示应用名称 -->
    <h1 class="title">蜜蜂洗鞋</h1> <!-- 定义一个订单列表，循环渲染订单数据 -->
    <ul class="order-list">
      <li v-for="(order, index) in orders" :key="index" class="order-item"> <!-- 定义一个订单项，显示订单信息 -->
        <div class="order-info"> <!-- 显示订单编号 -->
          <p>订单编号：{{ order.id }}</p> <!-- 显示服务类型 -->
          <p>服务类型：{{ order.serviceType }}</p> <!-- 显示预约时间 -->
          <p>预约时间：{{ order.time }}</p> <!-- 显示预约地址 -->
          <p>预约地址：{{ order.address }}</p>
        </div>
        <div class="order-action"> <!-- 根据订单状态显示不同的操作按钮 --> <button v-if="order.status === '待支付'"
            @click="payOrder(order)">去支付</button> <button v-else-if="order.status === '待服务'"
            @click="cancelOrder(order)">取消订单</button> <button v-else-if="order.status === '已完成'" disabled>已完成</button>
          <button v-else-if="order.status === '已取消'" disabled>已取消</button>
        </div>
      </li>
    </ul> <!-- 定义一个支付弹窗，用于展示和扫描支付二维码 -->
    <div class="pay-modal" v-if="showModal"> <!-- 引入二维码组件，并传递支付二维码数据 -->
      <Qrcode :value="payCode" /> <!-- 定义一个关闭按钮，点击时隐藏支付弹窗 --> <button class="close-btn" @click="hidePay">关闭</button>
    </div>
  </div>
</template>
<script lang="ts">
// 引入vue相关的库和函数
import { defineComponent, onMounted, ref } from 'vue'
// 引入路由对象和状态管理对象
import { useRouter } from 'vue-router'
import { useOrderStore, usePayStore } from '../store'
// 引入二维码组件
import Qrcode from '../components/Qrcode.vue'

// 定义订单页面组件的选项
export default defineComponent({
  // 定义组件的属性
  props: {},
  // 定义组件的状态，用于存储和操作数据
  setup() {
    // 获取路由对象
    const router = useRouter()
    // 获取订单状态管理对象
    const orderStore = useOrderStore()
    // 获取支付状态管理对象
    const payStore = usePayStore()
    // 定义一个响应式数据，用于控制支付弹窗的显示和隐藏
    const showModal = ref<boolean>(false)

    // 定义一个方法，用于获取订单列表，并调用获取订单列表接口获取订单数据，并保存到状态中
    const getOrders = async () => {
      // 调用订单状态管理对象的获取订单列表方法，并获取返回结果
      const result = await orderStore.getOrders()
      // 判断返回结果是否成功
      if (result !== '获取订单列表成功') {
        // 如果失败，弹出错误信息
        alert(result)
      }
    }

    // 定义一个方法，用于支付订单，并调用获取支付二维码接口获取支付二维码，并保存到状态中，并显示支付弹窗
    const payOrder = async (order: any) => {
      // 调用支付状态管理对象的获取支付二维码方法，传递订单id，并获取返回结果
      const result = await payStore.getPayCode(order.id)
      // 判断返回结果是否成功
      if (result === '获取支付二维码成功') {
        // 如果成功，将支付弹窗的显示状态设为true
        showModal.value = true
      } else {
        // 如果失败，弹出错误信息
        alert(result)
      }
    }

    // 定义一个方法，用于取消订单，并调用取消订单接口取消订单，并重新获取订单列表
    const cancelOrder = async (order: any) => {
      // 调用订单状态管理对象的取消订单方法，传递订单id，并获取返回结果
      const result = await orderStore.cancelOrder(order.id)
      // 判断返回结果是否成功
      if (result === '取消订单成功') {
        // 如果成功，重新获取订单列表
        getOrders()
      } else {
        // 如果失败，弹出错误信息
        alert(result)
      }
    }

    // 定义一个方法，用于隐藏支付弹窗，并清空状态中的支付二维码，并重新获取订单列表
    const hidePay = async () => {
      // 将支付弹窗的显示状态设为false
      showModal.value = false
      // 调用支付状态管理对象的支付成功回调方法，传递当前订单id，并获取返回结果（此处为模拟支付成功）
      const result = await payStore.paySuccess(orderStore.currentOrder.id)
      // 判断返回结果是否成功（此处一定为成功）
      if (result === '支付成功') {
        // 如果成功，重新获取订单列表
        getOrders()
      }
    }

    // 在组件挂载后，调用获取订单列表方法，并判断路由参数中是否有提示信息，如果有，则弹出提示信息
    onMounted(() => {
      getOrders()
      const message = router.currentRoute.value.query.message as string | undefined
      if (message) {
        alert(message)
      }
    })

    // 返回需要在模板中使用的数据和方法
    return {
      // 订单列表数据，从订单状态管理对象中获取
      orders: orderStore.orders,
      // 支付二维码数据，从支付状态管理对象中获取
      payCode: payStore.payCode,
      // 支付弹窗显示状态
      showModal,
      // 支付订单方法
      payOrder,
      // 取消订单方法
      cancelOrder,
      // 隐藏支付弹窗方法
      hidePay
    }
  }
})
</script>
<style scoped>
/* 定义组件的样式 */
.order-container {
  /* 订单容器样式 */
  width: 80%;
  max-width: 400px;
  margin: auto;
  padding-top: 50px;
}

.title {
  /* 标题样式 */
  text-align: center;
  font-size: 32px;
  color: #333;
  margin-bottom: 20px;
}

.order-list {
  /* 订单列表样式 */
  list-style: none;
}

.order-item {
  /* 订单项样式 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.order-info {
  /* 订单信息样式 */
  display: flex;
  flex-direction: column;
}

.order-info p {
  /* 订单信息段落样式 */
  margin: 0;
  padding: 0;
  color: #333;
  font-size: 14px;
}

.order-action {
  /* 订单操作样式 */
  display: flex;
  flex-direction: column;
}

.order-action button {
  /* 订单操作按钮样式 */
  width: 80px;
  height: 30px;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: #fff;
  margin-bottom: 5px;
}

.pay-modal {
  /* 支付弹窗样式 */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.close-btn {
  /* 关闭按钮样式 */
  position: absolute;
  top: 10px;
  right: 10px;

  width: 40px;

  height: 40px;

  border: none;

  border-radius: 50%;

  background-color: #fff;

  color: #333;

  font-size: 24px;

}
</style>