const path = require("path");

const express = require("express");
//const rootDir = require("../utils/path-helper");
const productController = require("../controllers/product");

const router = express.Router();

//const products = [];

// /admin/add-product => GET
router.get("/add-product", productController.getAddProduct);

// /admin/add-product => POST
router.post("/add-product", productController.postAddProduct);

//Below code will be modified with MVC
//admin add-product GET
// router.get("/add-product", (req, res, next) => {
//   //res.sendFile(path.join(rootDir, "views", "add-product.html"));
//   res.render("add-product", {
//     pageTitle: "Add Product",
//     path: "/admin/add-product",
//     formsCSS: true,
//     productCSS: true,
//     activeAddProduct: true,
//   });
// });

//Below code updated , in implementation with MVC
// router.post("/add-product", (req, res, next) => {
//   products.push({ title: req.body.title });
//   console.log(req.body);
//   res.redirect("/");
// });

/*changing module.exports*/
//module.exports = router;
// exports.routes = router;
// exports.product = products;

module.exports = router;
