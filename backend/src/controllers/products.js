const Product = require('../schemas/products');

const getProducts =
  async (
    req,
    res
  ) => {
    try {
      const allProducts =
        await Product.find();
      res
        .status(
          200
        )
        .json(
          allProducts
        );
    } catch (error) {
      res
        .status(
          404
        )
        .json(
          {
            message:
              'There are no products',
          }
        );
    }
  };

const postProduct =
  async (
    req,
    res
  ) => {
    try {
      const body =
        req.body;
      const data =
        {
          name: body.name,
          brand:
            body.brand,
          price:
            body.price,
          image:
            body.image,
          description:
            body.description,
          stock:
            body.stock,
        };
      const newProduct =
        new Product(
          data
        );
      await newProduct.save();
      res
        .status(
          201
        )
        .json(
          newProduct
        );
    } catch (error) {
      res
        .status(
          404
        )
        .json(
          error
        );
    }
  };

const getProductById =
  async (
    req,
    res
  ) => {
    try {
      const {
        id,
      } =
        req.params;
      const ProductFound =
        await Product.findById(
          id
        );
      return res
        .status(
          200
        )
        .json(
          {
            ProductFound,
          }
        );
    } catch (error) {
      return res
        .status(
          404
        )
        .json(
          error
        );
    }
  };

const patchProduct =
  async (
    req,
    res
  ) => {
    try {
      const body =
        req.body;
      const {
        id,
      } =
        req.params;
      const productUpdated =
        await Product.findByIdAndUpdate(
          id,
          body,
          {
            new: true,
          }
        );
      return res
        .status(
          200
        )
        .json(
          {
            productUpdated,
          }
        );
    } catch (error) {
      return res
        .status(
          500
        )
        .json(
          error
        );
    }
  };

const deleteProduct =
  async (
    req,
    res
  ) => {
    try {
      const {
        id,
      } =
        req.params;
      await Product.findByIdAndDelete(
        id
      );
      res
        .status(
          201
        )
        .json(
          {
            message:
              'Product deleted Succesfully',
          }
        );
    } catch (error) {
      return res
        .status(
          404
        )
        .json(
          error
        );
    }
  };

module.exports =
  {
    getProducts,
    postProduct,
    getProductById,
    patchProduct,
    deleteProduct,
  };
