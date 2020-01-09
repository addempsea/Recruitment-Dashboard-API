const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fname: {type: String, required: true},
    lname: {type: String, required: true},
    address: {type: String, required: true},
    university: {type: String, required: true},
    cgpa: {type: Number, required: true},
    course: {type: String, required: true},
    dob: {type: String, required: true},
    email: {type: String, required: true},
    isAdmin: {type: Boolean, default: false},
    cv: {type: String, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, required: true},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Userapp', userSchema);