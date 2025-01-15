const pool = require('../config/db');

const createBudgetTable = `
CREATE TABLE IF NOT EXISTS budgets (
  id SERIAL PRIMARY KEY,
  amount NUMERIC NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  notifications_enabled BOOLEAN DEFAULT TRUE
);
`;
pool.query(createBudgetTable);

module.exports = {};
