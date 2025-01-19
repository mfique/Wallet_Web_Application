const { pool } = require('../config/db'); // Import the database pool configuration

// Function to create the "users" table
const createUsersTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            name VARCHAR(255),
            role VARCHAR(50) DEFAULT 'user',  -- Default role is 'user'
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    try {
        // Execute the query to create the table
        await pool.query(query);
        console.log('Users table created or already exists.');
    } catch (err) {
        console.error('Error creating users table:', err.message);
    }
};

// Initialize table creation
const initializeDatabase = async () => {
    try {
        console.log('Initializing database...');
        await createUsersTable();
        console.log('Database initialization complete.');
    } catch (err) {
        console.error('Database initialization failed:', err.message);
    }
};

module.exports = { initializeDatabase };
