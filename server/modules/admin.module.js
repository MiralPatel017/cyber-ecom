const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
    // sellerId: String,
    name: String,
    email: { type: String, unique: true },
    // phone: Number,
    password: String,
    role: {
        type: String,
        enum: 'admin',
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

// adminSchema.pre('save', async function () {
//     if (!this.isModified('password')) return;
//     this.password = await bcrypt.hash(this.password, 16);
// });

module.exports = mongoose.model('Admin', adminSchema);