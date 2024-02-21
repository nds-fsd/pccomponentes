const express = require('express');
const {
  getReviews,
  postReview,
  getReviewById,
  patchReview,
  deleteReview,
  getProductRating,
} = require('../../controllers/reviews');

const reviewsRouter = express.Router();

reviewsRouter.get('/', getReviews);
reviewsRouter.post('/', postReview);
reviewsRouter.get('/:id', getReviewById);
reviewsRouter.patch('/:id', patchReview);
reviewsRouter.delete('/:id', deleteReview);
reviewsRouter.get('/rating', getProductRating);

module.exports = reviewsRouter;
