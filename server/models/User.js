const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  type: {
    type:String,
    required:true
  },
  address: {
    type:String,
    default:0
  }, 
  contact: {
    type:Number,
    default:0
  },
  owner: {
    type:Number,
    default: ""
  },
  paymentApp: {
    type:String,
    default: ""
  },
  paymentAppNumber: {
    type:Number,
    default: 0
  },
  orderCompleted: {
    type:Number,
    default:0
  },
  customers: {
    type: Number,
    default:0
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
