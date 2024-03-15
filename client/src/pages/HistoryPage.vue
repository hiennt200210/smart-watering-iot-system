<template>
  <div class="container">
    <div class="page-title">
      <h1>Lịch sử</h1>
    </div>
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Thiết bị</th>
            <th>Ngày</th>
            <th>Giờ</th>
            <th>Độ ẩm (%)</th>
          </tr>
        </thead>
        <tbody class="table-body">
          <tr v-for="item in moisture" :key="item._id">
            <td>{{ item.deviceId }}</td>
            <td>{{ this.formatDate(item.createdAt) }}</td>
            <td>{{ this.formatTime(item.createdAt) }}</td>
            <td>{{ item.moisture }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HistoryPage",
  data() {
    return {
      moisture: [],
    };
  },
  methods: {

    formatDate(date) {
      const d = new Date(date);
      return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    },

    formatTime(date) {
      const d = new Date(date);
      return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    },

    async getHistory() {
      try {
        const response = await axios.get("http://localhost:8080/api/moisture");
        this.moisture = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
    this.getHistory();
  },
};
</script>

<style scoped>
@import url("@assets/styles/table.css");

.container {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
}

h1 {
  height: 40px;
  margin-top: 17px;
  margin-bottom: 14px;
  font-size: 28px;
  font-weight: 700;
}

.table-wrapper {
  height: fit-content;
}
</style>
