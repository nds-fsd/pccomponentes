const { Schema, model } = require('mongoose');

const wishlistSchema = new Schema({
  user: { type: Schema.ObjectId, required: true, ref: 'User' },
  products: [{ type: Schema.ObjectId, required: true, ref: 'Product' }],
});

const Wishlist = model('Wishlist', wishlistSchema);

module.exports = Wishlist;
