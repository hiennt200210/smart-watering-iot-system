const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("swsdb", "root", "19181988", {
    host: "localhost",
    dialect: "mysql",
    logging: false,
});

sequelize
    .authenticate()
    .then(() => {
        console.log("Đã kết nối với database!");
    })
    .catch((error) => {
        console.log("Không thể kết nối với database!");
        console.log(error);
    });

module.exports = sequelize;
