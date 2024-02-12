const Companies = require('../schemas/companies');

const getCompanies = async (req, res) => {
  try {
    const allCompanies = await Companies.find();
    res.status(200).json(allCompanies);
  } catch (error) {
    res.status(404).json({ message: 'There are no companies' });
  }
};

const postCompany = async (req, res) => {
  try {
    const body = req.body;
    const data = {
      name: body.name,
      phoneNumber: body.phoneNumber,
      socials: body.socials,
      email: body.email,
    };
    const newCompany = new Companies(data);
    await newCompany.save();
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(404).json(error);
  }
};

const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const companyFound = await Companies.findById(id);
    return res.status(200).json(companyFound);
  } catch (error) {
    return res.status(404).json(error);
  }
};

const patchCompany = async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const companyUpdated = await Companies.findByIdAndUpdate(id, body, { new: true });
    return res.status(200).json(companyUpdated);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    await Companies.findByIdAndDelete(id);
    res.status(201).json({ message: 'Company deleted successfully' });
  } catch (error) {
    return res.status(404).json(error);
  }
};

module.exports = {
  getCompanies,
  postCompany,
  getCompanyById,
  patchCompany,
  deleteCompany,
};
