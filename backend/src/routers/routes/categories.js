const express = require('express');
const {
  getCategories,
  postCategories,
  getCategoryById,
  patchCategory,
  deleteCategory
} = require('../../controllers/categories');
const categoriesRouter = express.Router();

categoriesRouter.get('/', getCategories);
categoriesRouter.post('/', postCategories);
categoriesRouter.get('/:id', getCategoryById);
categoriesRouter.patch('/:id', patchCategory);
categoriesRouter.delete('/:id', deleteCategory);

module.exports = categoriesRouter;
