const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: [String],
  },
  description: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },

  categories: [
    {
      type: Schema.ObjectId,
      ref: 'Category',
      required: true,
    },
  ],
});

const Product = model('Product', productSchema);

module.exports = Product;
