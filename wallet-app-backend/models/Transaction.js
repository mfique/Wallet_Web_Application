const sql = require('../config/db');

// Initialize Transactions Table
(async () => {
    await sql`
    CREATE TABLE IF NOT EXISTS transactions (
      id SERIAL PRIMARY KEY,
      type VARCHAR(50) NOT NULL,
      amount NUMERIC NOT NULL,
      account_id INT REFERENCES accounts(id),
      date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      category VARCHAR(255) NOT NULL,
      subcategory VARCHAR(255),
      description TEXT
    )
  `;
})();

module.exports = {};
