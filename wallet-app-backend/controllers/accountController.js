const pool = require('../config/db');

exports.createAccount = async (req, res) => {
    const { name, type, balance } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO accounts (name, type, balance) VALUES ($1, $2, $3) RETURNING *',
            [name, type, balance]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAccounts = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM accounts');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
