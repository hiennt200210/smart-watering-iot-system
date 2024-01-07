const client = require("../configs/mqtt");
const express = require("express");
const Moisture = require("../models/moisture");
const router = express.Router();

// Lấy toàn bộ dữ liệu độ ẩm đất
router.get("/api/moisture", async (req, res) => {
  try {
    const data = await Moisture.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// Bật máy bơm trong 10 giây
router.post("/api/pump/on", async (req, res) => {
  const topic = "pump";
  const message = "on";

  try {
    const response = await client.publish(topic, message);
    res.status(200).json({
      message: "Turn on the pump for 10 seconds.",
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// Xử lý lỗi 404 - Not Found
router.use("/", (req, res) => {
  res.status(404).json({
    message: "Not found.",
  });
});

module.exports = router;
