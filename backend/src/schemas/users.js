const moongose = require("moongose");

const schema = new moongose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: Number,
  direction: String
});

const Users = moongose.model("Users", schema);

module.exports = Users;
