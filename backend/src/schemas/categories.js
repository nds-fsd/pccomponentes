const { Schema, model } = require('mongoose');

const schema = new Schema({
  name: String,
  image: String,
});

const Categories = model('Category', schema);

module.exports = Categories;
