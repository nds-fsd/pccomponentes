const express = require('express');
const {
  getAddresses,
  postAddress,
  getAddressById,
  patchAddress,
  deleteAddress,
} = require('../../controllers/addresses');

const addressesRouter = express.Router();

addressesRouter.get('/', getAddresses);
addressesRouter.post('/', postAddress);
addressesRouter.get('/:id', getAddressById);
addressesRouter.patch('/:id', patchAddress);
addressesRouter.delete('/:id', deleteAddress);

module.exports = addressesRouter;
