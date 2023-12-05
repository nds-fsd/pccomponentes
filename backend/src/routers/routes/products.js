const express = require('express')
const { getProducts, postProduct, getProductById, patchProduct, deleteProduct } = require('../../controllers/products')
const productRouter = express.Router()

productRouter.get('/', getProducts)
productRouter.post('/', postProduct)
productRouter.get('/:id', getProductById)
productRouter.patch('/:id', patchProduct)
productRouter.delete('/:id', deleteProduct)

module.exports = productRouter