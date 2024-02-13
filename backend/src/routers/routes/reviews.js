const express = require('express');
const {
  getReviews,
  getReviewsByProductId,
  postReview,
  getReviewById,
  patchReview,
  deleteReview,
} = require('../../controllers/reviews');

const reviewsRouter = express.Router();

reviewsRouter.get('/', getReviews);
reviewsRouter.get('/product/:id', getReviewsByProductId);
reviewsRouter.post('/', postReview);
reviewsRouter.get('/:id', getReviewById);
reviewsRouter.patch('/:id', patchReview);
reviewsRouter.delete('/:id', deleteReview);

module.exports = reviewsRouter;
