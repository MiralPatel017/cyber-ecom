const Admin = require('../modules/admin.module');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.adminSignup = async (req, res) => {
    const { name, email, password, role } = req.body;
    const admin = await Admin.create({ name, email, password, role });
    res.json({ token: generateToken(admin._id), role: admin.role });
};

exports.adminLogin = async (req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin || user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({ token: generateToken(admin._id), role: admin.role });
};

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });