const Addresses = require('../schemas/addresses');

const getAddresses = async (req, res) => {
  try {
    const allAddresses = await Addresses.find();
    res.status(200).json(allAddresses);
  } catch (error) {
    res.status(404).json({ message: 'There are no addresses' });
  }
};

const postAddress = async (req, res) => {
  try {
    const body = req.body;
    const data = {
      user: body.user,
      street: body.street,
      country: body.country,
      postalCode: body.postalCode,
    };

    const newAddress = new Addresses(data);
    await newAddress.save();
    res.status(201).json(newAddress);
  } catch (error) {
    res.status(404).json(error);
  }
};

const getAddressById = async (req, res) => {
  try {
    const { id } = req.params;
    const addressFound = await Addresses.findById(id);
    return res.status(200).json(addressFound);
  } catch (error) {
    return res.status(404).json(error);
  }
};

const patchAddress = async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const addressUpdated = await Addresses.findByIdAndUpdate(id, body, {
      new: true,
    });
    return res.status(200).json(addressUpdated);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    await Addresses.findByIdAndDelete(id);
    res.status(201).json({ message: 'Address deleted Succesfully' });
  } catch (error) {
    return res.status(404).json(error);
  }
};

module.exports = {
  getAddresses,
  postAddress,
  getAddressById,
  patchAddress,
  deleteAddress,
};
