const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: true},
    password: {type: String, required: true, minlength: 6},
    email: {type: String, required: true},
    isAdmin: {type: Boolean, default: true},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Adminacc', userSchema);