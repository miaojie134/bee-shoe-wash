<template>
  <div class="pay">
    <NavBar />
    <div class="form">
      <div class="input-group">
        <label for="type">支付方式</label>
        <select id="type" v-model="type">
          <option value="">请选择支付方式</option>
          <option value="1">微信</option>
          <option value="2">支付宝</option>
        </select>
        <span class="error" v-if="typeError">{{ typeError }}</span>
      </div>
      <button class="submit" :disabled="!isValid" @click="pay">支付</button>
    </div>
    <div class="qrcode" v-if="qrcode">
      <img :src="qrcode" alt="qrcode" />
      <p>请使用{{ getType(type) }}扫码支付</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useOrderStore } from "../store";
import NavBar from "../components/NavBar.vue";

export default defineComponent({
  name: "Pay",
  components: {
    NavBar,
  },
  setup() {
    const store = useOrderStore();

    // 用户选择的支付方式
    const type = ref("");

    // 支付方式错误信息
    const typeError = ref("");

    // 表单是否有效
    const isValid = ref(false);

    // 支付二维码图片地址
    const qrcode = ref("");

    // 验证支付方式是否选择
    const validateType = () => {
      if (!type.value) {
        typeError.value = "请选择支付方式";
      } else {
        typeError.value = "";
      }
      checkValidity();
    };

    // 检查表单是否有效
    const checkValidity = () => {
      isValid.value = !typeError.value;
    };

    // 支付操作
    const pay = async () => {
      try {
        // 调用获取支付二维码接口
        const res = await store.getPayQrcode(type.value);
        if (res.code === 200) {
          // 获取成功，更新二维码图片地址
          qrcode.value = res.data;
        } else {
          // 获取失败，提示错误信息
          alert(res.message);
        }
      } catch (error) {
        // 网络异常，提示错误信息
        alert(error.message);
      }
    };

    // 获取支付方式对应的文本
    const getType = (type: string) => {
      switch (type) {
        case "1":
          return "微信";
        case "2":
          return "支付宝";
        default:
          return "";
      }
    };

    return {
      type,
      typeError,
      isValid,
      qrcode,
      pay,
      getType,
    };
  },
});
</script>

<style scoped>
.pay {
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

.input-group select {
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

.qrcode {
  margin-top: 50px;
}

.qrcode img {
  width: 200px;
  height: 200px;
}

.qrcode p {
  margin-top: 10px;
}
</style>
