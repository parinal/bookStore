const Order = require("../models/order");

let service = {};
//
service.placeOrder = async (req, res) => {
  const OrderData = req.body;
  var orders = await Order.find({ _id: req.body.user._id }).lean();
  OrderData.orderNo = orders.length + 1;
  try {
    const collection = new Order(OrderData);
    await collection.save();
    res.json({
      message: "Order placed successfully",
    });
  } catch (ex) {
    res.status(400).json({
      message: ex.message || "Error while Placing the Order",
    });
  }
};
service.getOrderForUser = async (req, res) => {
  try {
    var orders = await Order.find({ "user._id": req.body.id }).lean();
    res.json(orders);
  } catch (ex) {
    res.status(400).json({
      message: ex.message || "Error while adding the product",
    });
  }
};
module.exports = service;
