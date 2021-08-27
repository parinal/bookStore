// var fs = require('fs');
// const mongoose = require("mongoose");
const productModel = require("../models/Products");
// const categoryModel = require('../models/category.model');
let service = {};
//
service.addProduct = async (req, res) => {
  const productData = req.body;
  try {
    const collection = new productModel(productData);
    await collection.save();
    res.json({
      message: "Product added successfully",
    });
  } catch (ex) {
    res.status(400).json({
      message: ex.message || "Error while adding the product",
    });
  }
};
service.getProductsForShop = async (req, res) => {
  try {
    res.json(await productModel.find({ shop: req.body.id }));
  } catch (ex) {
    res.status(400).json({
      message: ex.message || "Error while adding the product",
    });
  }
  // res.json(docs);
};

service.getAllProducts = async (req, res) => {
    try {
      res.json(await productModel.find());
    } catch (ex) {
      res.status(400).json({
        message: ex.message || "Error while adding the product",
      });
    }
    // res.json(docs);
  };

module.exports = service;
