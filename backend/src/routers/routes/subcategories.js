const express = require('express');
const {
  getSubCategories,
  postSubCategories,
  getSubCategoryById,
  patchSubCategory,
  deleteSubCategory,
} = require('../../controllers/subcategories');

const subCategoriesRouter = express.Router();

subCategoriesRouter.get('/', getSubCategories);
subCategoriesRouter.post('/', postSubCategories);
subCategoriesRouter.get('/:id', getSubCategoryById);
subCategoriesRouter.patch('/:id', patchSubCategory);
subCategoriesRouter.delete('/:id', deleteSubCategory);

module.exports = subCategoriesRouter;
