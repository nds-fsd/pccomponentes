const Reviews = require('../schemas/reviews');
require('../schemas/users');

const getReviews = async (req, res) => {
  try {
    const { productId } = req.query;
    const search = productId ? { product: productId } : {};
    const allReviews = await Reviews.find(search).populate('user', 'username');
    res.status(200).json(allReviews);
  } catch (error) {
    res.status(404).json({ message: 'There are no reviews' });
  }
};

const postReview = async (req, res) => {
  try {
    const body = req.body;
    const data = {
      user: body.user,
      product: body.product,
      rate: body.rate,
      commentary: body.commentary,
    };

    const newReview = new Reviews(data);
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(404).json(error);
  }
};

const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const reviewFound = await Reviews.findById(id);
    return res.status(200).json(reviewFound);
  } catch (error) {
    return res.status(404).json(error);
  }
};

const patchReview = async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const reviewUpdated = await Reviews.findByIdAndUpdate(id, body, {
      new: true,
    });
    return res.status(200).json(reviewUpdated);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    await Reviews.findByIdAndDelete(id);
    res.status(201).json({ message: 'Review deleted Succesfully' });
  } catch (error) {
    return res.status(404).json(error);
  }
};

const getProductRating = async (req, res) => {
  try {
    const { id } = req.params;
    const reviews = await Reviews.find({ product: id });

    if (reviews.length === 0) {
      return res.status(200).json({ totalReviews: reviews.length, message: 'No reviews yet' });
    }

    const totalRatings = reviews.reduce((acc, curr) => acc + curr.rate, 0);
    const averageRating = totalRatings / reviews.length;
    const roundedAverageRating = Math.round(averageRating * 10) / 10;

    res.status(200).json({ totalRating: roundedAverageRating, totalReviews: reviews.length });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getReviews,
  postReview,
  getReviewById,
  patchReview,
  deleteReview,
  getProductRating,
};
