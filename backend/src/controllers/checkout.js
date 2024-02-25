const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const postCheckout = async (req, res) => {
  try {
    const { id, amount } = req.body;
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'EUR',
      payment_method: id,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.status(200).json(payment);
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
};

module.exports = { postCheckout };
