const express = require('express');
const { createOrder, getUserOrders } = require('../controllers/order.controller');
const protect = require('../middlewares/roleMiddleware');
const router = express.Router();

router.post('/', protect, createOrder);
router.get('/', protect, getUserOrders);

module.exports = router;