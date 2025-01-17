const path = require("path");
const express = require("express");
const errorControllers = require("./controllers/error");
const bodyParse = require("body-parser");

//database setup
const mongoConnect = require("./utils/database").mongoConnect;
const User = require('./models/user');
const adminRoutes = require("./routes/admin");
const shopRoute = require("./routes/shop");

const app = express();

app.use(bodyParse.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//new middleware for incoming request
app.use((req, res, next) => {
    User.findById("6751594a1a7ed1755e08daf1")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
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
