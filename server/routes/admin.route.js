const express = require('express');
const User = require('../modules/user.module');
const Order = require('../modules/order.module');
// const protect = require('../middlewares/roleMiddleware');
// const roleCheck = require('../middlewares/roleMiddleware');
const router = express.Router();

router.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.get('/orders', async (req, res) => {
  const orders = await Order.find().populate('user');
  res.json(orders);
});

module.exports = router;