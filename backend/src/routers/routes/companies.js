const express = require('express');
const { getCompanies, postCompany, getCompanyById, patchCompany, deleteCompany } = require('../../controllers/companies');
const companiesRouter = express.Router();

companiesRouter.get('/', getCompanies);
companiesRouter.post('/', postCompany);
companiesRouter.get('/:id', getCompanyById);
companiesRouter.patch('/:id', patchCompany);
companiesRouter.delete('/:id', deleteCompany);

module.exports = companiesRouter;
