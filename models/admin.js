const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: true},
    password: {type: String, required: true, min: [5, 'Too short, min is 5 characters'],
    max: [32, 'Too long, max is 32 characters']},
    email: {type: String, required: true},
    isAdmin: {type: Boolean, default: true},
    profpic: {type: String}, 
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Adminacc', userSchema);