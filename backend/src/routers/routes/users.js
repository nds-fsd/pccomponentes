const express = require('express');
const {
  getUsers,
  postUser,
  getUserById,
  patchUser,
  deleteUser,
  addDirection
} = require('../../controllers/users');

const usersRouter = express.Router();

usersRouter.get('/', getUsers);
usersRouter.post('/', postUser);
usersRouter.get('/:id', getUserById);
usersRouter.patch('/:id', patchUser);
usersRouter.delete('/:id', deleteUser);

usersRouter.patch('/direction/:id', addDirection);

module.exports = usersRouter;
