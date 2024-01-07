const mqtt = require("mqtt");
const Moisture = require("../models/moisture");

const client = mqtt.connect("mqtt://localhost");

client.on("connect", () => {
  console.log("Đã kết nối MQTT broker!");

  client.subscribe("moisture", (err) => {
    if (err) {
      console.log("Đăng ký topic thất bại!");
      console.log(err);
    }
    console.log("Đã đăng ký topic 'moisture'!");
  });

  /**
   * Xử lý khi nhận được thông điệp từ MQTT broker
   */
  client.on("message", (topic, message) => {
    Moisture.create(JSON.parse(message))
      .then(() => {
        console.log("Đã lưu vào database!");
      })
      .catch((err) => {
        console.log("Lỗi khi lưu vào database!");
        console.error(err);
      });
  });
});

module.exports = client;
