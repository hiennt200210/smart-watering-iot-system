const client = require("../configs/connectMqtt");

/**
 * Publish thông điệp tới MQTT broker
 */
function pump() {
  const topic = "pump";
  const message = "Turn on pump!";

  client.publish(topic, message, (err) => {
    if (err) {
      console.log("Publish thất bại!");
      console.log(err);
    } else {
      console.log("Publish thành công!");
    }
  });
}

module.exports = {
  pump,
};
