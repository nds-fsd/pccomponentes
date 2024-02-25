const express = require('express');
const { postCheckout } = require('../../controllers/checkout');

const checkoutRouter = express.Router();

checkoutRouter.post('/', postCheckout);

module.exports = checkoutRouter;
