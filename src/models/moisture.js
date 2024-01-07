const { DataTypes } = require("sequelize");
const sequelize = require("../configs/connectDb");

const Moisture = sequelize.define("Moisture", {
  deviceId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  moisture: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
});

module.exports = Moisture;
