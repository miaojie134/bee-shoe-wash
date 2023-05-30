<template>
  <div class="book">
    <NavBar>预约服务</NavBar>
    <div class="book-form">
      <div class="book-input">
        <label for="service">服务类型</label>
        <select id="service" v-model="serviceId" disabled>
          <option v-for="item in services" :key="item.id" :value="item.id">
            {{ item.name }}
          </option>
        </select>
      </div>
      <div class="book-input">
        <label for="date">服务时间</label>
        <input type="date" id="date" v-model="date" />
      </div>
      <div class="book-input">
        <label for="address">服务地址</label>
        <input
          type="text"
          id="address"
          v-model.trim="address"
          placeholder="请输入服务地址"
        />
      </div>
      <div class="book-button" @click="book">预约</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import NavBar from "../components/NavBar.vue";
import { useStore } from "../store";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "Book",
  components: {
    NavBar,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const services = store.getters.services;
    const serviceId = ref(route.params.id);
    const date = ref("");
    const address = ref("");

    const book = async () => {
      if (!date.value) {
        alert("请选择服务时间");
        return;
      }
      if (!address.value) {
        alert("请输入服务地址");
        return;
      }
      try {
        await store.actions.order.book({
          serviceId: serviceId.value,
          date: date.value,
          address: address.value,
        });
        $router.push("/order");
      } catch (error) {
        alert(error.message);
      }
    };

    return {
      services,
      serviceId,
      date,
      address,
      book,
    };
  },
});
</script>

<style scoped lang="scss">
.book {
  height: 100%;
}

.book-form {
  margin: 20px;
}

.book-input {
  margin-bottom: 10px;
}

.book-input label {
  display: block;
  font-size: 14px;
}

.book-input input,
.book-input select {
  display: block;
  width: 100%;
  height: 40px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  padding: 0 10px;
}

.book-button {
  display: block;
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  background-color: #00a0e9;
  border-radius: 5px;
}
</style>
