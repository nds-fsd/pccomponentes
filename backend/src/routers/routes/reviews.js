const express = require('express');
const {
  getReviews,
  getReviewsByProduct,
  postReview,
  getReviewById,
  patchReview,
  deleteReview,
} = require('../../controllers/reviews');

const reviewsRouter = express.Router();

reviewsRouter.get('/', getReviews);
reviewsRouter.get('/product:id', getReviewsByProduct);
reviewsRouter.post('/', postReview);
reviewsRouter.get('/:id', getReviewById);
reviewsRouter.patch('/:id', patchReview);
reviewsRouter.delete('/:id', deleteReview);

module.exports = reviewsRouter;
