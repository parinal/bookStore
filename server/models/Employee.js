const mongoose = require('mongoose');

const EmpSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: false
    },
    imageLink: {
        type: String,
        // required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('Employee', EmpSchema);

module.exports = User;
