<template>
  <div class="service">
    <NavBar />
    <TabBar />
    <div class="form">
      <div class="input-group">
        <label for="type">服务类型</label>
        <select id="type" v-model="type">
          <option value="">请选择服务类型</option>
          <option value="1">标准洗</option>
          <option value="2">深度洗</option>
          <option value="3">消毒洗</option>
          <option value="4">修复洗</option>
        </select>
        <span class="error" v-if="typeError">{{ typeError }}</span>
      </div>
      <div class="input-group">
        <label for="time">服务时间</label>
        <input
          id="time"
          type="datetime-local"
          v-model="time"
          placeholder="请选择服务时间"
          @input="validateTime"
        />
        <span class="error" v-if="timeError">{{ timeError }}</span>
      </div>
      <div class="input-group">
        <label for="address">服务地址</label>
        <input
          id="address"
          type="text"
          v-model="address"
          placeholder="请输入服务地址"
          @input="validateAddress"
        />
        <span class="error" v-if="addressError">{{ addressError }}</span>
      </div>
      <button class="submit" :disabled="!isValid" @click="order">下单</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "../store";
import NavBar from "../components/NavBar.vue";
import TabBar from "../components/TabBar.vue";

export default defineComponent({
  name: "Service",
  components: {
    NavBar,
    TabBar,
  },
  setup() {
    const store = useStore();

    // 用户选择的服务类型
    const type = ref("");

    // 用户选择的服务时间
    const time = ref("");

    // 用户输入的服务地址
    const address = ref("");

    // 服务类型错误信息
    const typeError = ref("");

    // 服务时间错误信息
    const timeError = ref("");

    // 服务地址错误信息
    const addressError = ref("");

    // 表单是否有效
    const isValid = ref(false);

    // 验证服务类型是否选择
    const validateType = () => {
      if (!type.value) {
        typeError.value = "请选择服务类型";
      } else {
        typeError.value = "";
      }
      checkValidity();
    };

    // 验证服务时间是否选择
    const validateTime = () => {
      if (!time.value) {
        timeError.value = "请选择服务时间";
      } else {
        timeError.value = "";
      }
      checkValidity();
    };

    // 验证服务地址是否输入
    const validateAddress = () => {
      if (!address.value) {
        addressError.value = "请输入服务地址";
      } else {
        addressError.value = "";
      }
      checkValidity();
    };

    // 检查表单是否有效
    const checkValidity = () => {
      isValid.value =
        !typeError.value && !timeError.value && !addressError.value;
    };

    // 下单操作
    const order = async () => {
      try {
        // 调用下单接口
        const res = await store.order(type.value, time.value, address.value);
        if (res.code === 200) {
          // 下单成功，跳转到支付页面
          router.push("/pay");
        } else {
          // 下单失败，提示错误信息
          alert(res.message);
        }
      } catch (error) {
        // 网络异常，提示错误信息
        alert(error.message);
      }
    };

    return {
      type,
      time,
      address,
      typeError,
      timeError,
      addressError,
      isValid,
      order,
    };
  },
});
</script>

<style scoped>
.service {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form {
  margin-top: 50px;
  width: 80%;
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  font-size: 14px;
}

.input-group select,
.input-group input {
  display: block;
  width: 100%;
  height: 40px;
}

.error {
  display: block;
  margin-top: 5px;
  font-size: 12px;
  color: red;
}

.submit {
  display: block;
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 20px;
  background-color: #0078d4;
  color: white;
}

.submit:disabled {
  opacity: 0.5;
}
</style>
