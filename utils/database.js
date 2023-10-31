const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "nodemysql", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
