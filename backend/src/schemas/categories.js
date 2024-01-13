const { Schema, model } = require('mongoose');

const schema = new Schema({
  categoryName: String,
  categoryImage: String,
});

const Categories = model('categories', schema);

module.exports = Categories;
