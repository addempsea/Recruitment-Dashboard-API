const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    answer: {type: {}, required: true},
    score: {type: Number, required: true},
    doneTest: {type: Boolean, required: true, default: false},
    questionId: {type: {type: mongoose.Schema.Types.ObjectId}},
    userId: {type: mongoose.Schema.Types.ObjectId},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('UserAns', userSchema);