const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Product = require('../schemas/products');

const postCheckout = async (req, res) => {
  try {
    const { products } = req.body;
    const productsPriceQuantity = await Promise.all(
      products.map(async (product) => {
        const productData = await Product.findById(product.productId);
        return {
          price: productData.price,
          quantity: product.quantity,
        };
      })
    );
    const totalAmount = productsPriceQuantity.reduce((total, product) => {
      const totalPrice = product.price * product.quantity;
      return total + totalPrice;
    }, 0);
    const totalAmountCents = totalAmount * 100;
    console.log('product', totalAmountCents);

    const paymentIntent = await stripe.paymentIntents.create({
      currency: 'EUR',
      amount: totalAmountCents,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
};

const getStripePublicKey = (req, res) => {
  res.send({ publicKey: process.env.STRIPE_PUBLIC_KEY });
};

module.exports = { postCheckout, getStripePublicKey };
