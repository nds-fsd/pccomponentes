const moongose = require("moongose");

const schema = new moongose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: Number },
  direction: { type: String, required: true }
});

const Users = moongose.model("Users", schema);

module.exports = Users;
