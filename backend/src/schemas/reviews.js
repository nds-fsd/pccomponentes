const { Schema, model } = require('mongoose');

const reviewSchema = new Schema({
  user: { type: Schema.ObjectId, required: true, ref: 'User' },
  product: { type: Schema.ObjectId, required: true, ref: 'Product' },
  commentary: { type: String, required: true },
  date: { type: Date, default: new Date().toLocaleDateString() },
});

const Review = model('Review', reviewSchema);

module.exports = Review;
