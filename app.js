const path = require("path");
const express = require("express");
const errorControllers = require("./controllers/error");
const bodyParse = require("body-parser");
//chnaging adminRoute as exports got changed in adminRoutes
//const adminRoute = require("./Routes/admin");

const adminRoutes = require("./routes/admin");
const shopRoute = require("./routes/shop");
//moving ahead with ejs comment import for handlebars
//const { engine } = require("express-handlebars");

const app = express();

app.use(bodyParse.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

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

app.listen(3000);
