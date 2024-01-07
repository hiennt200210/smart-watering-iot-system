const express = require("express");
const router = express.Router();
const History = require("../models/User");


// Route API để lấy lịch sử từ cơ sở dữ liệu
router.get("/history", async (req, res) => {
    try {
        const history = await History.findAll();
        res.json({
            success: true,
            data: history,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});

module.exports = router;