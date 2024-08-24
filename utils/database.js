/* Mongo DB setup */
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://sshukla:NvcylJKM4qkj7uVH@nodemvc.kz1nnqu.mongodb.net/shop"
  )
    .then((client) => {
      console.log("connection established");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(`failed to connect with DB ${err}`);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  } else {
    throw "No database found";
  }
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

//OLD DB SETUP WITH SQL
/* const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "nodemysql", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize; */
