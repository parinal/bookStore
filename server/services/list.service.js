// var fs = require('fs');
const listModel = require("../models/List");
const productModel = require("../models/Products");
const User = require("../models/User");
// const categoryModel = require('../models/category.model');
let service = {};
//
service.addList = async (req, res) => {
  const ListData = req.body;
  try {
    const collection = new listModel(ListData);
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
service.getListsForUsers = async (req, res) => {
  //   var newLists = [];
  try {
    var lists = await listModel.find({ user: req.body.id }).lean();
    // await Promise.all(
    //   lists.map(async (list) => {
    //     var oids = [];
    //     await list.products.forEach(function (item) {
    //       oids.push(mongoose.Types.ObjectId(item));
    //     });
    //     //   list.productDetails = oids;
    //     list.products = await productModel
    //       .find({
    //         _id: { $in: oids },
    //       })
    //       .lean();
    //     //   list.products.form
    //     //   groupBy("color", data);
    //     var hash = list.products.reduce(
    //       (p, c) => (
    //         p[c.category] ? p[c.category].push(c) : (p[c.category] = [c]), p
    //       ),
    //       {}
    //     );
    //     var newData = Object.keys(hash).map((k) => ({
    //       category: k,
    //       products: hash[k],
    //     }));
    //     list.products = newData;
    //     newLists.push(list);
    //   })
    // );
    res.json(lists);
  } catch (ex) {
    res.status(400).json({
      message: ex.message || "Error while adding the product",
    });
  }
};
service.addProduct = async (req, res) => {
  try {
    listModel
      .findByIdAndUpdate(
        { _id: req.body.listId },
        { $push: { products: req.body.product } },
        // {returnOriginal:false},
        { new: true },
        async function (err, result) {
          await groupBy(result.products, "category");
          res.json(result);
        }
      )
      .lean();
    // listModel.findOne(mongoose.ObjectId(req.body.listId),function (err, list) {

    //   if (list) {
    //     list.products.push(req.body.product);
    //     list.save(function (err) {
    //       // something here
    //       res.json(list);
    //     });
    //   } else {
    //     res.json({ message: "list Not found" });
    //   }
    // }).lean();
  } catch (ex) {
    res.status(400).json({
      message: ex.message || "Error while adding the product",
    });
  }
  // res.json(docs);
};

service.searchList = async (req, res) => {
  // console.log(shops)

  await listModel
    .findOne({ _id: req.body.list_id })
    .lean()
    .exec(async function (err, list) {
      if (err) res.err(err);
      var listProducts = list.products;
      // filter shops by address(city) : pending
      await User.find({ type: "shop" })
        .lean()
        .exec(async (err, shops) => {
          if (err) res.err(err);
          for (var shop of shops) {
            shop.listProducts = [];
            shop.amount = 0;
            var shopProducts = await productModel
              .find({ shop: shop._id })
              .lean();
            for (var listProduct of listProducts) {
              var result = shopProducts.find((prod) => {
                return prod.name === listProduct.name;
              });
              if (result) {
                if (listProduct.unitOfMeasure === "weight") {
                  listProduct.amount =
                    result.price / (result.unit / listProduct.weight);
                  shop.listProducts.push(listProduct);
                  shop.amount += listProduct.amount
                }
                if (listProduct.unitOfMeasure === "peices") {
                  listProduct.amount =
                    result.price * (listProduct.peices / result.unit);
                  shop.listProducts.push(listProduct);
                }
              }
            }
          }
          console.log(shops);
          res.json({ list: list, shops: shops });
        });
    });
};

const groupBy = (array, key) => {
  return array.reduce((result, currentValue) => {
    (result[currentValue.color] = result[currentValue.color] || []).push(
      currentValue
    );
    console.log(result);
    return result;
  }, {});
};

module.exports = service;
