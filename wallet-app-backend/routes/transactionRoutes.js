const express = require('express');
const Transaction = require('../models/Transaction');

const router = express.Router();

router.post('/', async (req, res) => {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(201).send(transaction);
});

router.get('/', async (req, res) => {
    const { startDate, endDate } = req.query;
    const transactions = await Transaction.find({
        date: { $gte: new Date(startDate), $lte: new Date(endDate) },
    }).populate('account');
    res.send(transactions);
});

module.exports = router;
