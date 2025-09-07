const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const sellerSchema = new mongoose.Schema({
    // sellerId: String,
    name: String,
    email: { type: String, unique: true },
    phone: Number,
    password: String,
    role: {
        type: String,
        enum: 'seller',
    },
    // createdAt: {
    //     currentTime: () => Date.now(),
    // },
    // updatedAt: {
    //     currentTime: () => Date.now(),
    // },
    // timestamps: {
    //     createdAt: 'createdAt',
    //     updatedAt: 'updatedAt',
    // }
},);

// sellerSchema.pre('save', async function () {
//     if (!this.isModified('password')) return;
//     this.password = await bcrypt.hash(this.password, 16);
// });

module.exports = mongoose.model('Seller', sellerSchema);