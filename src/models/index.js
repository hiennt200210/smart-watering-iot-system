const sequelize = require("../configs/connectDb");

(async () => {
  await sequelize.sync({ alter: true });
})();

module.exports = sequelize;
