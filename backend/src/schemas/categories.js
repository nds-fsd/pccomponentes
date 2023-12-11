const { Schema, model } = require("mongoose");

const schema = new Schema({
  name: String
});

const Categories = model("Categories", schema);

module.exports = Categories;
