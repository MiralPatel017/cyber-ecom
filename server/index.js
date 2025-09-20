require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const path = require('path');

// Import routes
const authRoutes = require('./routes/auth.route');
const productRoutes = require('./routes/peoduct.route');
const adminRoutes = require('./routes/admin.route');

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use('/', authRoutes);
app.use('/products', productRoutes);
app.use('/admin', adminRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('E-commerce API is running 🚀');
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
