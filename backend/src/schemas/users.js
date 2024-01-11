const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: Number,
  role: { type: String, enum: ['user', 'admin'], default: 'user', required: true },
});

// this function runs before saving any user in Mongo
userSchema.pre('save', function (next) {
  const user = this;

  //if the password hasn't changed, next
  if (!user.isModified('password')) return next();

  //bcrypt generates the "hash", we crypt the password
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      //if there's no error while crypting, we save it
      user.password = hash;
      next();
    });
  });
});

//Method to compare the hashed password
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

//Method to generate the JWT
userSchema.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date();

  expirationDate.setDate(today.getDate() + 60);

  let payload = {
    id: this._id,
    name: this.firstName,
    email: this.email,
    role: this.role,
  };
  // This method is from the json-web-token library (who is in charge to generate the JWT)
  return jwt.sign(payload, secret, {
    expiresIn: parseInt(expirationDate.getTime() / 1000, 10),
  });
};

const Users = model('User', userSchema);

module.exports = Users;
