const Product = require('../schemas/products')

const getProducts = async (req, res) => {
    try {
        const allProducts = await Product.find()
        res.status(200).json(allProducts)

    } catch (error) {
        res.status(404).json({ message: "There are no products" })
    }
}

const postProduct = async (req, res) => {
    try {
        const body = req.body
        const data = {
            name: body.name,
            brand: body.brand,
            price: body.price,
            description: body.description,
            stock: body.stock
        }
        const newProduct = new Product(data)
        await newProduct.save()
        res.status(201).json(newProduct)
    } catch (error) {
        res.status(404).json(error)
    }
}

module.exports = {
    getProducts,
    postProduct,
}