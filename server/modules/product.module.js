const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    category: String,
    image: String, // store image filename / URL
    stock: { type: Number, default: 0 },
    // seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller' },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

module.exports = mongoose.model('Product', productSchema);
