const sql = require('../config/db');

exports.createAccount = async (req, res) => {
    const { name, type, balance } = req.body;
    try {
        const result = await sql`
      INSERT INTO accounts (name, type, balance)
      VALUES (${name}, ${type}, ${balance})
      RETURNING *;
    `;
        res.status(201).json(result[0]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create account', details: err.message });
    }
};

exports.getAccounts = async (req, res) => {
    try {
        const result = await sql`SELECT * FROM accounts`;
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch accounts', details: err.message });
    }
};
