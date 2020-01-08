const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const createSchema = new Schema({
    file: {type: String},
    link: {type: String},
    closing_date: {type: String},
    batch_id: {type: String},
    instruction: {type: String},
    created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('ApplicationCreate', createSchema);