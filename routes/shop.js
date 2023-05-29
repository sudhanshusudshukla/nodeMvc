const path = require("path");

const express = require("express");

const router = express.Router();
//const adminData = require("./admin");

const shopController = require("../controllers/shop");

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/products/:productId", shopController.getProduct);

router.get("/cart", shopController.getCart);

router.get("/orders", shopController.getOrders);

router.get("/checkout", shopController.getCheckout);

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
