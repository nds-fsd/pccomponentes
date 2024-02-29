const express = require('express');
const {
  getWishlists,
  postWishlist,
  getWishlistById,
  patchWishlist,
  deleteWishlist,
  getWishlistsByUserId,
  addToWishlist,
  removeFromWishlist,
} = require('../../controllers/wishlists');

const wishlistRouter = express.Router();

wishlistRouter.get('/', getWishlists);
wishlistRouter.post('/', postWishlist);
wishlistRouter.get('/:id', getWishlistById);
wishlistRouter.patch('/:id', patchWishlist);
wishlistRouter.delete('/:id', deleteWishlist);
wishlistRouter.get('/user/:userId', getWishlistsByUserId);
wishlistRouter.post('/:id/add', addToWishlist);
wishlistRouter.post('/:id/remove', removeFromWishlist);

module.exports = wishlistRouter;
