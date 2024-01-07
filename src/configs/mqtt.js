const mqtt = require("mqtt");
const Moisture = require("../models/moisture");

const client = mqtt.connect(
  `mqtt://${process.env.MQTT_HOST}:${process.env.MQTT_PORT}`
);

client.on("connect", () => {
  console.log("Connected to MQTT broker.");

  client.subscribe("moisture", (err) => {
    if (!err) {
      console.log("Subscribed to the topic moisture.");
    } else {
      console.log("Unable to subscribe to topic moisture.");
    }
  });
});

// Xử lý dữ liệu độ ẩm đất khi nhận được từ MQTT broker
client.on("message", (topic, message) => {
  Moisture.create(JSON.parse(message))
    .then(() => {
      console.log("Saved data to database.");
    })
    .catch((err) => {
      console.log("Unable to save data to database.");
    });
});

module.exports = client;
