const { Schema, model } = require('mongoose');

const directionSchema = new Schema({
  street: { type: String, required: true },
  country: { type: String, required: true },
  postalCode: { type: Number, required: true },
});

const Direction = model('directions', directionSchema);

module.exports = Direction;
