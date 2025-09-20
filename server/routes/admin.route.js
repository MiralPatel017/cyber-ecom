const express = require('express');
const User = require('../modules/user.module');
const Order = require('../modules/order.module');
const Seller = require('../modules/seller.module');
const   router = express.Router();

// ✅ Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find(); // filter only normal users
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

// ✅ Get all sellers
router.get('/sellers', async (req, res) => {
  try {
    const sellers = await Seller.find(); // filter sellers
    res.json(sellers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sellers', error });
  }
});

// ✅ Get all orders (with user details)
// router.get('/orders', async (req, res) => {
//   try {
//     const orders = await Order.find().populate('users');
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching orders', error });
//   }
// });

// ✅ Delete user by ID
router.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully', deletedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
});

// ✅ Delete seller by ID
router.delete('/sellers/:id', async (req, res) => {
  try {
    const deletedSeller = await User.findOneAndDelete({ _id: req.params.id});
    if (!deletedSeller) {
      return res.status(404).json({ message: 'Seller not found or not a seller' });
    }
    res.json({ message: 'Seller deleted successfully', deletedSeller });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting seller', error });
  }
});

module.exports = router;