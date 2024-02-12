const express = require('express');
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const addressesRouter = require('./routes/addresses');
const companiesRouter = require('./routes/companies');
const categoriesRouter = require('./routes/categories');
const reviewsRouter = require('./routes/reviews');
const authRouter = require('./routes/auth');
const { jwtMiddleware } = require('../security/jwt');

const router = express.Router();

router.use('/products', productsRouter);
router.use('/companies', companiesRouter);
router.use('/users', usersRouter);
router.use('/addresses', addressesRouter);
router.use('/categories', categoriesRouter);
router.use('/reviews', reviewsRouter);
router.use('/auth', authRouter);

module.exports = router;
