const { Schema, model } = require('mongoose');

const ordersSchema = new Schema({
  user: { type: Schema.ObjectId, required: true, ref: 'User' },
  products: [{ type: Schema.ObjectId, required: true, ref: 'Product' }],
  address: { type: Schema.ObjectId, required: true, ref: 'Address' },
  status: {
    type: String,
    enum: ['created', 'preparing', 'sent', 'delivered', 'cancelled'],
    default: 'created',
    required: true,
  },
});

const Orders = model('Orders', ordersSchema);

module.exports = Orders;
