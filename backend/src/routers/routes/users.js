const express = require('express');
const { getUsers, postUser, getUserById, patchUser, deleteUser } = require('../../controllers/users');
const { validateUser } = require('../../middlewares');

const usersRouter = express.Router();

usersRouter.get('/', getUsers);
usersRouter.post('/', validateUser, postUser);
usersRouter.get('/:id', getUserById);
usersRouter.patch('/:id', patchUser);
usersRouter.delete('/:id', deleteUser);

module.exports = usersRouter;
