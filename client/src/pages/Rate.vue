<template>
  <div class="rate">
    <NavBar>评价服务</NavBar>
    <div class="rate-content">
      <div class="rate-header">
        <img :src="order.service.image" alt="service" />
        <div class="rate-info">
          <div class="rate-name">{{ order.service.name }}</div>
          <div class="rate-price">￥{{ order.service.price }}</div>
        </div>
      </div>
      <div class="rate-body">
        <label>评分</label>
        <div class="rate-stars">
          <img
            src="../assets/star.svg"
            alt="star"
            v-for="index in 5"
            :key="index"
            :class="{ active: index <= score }"
            @click="score = index"
          />
        </div>
        <label>评论</label>
        <textarea
          v-model.trim="comment"
          placeholder="请输入你的评论"
          rows="5"
        ></textarea>
      </div>
      <div class="rate-button" @click="rate">提交</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import NavBar from "../components/NavBar.vue";
import { useStore } from "../store";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "Rate",
  components: {
    NavBar,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const orderId = route.params.id;
    const order = store.getters.orderById(orderId);
    const score = ref(5);
    const comment = ref("");

    const rate = async () => {
      if (!comment.value) {
        alert("请输入评论");
        return;
      }
      try {
        await store.actions.order.rate({
          orderId: orderId,
          score: score.value,
          comment: comment.value,
        });
        $router.push("/order");
      } catch (error) {
        alert(error.message);
      }
    };

    return {
      order,
      score,
      comment,
      rate,
    };
  },
});
</script>

<style scoped lang="scss">
.rate {
  height: 100%;
}

.rate-content {
  margin: 10px;
  background-color: #fff;
  border-radius: 5px;
}

.rate-header {
  display: flex;
  align-items: center;
}

.rate-header img {
  width: 80px;
  height: 80px;
}

.rate-info {
  margin-left: 10px;
}

.rate-name {
  font-size: 16px;
}

.rate-price {
  font-size: 14px;
}

.rate-body {
  padding: 10px;
}

.rate-body label {
  display: block;
  font-size: 14px;
}

.rate-stars {
  display: flex;
}

.rate-stars img {
  width: 20px;
  height: 20px;
}

.active {
  filter: invert(100%);
}

.rate-body textarea {
  display: block;
  width: 100%;
  border: none;
  resize: none;
}

.rate-button {
  display: block;
  width: calc(100% - 20px);
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  background-color: #00a0e9;
  border-radius: 5px;
}
</style>
