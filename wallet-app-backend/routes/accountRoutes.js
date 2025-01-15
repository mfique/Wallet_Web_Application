const express = require('express');
const Account = require('../models/Account');

const router = express.Router();

router.post('/', async (req, res) => {
    const account = new Account(req.body);
    await account.save();
    res.status(201).send(account);
});

module.exports = router;
