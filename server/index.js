// Load environment variables
require('dotenv').config();

// Import dependencies
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

// Import routes
const authRoutes = require('./routes/auth.route');
// const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/peoduct.route');
const orderRoutes = require('./routes/order.route');
const adminRoutes = require('./routes/admin.route');


// const port = process.env.PORT;
const mongoURI = process.env.MONGO_URI;

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Routes
app.use('/', authRoutes);         // Login & Signup for all roles
// http://localhost:4000/user/signup signup api
// http://localhost:4000/user/login  login api
app.use('/products', productRoutes);  // Product browsing & seller management
// app.use('/orders', orderRoutes);      // Customer orders
app.use('/admin', adminRoutes);       // Admin dashboard

// Health check route
app.get('/', (req, res) => {
    res.send('E-commerce API is running 🚀');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
})