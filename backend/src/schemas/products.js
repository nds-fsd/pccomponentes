const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  stock: { type: Number, required: true },
  categories: [{ type: Schema.Types.ObjectId, ref: "category", required: true }]
});

const Product = model("product", productSchema);

module.exports = Product;
