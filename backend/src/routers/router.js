const express = require("express");
const router = express.Router();
const productsRouter = require("./routes/products");
const usersRouter = require("./routes/users");
const companiesRouter = require("./routes/companies");

router.use("/products", productsRouter);
router.use("/companies", companiesRouter);
router.use("/users", usersRouter);

module.exports = router;
