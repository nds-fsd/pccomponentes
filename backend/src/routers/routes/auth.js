const express = require('express');
const { registerUser, loginUser } = require('../../controllers/auth');
const { validateUser } = require('../../middlewares');

const authRouter = express.Router();

authRouter.post('/register', validateUser, registerUser);
authRouter.post('/login', loginUser);

module.exports = authRouter;
