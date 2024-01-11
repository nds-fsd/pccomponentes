const { Schema, model } = require('mongoose');

const categoriesSchema = new Schema({ categoryName: String });

const Categories = model('Category', categoriesSchema);

module.exports = Categories;
