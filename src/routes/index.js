const express = require("express");
const router = express.Router();
const { getMoisture } = require("../controllers/moisture");
const { pumpOn } = require("../controllers/pump");

/**
 * Lấy dữ liệu lịch sử
 */
router.get("/moisture", getMoisture);

/**
 * Bật máy bơm
 */
router.post("/pump/on", pumpOn);

/**
 * Xử lý lỗi 404 - Not Found
 */
router.use("/", (req, res, next) => {
  res.status(404).json({
    message: "Not found!",
  });
});

module.exports = router;
