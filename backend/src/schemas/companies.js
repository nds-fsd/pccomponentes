const mongoose = require('mongoose');

const companiesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  socials: { type: String },
  email: { type: String, required: true, unique: true },
});

const Companies = mongoose.model('Company', companiesSchema);

module.exports = Companies;
