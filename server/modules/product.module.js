const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    // productId: String,
    // sellerId: String,
    {
        name: String,
        description: String,
        price: Number,
        category: String,
        image: String,
        stock: Number,
        // seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller' },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
);

module.exports = mongoose.model('Product', productSchema);