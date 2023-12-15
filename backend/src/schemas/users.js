const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: Number,
  direction: { type: Schema.ObjectId, ref: 'directions' }
});

const Users = model('users', UserSchema);

module.exports = Users;
