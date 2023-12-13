const Categories = require('../schemas/categories');

const getCategories = async (req, res) => {
  try {
    const allCategories = await Categories.find();
    res.status(200).json(allCategories);
  } catch (error) {
    res.status(404).json({ message: 'There are no categories' });
  }
};

const postCategories = async (req, res) => {
  try {
    const body = req.body;
    const data = {
      name: body.name
    };

    const newCategory = new Categories(data);
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(404).json(error);
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const categoryFound = await Categories.findById(id);
    return res.status(200).json(categoryFound);
  } catch (error) {
    return res.status(404).json(error);
  }
};

const patchCategory = async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const categoryUpdated = await Categories.findByIdAndUpdate(id, body, {
      new: true
    });
    return res.status(200).json(categoryUpdated);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Categories.findByIdAndDelete(id);
    res.status(201).json({ message: 'Category deleted Succesfully' });
  } catch (error) {
    return res.status(404).json(error);
  }
};

module.exports = {
  getCategories,
  postCategories,
  getCategoryById,
  patchCategory,
  deleteCategory
};
