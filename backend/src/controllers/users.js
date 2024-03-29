const Users = require('../schemas/users');

const getUsers = async (req, res) => {
  try {
    const allUsers = await Users.find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(404).json({ message: 'There are no users' });
  }
};

const postUser = async (req, res) => {
  try {
    const body = req.body;
    const data = {
      username: body.username,
      email: body.email,
      password: body.password,
      phoneNumber: body.phoneNumber,
      role: body.role,
      newsletter: body.newsletter,
    };

    const newUser = new Users(data);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(404).json(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const userFound = await Users.findById(id);
    return res.status(200).json(userFound);
  } catch (error) {
    return res.status(404).json(error);
  }
};

const patchUser = async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;

    // Validar que solo se actualicen los campos permitidos
    const allowedFields = ['username', 'email', 'role'];
    const filteredBody = Object.keys(body).reduce((acc, key) => {
      if (allowedFields.includes(key)) {
        acc[key] = body[key];
      }
      return acc;
    }, {});

    const userUpdated = await Users.findByIdAndUpdate(id, filteredBody, {
      new: true,
    });

    return res.status(200).json(userUpdated);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await Users.findByIdAndDelete(id);
    res.status(201).json({ message: 'User deleted Successfully' });
  } catch (error) {
    return res.status(404).json(error);
  }
};

module.exports = {
  getUsers,
  postUser,
  getUserById,
  patchUser,
  deleteUser,
};
