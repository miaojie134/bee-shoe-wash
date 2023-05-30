<template>
  <div class="profile">
    <NavBar>个人中心</NavBar>
    <div class="profile-card">
      <div class="profile-avatar">
        <img src="../assets/avatar.svg" alt="avatar" />
      </div>
      <div class="profile-info">
        <div class="profile-name">{{ user.phone }}</div>
        <div class="profile-balance">余额：￥{{ user.balance }}</div>
      </div>
    </div>
    <div class="profile-list">
      <div class="profile-item" @click="$router.push('/favorite')">
        <img src="../assets/favorite.svg" alt="favorite" />
        <span>我的收藏</span>
      </div>
      <div class="profile-item" @click="$router.push('/share')">
        <img src="../assets/share.svg" alt="share" />
        <span>我的分享</span>
      </div>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "../components/NavBar.vue";
import TabBar from "../components/TabBar.vue";
import { useStore } from "../store";

export default defineComponent({
  name: "Profile",
  components: {
    NavBar,
    TabBar,
  },
  setup() {
    const store = useStore();

    const user = store.getters.user;

    return {
      user,
    };
  },
});
</script>

<style scoped lang="scss">
.profile {
  height: 100%;
}

.profile-card {
  display: flex;
  align-items: center;
  margin: 10px;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
}

.profile-avatar {
  width: 80px;
  height: 80px;
}

.profile-avatar img {
  width: 100%;
  height: 100%;
}

.profile-info {
  margin-left: 10px;
}

.profile-name {
  font-size: 18px;
}

.profile-balance {
  font-size: 14px;
}

.profile-list {
  display: flex;
}

.profile-item {
  flex: 1;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.profile-item img {
  width: 40px;
  height: 40px;
}

.profile-item span {
  margin-top: 5px;
}
</style>
