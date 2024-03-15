<script>
export default {
  name: "App",
  data() {
    return {
      menuItems: [
        {
          name: "Bảng điều khiển",
          icon: "space_dashboard",
          path: "/",
          class: "menu-item menu-item-selected",
        },
        {
          name: "Lịch sử",
          icon: "history",
          path: "/history",
          class: "menu-item",
        },
      ],
    };
  },
  methods: {
    onClickMenuItem() {
      this.menuItems.forEach((item) => {
        item.class = "menu-item";
      });
      if (this.$route.path === "/") {
        this.menuItems[1].class = "menu-item menu-item-selected";
      } else if (this.$route.path === "/history") {
        this.menuItems[0].class = "menu-item menu-item-selected";
      }
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="sidebar">
      <div class="header">Dashboard</div>
      <div class="menu">
        <router-link v-for="item in menuItems" :key="item.path" @click="onClickMenuItem" :class="item.class" :to="item.path">
          <span class="menu-item-icon material-symbols-rounded">{{ item.icon }}</span>
          <span class="menu-item-name">{{ item.name }}</span>
        </router-link>
        <!-- <router-link @click="onClickMenuItem" class="menu-item menu-item-selected" to="/">
          <span class="menu-item-icon material-symbols-rounded">space_dashboard</span>
          <span class="menu-item-name">Bảng điều khiển</span>
        </router-link>
        <router-link @click="onClickMenuItem" class="menu-item" to="/history">
          <span class="menu-item-icon material-symbols-rounded">history</span>
          <span class="menu-item-name">Lịch sử</span>
        </router-link> -->
      </div>
    </div>

    <div class="main">
      <router-view></router-view>
      <!-- <DashboardPage /> -->
      <!-- <HistoryPage /> -->
    </div>
  </div>
</template>

<style scoped>
.container {
  height: 100vh;
  width: 100%;
  display: flex;
}

.sidebar {
  width: 250px;
  padding: 0 12px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
}

.header {
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  padding: 0 12px;
  font-size: 21px;
  font-weight: 900;
}

.menu-item {
  height: 44px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 12px;
  border-radius: 4px;
  overflow: hidden;
  text-decoration: none;
  cursor: pointer;
}

.menu-item-selected {
  background-color: #ddd;
}

.menu-item:hover {
  background-color: #eee;
}

.menu-item:active {
  background-color: #ccc;
}

.menu-item~.menu-item {
  margin-top: 4px;
}

.menu-item-name {
  display: flex;
  align-items: center;
  margin-left: 12px;
  padding-top: 1px;
  font-weight: 500;
  color: black;
}

.main {
  flex: 1;
  padding: 0 20px;
}
</style>
