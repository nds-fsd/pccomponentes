const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const postCheckout = async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: 'EUR',
      amount: 9999,
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
const getSecret = (req, res) => {
  res.send({ publicKey: process.env.STRIPE_PUBLIC_KEY });
};

module.exports = { postCheckout, getStripePublicKey };
