const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    question: {type: String},
    image: {type: String},
    options: {type: {}, default: undefined},
    correctAns: {type: Number},
    right: {type: String},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('questions', userSchema);