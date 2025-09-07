const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection fd:\cyber-project\cyber-e-com-proj\client\test-ecom\serverailed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;