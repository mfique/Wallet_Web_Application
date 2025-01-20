const {pool} = require('../config/db');

exports.createNotification = async (req, res) => {
    const { message } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO notifications (message) VALUES ($1) RETURNING *',
            [message]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getNotifications = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM notifications WHERE read = FALSE');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.markAsRead = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            'UPDATE notifications SET read = TRUE WHERE id = $1 RETURNING *',
            [id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
