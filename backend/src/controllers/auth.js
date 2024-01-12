const Users = require('../schemas/users');

const registerUser = async (req, res) => {
  const email = req.body.email;
  const data = req.body;
  try {
    if (!email) {
      return res.status(404).json({ error: { register: 'Email not recieved' } });
    }
    Users.findOne({ email: email }).then((user) => {
      if (user) {
        return res.status(404).json({ error: { email: 'Email already registered' } });
      }
      const newUser = new Users({
        email: data.email,
        password: data.password,
        username: data.username,
        role: data.role,
      });

      newUser
        .save()
        .then((createdUser) => {
          return res.status(201).json({
            token: createdUser.generateJWT(),
            user: {
              email: createdUser.email,
              username: createdUser.username,
              id: createdUser._id,
              role: createdUser.role,
            },
          });
        })
        .catch((err) => {
          return res.status(500).json({ error: { username: 'Error creating new User :(' } });
        });
    });
  } catch (err) {
    return res.status(500).json({ error: { username: 'Error creating new User :(' } });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // * Validate, email and password were provided in the request
  if (!email || !password) {
    return res.status(400).json({ error: { login: 'Missing email or password' } });
  }
  Users.findOne({ email })
    .then((foundUser) => {
      // * Validate user email is already registered
      if (!foundUser) {
        return res.status(400).json({ error: { email: 'User not found, please Register' } });
      }
      // * Validate password with bcrypt library
      if (!foundUser.comparePassword(password)) {
        // if (foundUser.password !== password) {
        return res.status(400).json({ error: { password: 'Invalid Password' } });
      }
      // * if everything is ok, return the new token and user data
      return res.status(200).json({
        token: foundUser.generateJWT(),
        user: {
          email: foundUser.email,
          username: foundUser.username,
          id: foundUser._id,
          role: foundUser.role,
        },
      });
    })
    .catch((err) => {
      return res.status(500).json({ error: { register: 'Error Login in :(', error: err.message } });
    });
};

module.exports = {
  registerUser,
  loginUser,
};
