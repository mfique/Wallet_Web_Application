const { pool } = require('../config/db');

const createTransactionsTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS transactions (
            id SERIAL PRIMARY KEY,
            type VARCHAR(50) NOT NULL,
            amount NUMERIC NOT NULL,
            account_id INT REFERENCES accounts(id),
            date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            category VARCHAR(255) NOT NULL,
            subcategory VARCHAR(255),
            description TEXT
        );
    `;

    try {
        console.log('Creating transactions table...');
        await pool.query(query);
        console.log('Transactions table created or already exists.');
    } catch (err) {
        console.error('Error creating transactions table:', err.message);
        throw err; // Ensure the error bubbles up
    }
};

const initializeDatabase = async () => {
    try {
        console.log('Initializing transactions table...');
        await createTransactionsTable();
        console.log('Transactions table initialization complete.');
    } catch (err) {
        console.error('Transactions database initialization failed:', err.message);
        throw err; // Rethrow to allow centralized error handling
    }
};

module.exports = { initializeDatabase };
