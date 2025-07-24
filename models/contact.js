const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    FirstName: {type: String, required: true},
    LastName: {type: String, required: true},
    address: {type: String, required: false},
    Email: {type: String, required: true, unique: true},
    Phone: {type: String, required: true, unique: true}
});

module.exports = mongoose.models.Contact|| mongoose.model('Contact', contactSchema);