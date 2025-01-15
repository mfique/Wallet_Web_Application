const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    type: { type: String, enum: ['income', 'expense'], required: true },
    amount: { type: Number, required: true },
    account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
    date: { type: Date, default: Date.now },
    category: { type: String, required: true },
    subcategory: { type: String },
    description: { type: String },
});

module.exports = mongoose.model('Transaction', transactionSchema);
