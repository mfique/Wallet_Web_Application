const { pool } = require('../config/db'); // Ensure correct db import

// Function to create the notifications table
const createNotificationsTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS notifications (
            id SERIAL PRIMARY KEY,
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            read BOOLEAN DEFAULT FALSE
        );
    `;

    try {
        console.log('Creating notifications table...');
        await pool.query(query);
        console.log('Notifications table created or already exists.');
    } catch (err) {
        console.error('Error creating notifications table:', err.message);
        throw err; // Ensure the error bubbles up
    }
};

// Initialize the notifications table
const initializeDatabase = async () => {
    try {
        console.log('Initializing notifications table...');
        await createNotificationsTable();
        console.log('Notifications table initialization complete.');
    } catch (err) {
        console.error('Notifications database initialization failed:', err.message);
        throw err; // Rethrow to allow centralized error handling
    }
};

// Export the initializeDatabase function
module.exports = { initializeDatabase };
