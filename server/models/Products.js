const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    brand : {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
    },
    unitOfMeasure: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    involvedInOrders: {
        type: Number,
        default: 0
    },
    imageLink: {
        type: String,
        // required: true
    },
    shop: {
        type:String,
        required:true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
