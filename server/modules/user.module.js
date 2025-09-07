const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    // userId: String,
    name: String,
    email: { type: String, unique: true },
    phone: Number,
    password: String,
    role: {
        type: String,
        enum: 'customer',
    },
    // createdAt: {
    //     currentTime: () => Date.now(),
    // },
    // updatedAt: {
    //     currentTime: () => Date.now(),
    // },
    // timestamps: {
    //     createdAt: 'created_At',
    //     updatedAt: 'updated_At',
    // }
},);

// userSchema.pre('save', async function () {
//     if (!this.isModified('password')) return;
//     this.password = await bcrypt.hash(this.password, 16);
// });

module.exports = mongoose.model('User', userSchema);