const { Schema, model } = require('mongoose');

const schema = new Schema({
  categoryName: String,
  categoryImage: String,
});

const Categories = model('Category', schema);

module.exports = Categories;
