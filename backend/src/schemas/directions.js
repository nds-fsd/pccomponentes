const { Schema, model } = require('mongoose');

const schema = new Schema({
  street: { type: String, required: true },
  country: { type: String, required: true },
  postalCode: { type: String, required: true }
});

const Directions = model('directions', schema);

module.exports = Directions;
