const sequelize = require("../configs/database");
const Moisture = require("./moisture");

(async () => {
  await sequelize.sync({ alter: true });
})();

module.exports = sequelize;
