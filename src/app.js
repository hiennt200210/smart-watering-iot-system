require("./models/index");
const client = require("./configs/connectMqtt");

const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const router = require("./routes/index");
const Moisture = require("./models/moisture");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", // Thay đổi miền tương ứng với trang web client của bạn
    methods: ["GET", "POST"],
  },
});
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Xử lý sự kiện khi client kết nối tới server
io.on("connection", (socket) => {
  console.log("Client connected");

//   // Gửi dữ liệu truyền tới client
//   setInterval(() => {
//     const data = Math.random(); // Dữ liệu ví dụ, bạn có thể thay thế bằng dữ liệu thực tế
//     console.log(data);
//     socket.emit("data", data);
//   }, 1000);

  /**
   * Xử lý khi nhận được thông điệp từ MQTT broker
   */
  client.on("message", (topic, message) => {
    socket.emit("data", JSON.parse(message));
    Moisture.create(JSON.parse(message))
      .then(() => {
        console.log("Đã lưu vào database!");
      })
      .catch((err) => {
        console.log("Lỗi khi lưu vào database!");
        console.error(err);
      });
  });

  // Xử lý sự kiện khi client ngắt kết nối
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Định nghĩa đường dẫn API
app.get("/api/data", (req, res) => {
  // Xử lý yêu cầu API ở đây
  // Ví dụ: trả về dữ liệu từ nguồn dữ liệu thực tế

  res.status(200).json({ message: "API response" });
});

app.use("/api", router);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
