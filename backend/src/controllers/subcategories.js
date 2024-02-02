const SubCategories = require('../schemas/subcategories');

const getSubCategories = async (req, res) => {
  try {
    const allSubCategories = await SubCategories.find();
    res.status(200).json(allSubCategories);
  } catch (error) {
    res.status(404).json({ message: 'There are no subcategories' });
  }
};

const postSubCategories = async (req, res) => {
  try {
    const body = req.body;
    const data = {
      name: body.name,
      categories: body.categories,
      products: body.products,
    };

    const newSubCategory = new SubCategories(data);
    await newSubCategory.save();
    res.status(201).json(newSubCategory);
  } catch (error) {
    res.status(404).json(error);
  }
};

const getSubCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const subCategoryFound = await SubCategories.findById(id);
    return res.status(200).json(subCategoryFound);
  } catch (error) {
    return res.status(404).json(error);
  }
};

const patchSubCategory = async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const subCategoryUpdated = await SubCategories.findByIdAndUpdate(id, body, {
      new: true,
    });
    return res.status(200).json(subCategoryUpdated);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await SubCategories.findByIdAndDelete(id);
    res.status(201).json({ message: 'Subcategory deleted Successfully' });
  } catch (error) {
    return res.status(404).json(error);
  }
};

module.exports = {
  getSubCategories,
  postSubCategories,
  getSubCategoryById,
  patchSubCategory,
  deleteSubCategory,
};
