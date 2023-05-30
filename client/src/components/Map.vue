// src/components/Map.vue
<template>
  <!-- 定义一个地图组件，用于展示和选择地址 -->
  <div class="map-container">
    <!-- 使用腾讯地图的js api，传递经纬度、缩放级别、标记点等参数 -->
    <div id="map" :data-lng="lng" :data-lat="lat" :data-zoom="zoom" :data-marker="marker"></div>
    <!-- 定义一个地址输入框，用于搜索和显示地址 -->
    <div class="address-input">
      <input type="text" v-model="address" @input="searchAddress" placeholder="请输入地址" />
    </div>
    <!-- 定义一个地址列表，用于展示搜索结果 -->
    <div class="address-list" v-if="showList">
      <ul>
        <li v-for="(item, index) in addressList" :key="index" @click="selectAddress(item)">
          {{ item.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
// 引入vue相关的库和函数
import { defineComponent, ref, watch, onMounted } from 'vue'
// 引入腾讯地图的js api
import QQMap from 'qqmap-js-sdk'

// 定义地图组件的选项
export default defineComponent({
  // 定义组件的属性，接收父组件传递的参数
  props: {
    // 经度
    lng: {
      type: Number,
      default: 116.397128
    },
    // 纬度
    lat: {
      type: Number,
      default: 39.916527
    },
    // 缩放级别
    zoom: {
      type: Number,
      default: 15
    },
    // 标记点
    marker: {
      type: Boolean,
      default: true
    }
  },
  // 定义组件的状态，用于存储和操作数据
  setup(props, { emit }) {
    // 定义一个响应式数据，用于存储地图对象
    const map = ref<QQMap | null>(null)
    // 定义一个响应式数据，用于存储地址输入框的值
    const address = ref<string>('')
    // 定义一个响应式数据，用于存储地址列表的数据
    const addressList = ref<any[]>([])
    // 定义一个响应式数据，用于控制地址列表的显示和隐藏
    const showList = ref<boolean>(false)

    // 定义一个方法，用于初始化地图对象
    const initMap = () => {
      // 创建地图对象，传递容器id和配置选项
      map.value = new QQMap.Map('map', {
        center: new QQMap.LatLng(props.lat, props.lng), // 中心点坐标
        zoom: props.zoom, // 缩放级别
        draggable: true, // 是否允许拖动
        scrollwheel: true, // 是否允许滚轮缩放
        mapStyleId: 'style1' // 地图样式id
      })
      // 如果需要显示标记点，则创建一个标记点对象，并添加到地图上
      if (props.marker) {
        const marker = new QQMap.Marker({
          position: new QQMap.LatLng(props.lat, props.lng), // 标记点坐标
          map: map.value // 地图对象
        })
      }
      // 监听地图的点击事件，获取点击位置的坐标，并触发自定义事件，将坐标传递给父组件
      map.value.on('click', (event: any) => {
        const lat = event.latLng.getLat()
        const lng = event.latLng.getLng()
        emit('click', { lat, lng })
      })
    }

    // 定义一个方法，用于搜索地址，并获取搜索结果列表
    const searchAddress = () => {
      // 如果地址输入框的值为空，则隐藏地址列表，并清空地址列表的数据
      if (!address.value) {
        showList.value = false
        addressList.value = []
        return
      }
      // 创建一个地点搜索服务对象，传递地图对象和配置选项
      const searchService = new QQMap.SearchService({
        map: map.value, // 地图对象
        pageCapacity: 10, // 每页显示的结果数
        autoExtend: true // 是否自动扩大检索范围
      })
      // 调用搜索方法，传递地址输入框的值和回调函数
      searchService.search(address.value, (status: any, result: any) => {
        // 判断搜索状态是否成功
        if (status === QQMap.SearchStatus.OK) {
          // 如果成功，将搜索结果赋值给地址列表的数据，并显示地址列表
          addressList.value = result.detail.pois
          showList.value = true
        } else {
          // 如果失败，隐藏地址列表，并清空地址列表的数据
          showList.value = false
          addressList.value = []
        }
      })
    }

    // 定义一个方法，用于选择地址，并获取选择地址的坐标和名称，并触发自定义事件，将坐标和名称传递给父组件
    const selectAddress = (item: any) => {
      // 获取选择地址的坐标和名称
      const lat = item.location.lat
      const lng = item.location.lng
      const name = item.title
      // 将选择地址的名称赋值给地址输入框的值，并隐藏地址列表
      address.value = name
      showList.value = false
      // 触发自定义事件，将坐标和名称传递给父组件
      emit('select', { lat, lng, name })
    }

    // 在组件挂载后，调用初始化地图方法
    onMounted(() => {
      initMap()
    })

    // 返回需要在模板中使用的数据和方法
    return {
      map,
      address,
      addressList,
      showList,
      searchAddress,
      selectAddress
    }
  }
})
</script>

<style scoped>
/* 定义组件的样式 */
.map-container {
  /* 地图容器样式 */
  position: relative;
  width: 100%;
  height: 300px;
}

#map {
  /* 地图元素样式 */
  width: 100%;
  height: 100%;
}

.address-input {
  /* 地址输入框容器样式 */
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
}

.address-input input {
  /* 地址输入框元素样式 */
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 5px;
  padding: 0 10px;
}

.address-list {
  /* 地址列表容器样式 */
  position: absolute;
  top: 60px;
  left: 10px;
  right: 10px;
}

.address-list ul {
  /* 地址列表元素样式 */
  list-style: none;
}

.address-list li {
  /* 地址列表项样式 */
  padding: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}</style>