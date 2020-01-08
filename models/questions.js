const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    question: {type: String, required: true},
    image: {type: String},
    options: {type: [], required: true},
    correctAns: {type: String, default: undefined},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('questions', userSchema);