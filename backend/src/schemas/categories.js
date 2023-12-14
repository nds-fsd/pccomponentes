const { Schema, model } = require('mongoose');

const schema = new Schema({
  name: String
});

const Categories = model('categories', schema);

module.exports = Categories;
