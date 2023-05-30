<template>
  <div class="favorite">
    <NavBar>我的收藏</NavBar>
    <div class="favorite-list">
      <div
        class="favorite-item"
        v-for="item in favorites"
        :key="item.id"
        @click="$router.push('/book/' + item.id)"
      >
        <img :src="item.image" alt="service" />
        <div class="favorite-item-info">
          <div class="favorite-item-name">{{ item.name }}</div>
          <div class="favorite-item-price">￥{{ item.price }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "../components/NavBar.vue";
import { useStore } from "../store";

export default defineComponent({
  name: "Favorite",
  components: {
    NavBar,
  },
  setup() {
    const store = useStore();

    const favorites = store.getters.favorites;

    return {
      favorites,
    };
  },
});
</script>

<style scoped lang="scss">
.favorite {
  height: 100%;
}

.favorite-list {
  margin: 10px;
}

.favorite-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 5px;
}

.favorite-item img {
  width: 80px;
  height: 80px;
}

.favorite-item-info {
  margin-left: 10px;
}

.favorite-item-name {
  font-size: 16px;
}

.favorite-item-price {
  font-size: 14px;
}
</style>
