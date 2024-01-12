const { Schema, model } = require('mongoose');

const addressSchema = new Schema({
  user: { type: Schema.ObjectId, required: true, ref: 'User' },
  street: { type: String, required: true },
  country: { type: String, required: true },
  postalCode: { type: Number, required: true },
});

const Address = model('Address', addressSchema);

module.exports = Address;
