const { Schema, model } = require('mongoose');

const schema = new Schema({
  name: String,
  categories: [
    {
      type: Schema.ObjectId,
      ref: 'Category',
      required: true,
    },
  ],
});

const SubCategories = model('SubCategory', schema);

module.exports = SubCategories;
