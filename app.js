const path = require("path");
const express = require("express");
const errorControllers = require("./controllers/error");
const bodyParse = require("body-parser");

//database setup
const mongoConnect = require("./utils/database").mongoConnect;

const adminRoutes = require("./routes/admin");
const shopRoute = require("./routes/shop");

const app = express();

app.use(bodyParse.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//new middleware for incoming request
app.use((req, res, next) => {
  /*   User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err)); */
  next();
});

//set view engine either pug or handlebars, or ejs
app.set("view engine", "ejs");
app.set("views", "views");

app.use("/admin", adminRoutes);
app.use(shopRoute);

mongoConnect(() => {
  app.listen(3000);
});

app.use(errorControllers.get404);
