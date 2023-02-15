const path = require("path");

const express = require("express");
//const rootDir = require("../utils/path-helper");
const productsController = require("../controllers/product");

const router = express.Router();
//const adminData = require("./admin");

router.get("/", productsController.getProducts);

//updated with MVC
// router.get("/", (req, res, next) => {
//   //Now we already define views in views app.js, we dont need to construct path
//   //hence ca be render like below
//   //res.sendFile(path.join(rootDir, "views", "shop.html"));
//   const products = adminData.product;
//   res.render("shop", {
//     prds: products,
//     pageTitle: "Shop",
//     path: "/",
//     hasProducts: products.length > 0,
//     activeShop: true,
//     productCSS: true,
//   });
// });

module.exports = router;
