const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    notificationsEnabled: { type: Boolean, default: true },
});

module.exports = mongoose.model('Budget', budgetSchema);
