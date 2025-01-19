const { pool } = require('../config/db');

// Function to create the budgets table
const createBudgetsTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS budgets (
            id SERIAL PRIMARY KEY,
            amount NUMERIC NOT NULL,
            start_date DATE NOT NULL,
            end_date DATE NOT NULL,
            notifications_enabled BOOLEAN DEFAULT TRUE
        );
    `;

    try {
        // Execute the query to create the table
        await pool.query(query);
        console.log('Budgets table created or already exists.');
    } catch (err) {
        console.error('Error creating budgets table:', err.message);
    }
};

// Function to initialize the database
const initializeDatabase = async () => {
    try {
        console.log('Initializing budgets table...');
        await createBudgetsTable();
        console.log('Budgets table initialization complete.');
    } catch (err) {
        console.error('Budgets database initialization failed:', err.message);
    }
};

// Export the initializeDatabase function
module.exports = { initializeDatabase };
