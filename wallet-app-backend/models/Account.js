const pool = require('../config/db');

const createAccountTable = `
CREATE TABLE IF NOT EXISTS accounts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  balance NUMERIC DEFAULT 0
);
`;
pool.query(createAccountTable);

module.exports = {};
