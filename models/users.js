const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fname: {type: String, required: true},
    lname: {type: String, required: true},
    phone: {type: Number, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    isAdmin: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Useracc', userSchema);