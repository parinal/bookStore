const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  products: {
    type: Array,
    default: [],
  },
  selected: {
    type: Boolean,
    default: false,
  },
  user: {
    type: String,
    required: true,
  },
  ordered: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const List = mongoose.model("List", ListSchema);

module.exports = List;
