const express = require("express");
const router = express.Router();
const productsRouter = require("./routes/products");
const usersRouter = require("./routes/users");

router.use("/products", productsRouter);
router.use("/users", usersRouter);

module.exports = router;
