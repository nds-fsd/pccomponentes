const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: String,

  description: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  productCategories: [
    {
      type: Schema.ObjectId,
      ref: 'categories',
      required: true
    }
  ]
});

const Product = model('product', productSchema);

module.exports = Product;
