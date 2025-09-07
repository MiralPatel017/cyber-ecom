const User = require('../modules/user.module');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        console.log("req.body :- ", req.body);

        const user = await User.create({ name, email, password, role });

        const token = generateToken(user._id);

        // Save token in cookie
        res.cookie("token", token, {
            httpOnly: true,     // prevents client-side JS access
            secure: process.env.NODE_ENV === "production", // use HTTPS in prod
            sameSite: "strict", // prevent CSRF
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.json({ role: user.role, message: "Registered successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user._id);

        // Save token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({ role: user.role, message: "Login successful" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
