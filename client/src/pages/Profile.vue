<template>
  <div class="profile">
    <NavBar />
    <TabBar />
    <div class="card">
      <div class="avatar">
        <img src="../assets/avatar.png" alt="avatar" />
      </div>
      <div class="info">
        <p class="name">{{ user.name }}</p>
        <p class="phone">{{ user.phone }}</p>
      </div>
    </div>
    <div class="card">
      <div class="item" @click="goToCollection">
        <img src="../assets/collection.png" alt="collection" />
        <span>我的收藏</span>
      </div>
      <div class="item" @click="goToShare">
        <img src="../assets/share.png" alt="share" />
        <span>我的分享</span>
      </div>
      <div class="item" @click="logout">
        <img src="../assets/logout.png" alt="logout" />
        <span>退出登录</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref,onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../store";
import NavBar from "../components/NavBar.vue";
import TabBar from "../components/TabBar.vue";

export default defineComponent({
  name: "Profile",
  components: {
    NavBar,
    TabBar,
  },
  setup() {
    const store = useUserStore();

    // 用户的信息
    const user = ref({});

    const router = useRouter()
    // 跳转到我的收藏页面
    const goToCollection = () => {
      router.push("/collection");
    };

    // 跳转到我的分享页面
    const goToShare = () => {
      router.push("/share");
    };

    // 退出登录操作
    const logout = async () => {
      try {
        // 调用退出登录接口
        const res = await store.logout();
        if (res.code === 200) {
          // 退出登录成功，跳转到登录页面
          router.push("/login");
        } else {
          // 退出登录失败，提示错误信息
          alert(res.message);
        }
      } catch (error) {
        // 网络异常，提示错误信息
        alert(error.message);
      }
    };

    // 获取用户信息
    const getUserInfo = async () => {
      try {
        // 调用获取用户信息接口
        const res = await store.getUserInfo();
        if (res.code === 200) {
          // 获取成功，更新用户信息数据
          user.value = res.data;
        } else {
          // 获取失败，提示错误信息
          alert(res.message);
        }
      } catch (error) {
        // 网络异常，提示错误信息
        alert(error.message);
      }
    };

    // 在组件创建时获取用户信息
    onMounted(() => {
      getUserInfo();
    });

    return {
      user,
      goToCollection,
      goToShare,
      logout,
    };
  },
});
</script>

<style scoped>
.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card {
  margin-top: 20px;
  width: 80%;
  border: 1px solid #cccccc;
}

.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar img {
  width: 100px;
  height: 100px;
}

.info {
  padding: 10px;
}

.name {
  font-size: 18px;
}

.phone {
  font-size: 14px;
}

.item {
  display: flex;
  align-items: center;
}

.item img {
  width: 30px;
  height: 30px;
}

.item span {
  margin-left: 10px;
}
</style>
