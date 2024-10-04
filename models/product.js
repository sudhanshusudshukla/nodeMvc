/* MongoDB setup */
const mongodb = require("mongodb");
const getDb = require("../utils/database").getDb;
class Product {
  constructor(title, price, imageUrl, description, id) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this._id = id ? new mongodb.ObjectId(id) : null;
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      //upate product
      dbOp = db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      //insert one
      dbOp = db.collection("products").insertOne(this);
    }
    return dbOp
      .then((result) => {
        console.log("logger product this", result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        //console.log("products", products);
        return products;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static fetchById(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(String(prodId)) })
      .next()
      .then((product) => {
        console.log("single product", product);
        return product;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static deleteById(prodId) {
    const db = getDb();
    console.log("inside!!!!");
    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(String(prodId)) })
      .then((result) => {
        console.log("DELETED!!!");
      })
      .catch((err) => {
        console.log("ERROR in deleting product", err);
      });
  }
}

/* const Sequelize = require("sequelize");

const sequelize = require("../utils/database"); */

/* const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}); */

module.exports = Product;
