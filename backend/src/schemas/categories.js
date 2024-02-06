const { Schema, model } = require('mongoose');

const schema = new Schema({
  name: String,
  image: String,
  subCategories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'SubCategory',
    },
  ],
});

const Categories = model('Category', schema);

module.exports = Categories;
