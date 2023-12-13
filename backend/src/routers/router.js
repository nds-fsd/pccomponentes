const express = require('express');
const router = express.Router();
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const companiesRouter = require('./routes/companies');
const categoriesRouter = require('./routes/categories');

router.use('/products', productsRouter);
router.use('/companies', companiesRouter);
router.use('/users', usersRouter);
router.use('/categories', categoriesRouter);

module.exports = router;
