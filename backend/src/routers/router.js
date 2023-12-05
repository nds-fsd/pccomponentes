const express = require('express')
const router = express.Router()
const productsRouter = require("./routes/products")
router.use('/products', productsRouter)



module.exports = router;