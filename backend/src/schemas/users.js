const { Schema, model } = require("mongoose");

const schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: Number,
  direction: String
});

const Users = model("Users", schema);

module.exports = Users;
