const express = require('express');
const { getReviews, postReview, getReviewById, patchReview, deleteReview } = require('../../controllers/reviews');

const reviewsRouter = express.Router();

reviewsRouter.get('/', getReviews);
reviewsRouter.post('/', postReview);
reviewsRouter.get('/:id', getReviewById);
reviewsRouter.patch('/:id', patchReview);
reviewsRouter.delete('/:id', deleteReview);

module.exports = reviewsRouter;
