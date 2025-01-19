const { Pool } = require('pg');

// Load environment variables for database configuration
const useSSL = process.env.DB_SSL === 'true';
const isProd  = process.env.NODE_ENV === "production"

const pool = new Pool({
   connectionString: isProd ? process.env.DATABASE_URL : process.env.DATABASE_URL_DEV, 
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
