const mongoose = require('mongoose');

const companiesSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  socials: { type: String },
  email: { type: String, required: true, unique: true },
});

const Companies = mongoose.model('Companies', companiesSchema);

module.exports = Companies;
