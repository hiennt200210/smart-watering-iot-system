require("dotenv").config();
const cors = require("cors");
const express = require("express");
const http = require("http");
const socket = require("socket.io");

require("./models/index");
const client = require("./configs/mqtt");
const router = require("./controllers/index");

const app = express();
const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = socket(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Socket.IO
io.on("connection", (socket) => {
  // Xử lý dữ liệu độ ẩm đất khi nhận được từ MQTT broker
  client.on("message", (topic, message) => {
    socket.emit("data", JSON.parse(message));
  });
});

app.use(router);

server.listen(port, () => {
  console.log(`App listening on port ${port}.`);
});
