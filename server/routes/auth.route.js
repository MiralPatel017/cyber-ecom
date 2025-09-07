const express = require('express');
// user
const { register, login } = require('../controllers/user.controller');

// seller
const { sellerSignup, sellerLogin } = require('../controllers/seller.controller');

// admin
const { adminSignup, adminLogin } = require('../controllers/admin.controller');
const router = express.Router();


// user
router.post('/user/signup', register);
router.post('/user/login', login);

// seller
router.post('/seller/signup', sellerSignup)
router.post('/seller/login', sellerLogin)

// admin
router.post('/admin/signup', adminSignup);
router.post('/admin/login', adminLogin);

module.exports = router;