const path = require("path");
const express = require("express");
const errorControllers = require("./controllers/error");
const bodyParse = require("body-parser");
//chnaging adminRoute as exports got changed in adminRoutes
//const adminRoute = require("./Routes/admin");
const sequelize = require("./utils/database");
const Product = require("./models/product");
const User = require("./models/user");

const adminRoutes = require("./routes/admin");
const shopRoute = require("./routes/shop");

//database setup
const db = require("./utils/database");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");
//moving ahead with ejs comment import for handlebars
//const { engine } = require("express-handlebars");

const app = express();

//testing the DB connection
/* db.execute("SELECT * from products")
  .then((result) => {
    console.log(result[0], result[1]);
  })
  .catch((err) => {
    console.log(err);
  }); */

app.use(bodyParse.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//new middleware for incoming request
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

//added engine for handlebars
/* app.engine(
  "hbs",
  engine({
    layoutsDir: "views/layout/",
    defaultLayout: "main-layout",
    extname: "hbs",
  })
); */

//set view engine either pug or handlebars, or ejs
app.set("view engine", "ejs");
app.set("views", "views");

app.use("/admin", adminRoutes);
app.use(shopRoute);

app.use(errorControllers.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

sequelize
  //.sync({ force: true }) // will override table but in prod not required: only for testing
  .sync()
  .then((results) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({
        name: "TestUser",
        email: "test@test.com",
      });
    }
    return user;
  })
  .then((user) => {
    return user.createCart();
  })
  .then((cart) => {
    //console.log("USER", user);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
