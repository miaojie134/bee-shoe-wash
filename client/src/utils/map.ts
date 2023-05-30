// 定义一些地图相关的函数

import { ref } from 'vue' // 引入ref函数
import { AMapLoader } from '@amap/amap-jsapi-loader' // 引入高德地图加载器

// 定义地图对象的引用
export const map = ref<any>(null)

// 定义地图初始化函数
export async function initMap() {
  // 加载高德地图SDK
  const AMap = await AMapLoader.load({
    key: '你的高德地图key', // 你需要自己申请一个高德地图key
    version: '2.0', // SDK版本
    plugins: ['AMap.Geolocation', 'AMap.PlaceSearch'] // 需要加载的插件
  })
  // 创建地图对象
  map.value = new AMap.Map('map', {
    zoom: 16, // 缩放级别
    center: [116.397428, 39.90923], // 中心点坐标
    viewMode: '3D' // 使用3D视图
  })
  // 创建定位控件
  const geolocation = new AMap.Geolocation({
    enableHighAccuracy: true, // 是否使用高精度定位，默认:true
    timeout: 10000, // 超过10秒后停止定位，默认：5s
    buttonPosition: 'RB', // 定位按钮的停靠位置
    zoomToAccuracy: true // 定位成功后是否自动调整地图视野到定位点
  })
  // 添加定位控件到地图上
  map.value.addControl(geolocation)
  // 触发定位结果，将定位结果作为参数传递给回调函数
  geolocation.getCurrentPosition((status: any, result: any) => {
    if (status === 'complete') {
      console.log('定位成功', result)
    } else {
      console.log('定位失败', result)
    }
  })
}

// 定义搜索地址函数
export async function searchAddress(keyword: string) {
  // 加载高德地图SDK
  const AMap = await AMapLoader.load({
    key: '你的高德地图key', // 你需要自己申请一个高德地图key
    version: '2.0', // SDK版本
    plugins: ['AMap.Geolocation', 'AMap.PlaceSearch'] // 需要加载的插件
  })
  // 创建搜索对象
  const placeSearch = new AMap.PlaceSearch({
    pageSize: 10, // 每页显示10条结果
    pageIndex: 1, // 显示第一页结果
    city: '全国', // 搜索范围为全国
    extensions: 'all' // 返回详细信息
  })
  // 返回一个Promise对象，用于异步处理搜索结果
  return new Promise((resolve, reject) => {
    // 根据关键字搜索地址，将搜索结果作为参数传递给回调函数
    placeSearch.search(keyword, (status: any, result: any) => {
      if (status === 'complete') {
        console.log('搜索成功', result)
        resolve(result.poiList.pois) // 返回搜索到的地址列表
      } else {
        console.log('搜索失败', result)
        reject(result) // 返回错误信息
      }
    })
  })
}
