const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user: {
    type: Object,
    required: true,
  },
  orderNo: {
    type: Number,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  status : {
      type:String,
      default: "Unpacked"
  },
  shops: {
    type: Array,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
