<template>
  <div class="container">
    <div class="page-title">
      <h1>Bảng điều khiển</h1>
    </div>
    <div class="dashboard">
      <div class="humidity-board">
        <div class="humidity-control">
          <div class="selected-device">
            Thiết bị: <span class="device-name">{{ this.currentDevice }}</span>
          </div>
          <div class="humidity">
            <div class="humidity-text">
              <div class="humidity-lable">Độ ẩm đất:</div>
              <div class="humidity-value">
                {{ this.moisture }}<span class="humidity-unit">%</span>
              </div>
            </div>
            <div class="humidity-icon material-symbols-rounded">
              humidity_mid
            </div>
          </div>
          <div class="actions">
            <button @click="onClickButton" class="button-primary">Tưới nước</button>
          </div>
        </div>
        <!-- <div class="humidity-chart">
          <canvas id="myChart"></canvas>
        </div> -->
      </div>
      <div class="devices">
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Thiết bị</th>
                <th>Vị trí</th>
                <th>Trạng thái</th>
                <th>Độ ẩm</th>
              </tr>
            </thead>
            <tbody class="table-body">
              <tr>
                <td>Device1</td>
                <td></td>
                <td>Đang hoạt động</td>
                <td>95</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Chart from "chart.js/auto";
import io from "socket.io-client";

export default {
  name: "DashboardPage",

  data() {
    return {
      chartInstance: null,
      currentDevice: "",
      moisture: 0,
      labels: [],
      moistureData: [],
    };
  },

  methods: {
    async onClickButton() {
      try {
        const response = await axios.post("http://localhost:8080/api/pump/on");
        console.log(response.message);
        alert("Bật máy bơm trong 10 giây.");
      } catch (error) {
        console.log(error);
      }
    },

    renderChart() {
      const ctx = document.getElementById("myChart");

      this.chartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: this.labels,
          datasets: [
            {
              label: "Độ ẩm đất (%)",
              data: this.moistureData,
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 10,
              },
            },
          },
        },
      });
    },
  },

  async mounted() {
    const socket = io('http://localhost:8080', {
      extraHeaders: {
        "Access-Control-Allow-Origin": "*",
      }
    });

    socket.on('connect', () => {
      console.log('Đã kết nối tới máy chủ Socket.IO');
    });

    socket.on('data', (data) => {
      console.log('Nhận được dữ liệu từ máy chủ:', data);
      this.currentDevice = data.deviceId;
      this.moisture = data.moisture;
    });

    socket.on('disconnect', () => {
      console.log('Mất kết nối tới máy chủ Socket.IO');
    });
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
}

h1 {
  height: 40px;
  margin-top: 17px;
  margin-bottom: 15px;
  font-size: 28px;
  font-weight: 700;
}

.dashboard {
  height: calc(100% - 40px - 20px - 17px - 15px);
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  border-radius: 4px;
}

.humidity-board {
  height: 258px;
  display: flex;
  border-radius: 4px;
}

.humidity-control {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
}

.selected-device {
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
}

.device-name {
  margin-left: 50px;
  margin-bottom: 1px;
  font-size: 21px;
  font-weight: 400;
}

.humidity {
  flex: 3;
  display: flex;
  align-items: center;
  margin-top: 12px;
}

.humidity-text {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.humidity-lable {
  font-size: 16px;
  font-weight: 500;
}

.humidity-value {
  flex: 1;
  display: flex;
  font-size: 64px;
  font-weight: 500;
}

.humidity-unit {
  margin-top: 14px;
  margin-left: 4px;
  font-size: 50px;
  font-weight: 500;
}

.humidity-icon {
  height: 95px;
  width: 95px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e0e0e0;
  border-radius: 50%;
  font-size: 80px;
}

.actions {
  flex: 1;
  margin-top: 12px;
}

.button-primary {
  height: 40px;
  min-width: 100px;
  padding: 0 16px;
  background-color: black;
  border: none;
  border-radius: 4px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
  color: white;
  font-family: "Google Sans", sans-serif;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
}

.button-primary:hover {
  background-color: #333333;
}

.button-primary:active {
  background-color: #1a1a1a;
}

.humidity-chart {
  flex: 1;
  margin-left: 18px;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
}

.devices {
  max-height: calc(100% - 258px - 18px);
  margin-top: 18px;
  border-radius: 4px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
  overflow: hidden;
}
</style>
