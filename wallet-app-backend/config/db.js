const { Pool } = require('pg');

// Load environment variables for database configuration
const useSSL = process.env.DB_SSL === 'true';

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT, 10),
    ssl: useSSL ? { rejectUnauthorized: false } : false,
});

// Log successful connection (for debugging)
pool.connect()
    .then(() => console.log('Database connected successfully.'))
    .catch((err) => {
        console.error('Error connecting to the database:', err.message);
        process.exit(1); // Exit the process if the database connection fails
    });

// Handle unexpected database errors
pool.on('error', (err) => {
    console.error('Unexpected database error:', err.message);
    process.exit(1); // Exit the process on critical database errors
});

module.exports = { pool };
