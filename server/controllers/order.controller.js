const Order = require('../modules/order.module');

exports.createOrder = async (req, res) => {
  const { products, totalAmount } = req.body;
  const order = await Order.create({
    user: req.user.id,
    products,
    totalAmount
  });
  res.json(order);
};

exports.getUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).populate('products.product');
  res.json(orders);
};