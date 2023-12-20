const { Schema, model } = require('mongoose');

const categoriesSchema = new Schema({ categoryName: String });

const Categories = model('categories', categoriesSchema);

module.exports = Categories;
