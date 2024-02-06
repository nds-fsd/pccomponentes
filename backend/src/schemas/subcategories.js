const { Schema, model } = require('mongoose');

const schema = new Schema({
  name: String,
});

const SubCategories = model('SubCategory', schema);

module.exports = SubCategories;
