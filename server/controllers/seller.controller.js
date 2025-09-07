const Seller = require('../modules/seller.module');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.sellerSignup = async (req, res) => {
    const { name, email, password, role } = req.body;
    const seller = await Seller.create({ name, email, password, role });
    res.json({ token: generateToken(seller._id), role: seller.role });
};

exports.sellerLogin = async (req, res) => {
    const { email, password } = req.body;
    const seller = await Seller.findOne({ email });
    if (!seller || seller.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({ token: generateToken(seller._id), role: seller.role });
};

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
