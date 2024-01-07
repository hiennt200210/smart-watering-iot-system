const { pump } = require("../services/mqtt");

async function pumpOn(req, res, next) {
  await pump();

  res.status(200).json({
    success: true,
    message: "Đã bật máy bơm!",
  });
}

module.exports = {
  pumpOn,
};