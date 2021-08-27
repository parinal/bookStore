var express = require("express");
var router = express.Router();
var productServie = require("../services/product.sevice");
var listServie = require("../services/list.service");
var OrderServie = require("../services/order.service");
//products
router.post("/addProduct", productServie.addProduct);
router.post("/getProducts", productServie.getProductsForShop);
router.post("/getAllProducts", productServie.getAllProducts);

//lists
router.post("/addlist", listServie.addList);
router.post("/getlist", listServie.getListsForUsers);
router.post("/addProductToList", listServie.addProduct);
router.post("/searchShops", listServie.searchList);

//order
router.post("/placeOrder", OrderServie.placeOrder);
router.post("/getOrderForUser", OrderServie.getOrderForUser);

module.exports = router;
