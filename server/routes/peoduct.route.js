const express = require('express');
// getAllProducts,
const { getAllProducts, createProduct, getSellerProducts } = require('../controllers/product.controller');
// const protect = require('../middlewares/roleMiddleware');
// const roleCheck = require('../middlewares/roleMiddleware');
const router = express.Router();

router.get('/', getAllProducts);
router.post('/', createProduct);
router.get('/seller', getSellerProducts);

module.exports = router;