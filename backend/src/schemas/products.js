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
  sale: {
    type: Number,
    default: 0,
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
  creationDate: {
    type: Date,
    default: Date.now(),
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
