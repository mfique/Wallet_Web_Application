const { pool } = require('../config/db'); // Ensure correct db import

// Function to create the accounts table
const createAccountsTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS accounts (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            type VARCHAR(50) NOT NULL,
            balance NUMERIC DEFAULT 0
        );
    `;

    try {
        // Execute the query to create the table if it doesn't exist
        await pool.query(query);
        console.log('Accounts table created or already exists.');
    } catch (err) {
        console.error('Error creating accounts table:', err.message);
    }
};

// Function to initialize the database
const initializeDatabase = async () => {
    try {
        console.log('Initializing accounts table...');
        await createAccountsTable();
        console.log('Accounts table initialization complete.');
    } catch (err) {
        console.error('Accounts database initialization failed:', err.message);
    }
};

// Export the initializeDatabase function
module.exports = { initializeDatabase };
