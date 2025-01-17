const getDb = require("../utils/database").getDb;
const mongodb = require("mongodb");

const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email) {
    (this.name = username), (this.email = email);
  }
  save() {
    const db = getDb();
    db.collection("users").insertOne(this);
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new mongodb.ObjectId(String(userId)) })
      .then((user) => {
        console.log(user);
        return user;
      })
      .catch((err) => {
        console.log("user error", err);
      });
  }
}
/* const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING,
});
*/
module.exports = User;
