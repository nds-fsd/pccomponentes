const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },

    phoneNumber: {
        type: Number,
        required: true
    },

    socials: {
        type: String
    },

    email: {
        type: String,
        required: true,
        unique: true
    }
});

const Company = mongoose.model('Company', schema);

module.exports = Company;