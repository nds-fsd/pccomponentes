const Reviews = require('../schemas/reviews');

const getReviews = async (req, res) => {
  try {
    const allReviews = await Reviews.find();
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
      commentary: body.commentary,
      date: body.date,
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

module.exports = {
  getReviews,
  postReview,
  getReviewById,
  patchReview,
  deleteReview,
};
