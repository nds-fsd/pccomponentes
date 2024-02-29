const Orders = require('../schemas/orders');
require('../schemas/users');
require('../schemas/products');
require('../schemas/addresses');

const getOrders = async (req, res) => {
  try {
    const allOrders = await Orders.find().populate('user').populate('products').populate('address');
    res.status(200).json(allOrders);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: 'There are no orders',
    });
  }
};

const postOrder = async (req, res) => {
  try {
    const body = req.body;
    const data = {
      user: body.user,
      products: body.products,
      address: body.address,
      status: body.status,
    };
    const newOrder = new Orders(data);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(404).json(error);
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const OrderFound = await Orders.findById(id).populate('user').populate('products').populate('address');
    return res.status(200).json(OrderFound);
  } catch (error) {
    return res.status(404).json(error);
  }
};

const patchOrder = async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const orderUpdated = await Orders.findByIdAndUpdate(id, body, {
      new: true,
    });
    return res.status(200).json(orderUpdated);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await Orders.findByIdAndDelete(id);
    res.status(201).json({
      message: `Order ${id} succesfully deleted`,
    });
  } catch (error) {
    return res.status(404).json(error);
  }
};

module.exports = {
  getOrders,
  postOrder,
  getOrderById,
  patchOrder,
  deleteOrder,
};
