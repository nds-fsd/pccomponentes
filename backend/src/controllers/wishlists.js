const Wishlists = require('../schemas/wishlists');
require('../schemas/users');
require('../schemas/products');

const getWishlists = async (req, res) => {
  try {
    const allWishlists = await Wishlists.find();
    res.status(200).json(allWishlists);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: 'There are no wishlists',
    });
  }
};

const postWishlist = async (req, res) => {
  try {
    const body = req.body;
    const data = {
      user: body.user,
      products: body.products,
    };
    const newWishlist = new Wishlists(data);
    await newWishlist.save();
    res.status(201).json(newWishlist);
  } catch (error) {
    res.status(404).json(error);
  }
};

const getWishlistById = async (req, res) => {
  try {
    const { id } = req.params;
    const WishlistFound = await Wishlists.findById(id).populate('user', 'products');
    return res.status(200).json(WishlistFound);
  } catch (error) {
    return res.status(404).json(error);
  }
};

const patchWishlist = async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const wishlistUpdated = await Wishlists.findByIdAndUpdate(id, body, {
      new: true,
    });
    return res.status(200).json(wishlistUpdated);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteWishlist = async (req, res) => {
  try {
    const { id } = req.params;
    await Wishlists.findByIdAndDelete(id);
    res.status(201).json({
      message: `Your wishlist has been succesfully deleted`,
    });
  } catch (error) {
    return res.status(404).json(error);
  }
};

module.exports = {
  getWishlists,
  postWishlist,
  getWishlistById,
  patchWishlist,
  deleteWishlist,
};