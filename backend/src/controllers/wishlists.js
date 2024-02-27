const Orders = require('../schemas/wishlists');
require('../schemas/users');
require('../schemas/products');

const getWishlists = async (req, res) => {
  try {
    const allWishlists = await Wishlists.find().populate('products');
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
    const { user, products } = req.body;

    // Check if the user already has a wishlist
    let wishlist = await Wishlist.findOne({ user });

    if (!wishlist) {
      // If the user doesn't have a wishlist, create a new one
      wishlist = new Wishlist({ user, products: [products] });
    } else {
      // If the user already has a wishlist, add the product to it if not already added
      if (!wishlist.products.includes(products)) {
        wishlist.products.push(products);
      } else {
        return res.status(400).json({ message: 'Product already exists in wishlist' });
      }
    }

    // Save the wishlist
    await wishlist.save();

    res.status(201).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
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
