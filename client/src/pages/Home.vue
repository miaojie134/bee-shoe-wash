<template>
  <!-- 定义一个首页页面组件，用于展示和交互预约服务表单 -->
  <div class="home-container">
    <!-- 定义一个标题，显示应用名称 -->
    <h1 class="title">蜜蜂洗鞋</h1>
    <!-- 定义一个表单，用于选择服务类型、时间、地址等信息 -->
    <form class="form" @submit.prevent="submitForm">
      <!-- 定义一个服务类型选择框，绑定服务类型数据，并添加校验规则 -->
      <div class="form-item">
        <select v-model="serviceType" required>
          <option value="">请选择服务类型</option>
          <option value="普通洗鞋">普通洗鞋</option>
          <option value="高级洗鞋">高级洗鞋</option>
          <option value="专业洗鞋">专业洗鞋</option>
        </select>
      </div>
      <!-- 定义一个时间选择框，绑定时间数据，并添加校验规则 -->
      <div class="form-item">
        <input type="datetime-local" v-model="time" required />
      </div>
      <!-- 定义一个地址选择框，绑定地址数据，并添加校验规则 -->
      <div class="form-item">
        <input type="text" v-model="address" placeholder="请选择地址" readonly @click="showMap" required />
      </div>
      <!-- 定义一个预约按钮，点击时触发提交表单方法 -->
      <div class="form-item">
        <button type="submit">预约</button>
      </div>
    </form>
    <!-- 定义一个地图弹窗，用于展示和选择地址 -->
    <div class="map-modal" v-if="showModal">
      <!-- 引入地图组件，并传递经纬度、缩放级别、标记点等参数，并监听自定义事件 -->
      <Map :lng="lng" :lat="lat" :zoom="zoom" :marker="marker" @click="setLocation" @select="setAddress" />
      <!-- 定义一个关闭按钮，点击时隐藏地图弹窗 -->
      <button class="close-btn" @click="hideMap">关闭</button>
    </div>
  </div>
</template>
<script lang="ts">
// 引入vue相关的库和函数
import { defineComponent, ref } from 'vue'
// 引入路由对象和状态管理对象
import { useRouter } from 'vue-router'
import { useOrderStore } from '../store'
// 引入地图组件
import Map from '../components/Map.vue'

// 定义首页页面组件的选项
export default defineComponent({
  // 定义组件的属性
  props: {},
  // 定义组件的状态，用于存储和操作数据
  setup() {
    // 获取路由对象
    const router = useRouter()
    // 获取订单状态管理对象
    const orderStore = useOrderStore()
    // 定义一个响应式数据，用于存储服务类型
    const serviceType = ref<string>('')
    // 定义一个响应式数据，用于存储时间
    const time = ref<string>('')
    // 定义一个响应式数据，用于存储地址
    const address = ref<string>('')
    // 定义一个响应式数据，用于存储经度
    const lng = ref<number>(116.397128)
    // 定义一个响应式数据，用于存储纬度
    const lat = ref<number>(39.916527)
    // 定义一个响应式数据，用于控制地图弹窗的显示和隐藏
    const showModal = ref<boolean>(false)

    // 定义一个方法，用于提交表单，并调用创建订单接口创建订单，如果成功，跳转到订单页面
    const submitForm = async () => {
      // 调用订单状态管理对象的创建订单方法，传递服务类型、时间、地址，并获取返回结果
      const result = await orderStore.createOrder(serviceType.value, time.value, address.value)
      // 判断返回结果是否成功
      if (result === '创建订单成功') {
        // 如果成功，跳转到订单页面，并传递成功的提示信息
        router.push({ path: '/order', query: { message: result } })
      } else {
        // 如果失败，弹出错误信息
        alert(result)
      }
    }

    // 定义一个方法，用于显示地图弹窗，并设置默认的经纬度和地址
    const showMap = () => {
      // 将地图弹窗的显示状态设为true
      showModal.value = true
      // 如果地址为空，则设置默认的经纬度和地址
      if (!address.value) {
        lng.value = 116.397128
        lat.value = 39.916527
        address.value = '北京市东城区东长安街'
      }
    }

    // 定义一个方法，用于隐藏地图弹窗，并清空地址输入框的值
    const hideMap = () => {
      // 将地图弹窗的显示状态设为false
      showModal.value = false
      // 将地址输入框的值设为空字符串
      address.value = ''
    }

    // 定义一个方法，用于设置经纬度，并根据经纬度获取地址名称，并赋值给地址输入框的值
    const setLocation = async (location: any) => {
      // 获取传递过来的经纬度对象，并赋值给相应的响应式数据
      lng.value = location.lng
      lat.value = location.lat

      // 创建一个逆地址解析服务对象，传递地图对象和配置选项

      const geocoderService = new QQMap.Geocoder({

        map: null,

        complete: (result: any) => {

          // 定义一个回调函数，在解析完成后执行

          // 判断解析状态是否成功

          if (result.status === 0) {

            // 如果成功，将解析结果中的地址名称赋值给地址输入框的值

            address.value = result.result.address

          } else {

            // 如果失败，弹出错误信息

            alert('获取地址失败')

          }

        }

      })

      // 调用逆地址解析方法，传递经纬度对象

      geocoderService.getAddress(new QQMap.LatLng(lat.value, lng.value))

    }

    // 定义一个方法，用于设置地址，并根据地址获取经纬度，并赋值给相应的响应式数据

    const setAddress = (item: any) => {

      // 获取传递过来的地址对象，并赋值给相应的响应式数据

      lng.value = item.location.lng

      lat.value = item.location.lat

      address.value = item.title

      // 隐藏地图弹窗

      hideMap()

    }

    // 返回需要在模板中使用的数据和方法

    return {

      serviceType,

      time,

      address,

      lng,

      lat,

      showModal,

      submitForm,

      showMap,

      hideMap,
    }
  }
})
</script>
<style scoped>
/* 定义组件的样式 */
.home-container {
  /* 首页容器样式 */
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

.form {
  /* 表单样式 */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-item {
  /* 表单项样式 */
  width: 100%;
  margin-bottom: 10px;
}

.form-item select {
  /* 选择框样式 */
  width: 100%;
  height: 40px;
  border: none;
  border-bottom: 1px solid #ccc;
  padding: 0 10px;
}

.form-item input {
  /* 输入框样式 */
  width: 100%;
  height: 40px;
  border: none;
  border-bottom: 1px solid #ccc;
  padding: 0 10px;
}

.form-item button {
  /* 按钮样式 */
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: #fff;
}

.map-modal {
  /* 地图弹窗样式 */
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