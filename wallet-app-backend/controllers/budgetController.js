const {pool} = require('../config/db');

exports.createBudget = async (req, res) => {
    const { amount, start_date, end_date, notifications_enabled } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO budgets (amount, start_date, end_date, notifications_enabled) VALUES ($1, $2, $3, $4) RETURNING *',
            [amount, start_date, end_date, notifications_enabled]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getBudgets = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM budgets');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
