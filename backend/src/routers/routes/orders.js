const express = require('express');
const { getOrders, postOrder, getOrderById, patchOrder, deleteOrder } = require('../../controllers/orders');

const ordersRouter = express.Router();

ordersRouter.get('/', getOrders);
ordersRouter.post('/', postOrder);
ordersRouter.get('/:id', getOrderById);
ordersRouter.patch('/:id', patchOrder);
ordersRouter.delete('/:id', deleteOrder);

module.exports = ordersRouter;
