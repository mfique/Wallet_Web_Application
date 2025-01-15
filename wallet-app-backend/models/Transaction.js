const pool = require('../config/db');

const createTransactionTable = `
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
pool.query(createTransactionTable);

module.exports = {};
