const {pool} = require('../config/db');

exports.createTransaction = async (req, res) => {
    const { type, amount, account_id, category, subcategory, description } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO transactions (type, amount, account_id, category, subcategory, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [type, amount, account_id, category, subcategory, description]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getTransactions = async (req, res) => {
    const { startDate, endDate } = req.query;
    try {
        const result = await pool.query(
            'SELECT * FROM transactions WHERE date BETWEEN $1 AND $2',
            [startDate, endDate]
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
