const Moisture = require("../models/moisture");

async function getMoisture(req, res) {
  try {
    const history = await Moisture.findAll();
    res.status(200).json({
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
}

module.exports = {
  getMoisture,
};
