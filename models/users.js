const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fname: {type: String, required: true},
    lname: {type: String, required: true},
    phone: {type: String, required: true, minlength: 11},
    password: {type: String, required: true, minlength: 6},
    email: {type: String, required: true},
    isAdmin: {type: Boolean, default: false},
    accepted: {type: Boolean, default: false},
    profpic: {type: String}, 
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Useracc', userSchema);