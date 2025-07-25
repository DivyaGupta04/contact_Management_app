const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    FirstName: {
        type: String, 
        required: true,
        trim: true
    },
    LastName: {
        type: String, 
        required: true,
        trim: true
    },
    Address: {
        type: String, 
        required: false,
        trim: true
    },
    Email: {
        type: String, 
        required: true, 
        unique: true,
        match:[/^\S+@\S+\.\S+$/, 'Please fill a valid email address']
    },
    Phone: {
        type: String, 
        required: true, 
        unique: true,
        match: [/^[0-9]{10}$/, 'Please fill a valid phone number']
    }
});

module.exports = mongoose.models.Contact|| mongoose.model('Contact', contactSchema);