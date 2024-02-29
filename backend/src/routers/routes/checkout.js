const express = require('express');
const { postCheckout, getStripePublicKey } = require('../../controllers/checkout');

const checkoutRouter = express.Router();

checkoutRouter.post('/', postCheckout);
checkoutRouter.get('/public-key', getStripePublicKey);
module.exports = checkoutRouter;
