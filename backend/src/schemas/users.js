const { Schema, model } = require('mongoose');

const schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: Number,
  direction: { type: Schema.Types.ObjectId, ref: 'directions' }
});

const Users = model('users', schema);

module.exports = Users;
