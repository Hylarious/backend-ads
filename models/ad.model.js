const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    title: { type: String, required: true, minLength: 10, maxLength: 50 },
    content: { type: String, required: true, minLength: 20, maxLength: 1000 },
    date: { type: Date, default: Date.now, required: true },
    photo: { type: String, required: true },
    price: { type: String, required: true },
    loc: { type: String, required: true },
    user: { type: String, required: true , ref: 'User' },
});

module.exports = mongoose.model('Ad', adSchema)