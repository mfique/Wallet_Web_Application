const sql = require('../config/db');

(async () => {
    await sql`
    CREATE TABLE IF NOT EXISTS budgets (
      id SERIAL PRIMARY KEY,
      amount NUMERIC NOT NULL,
      start_date DATE NOT NULL,
      end_date DATE NOT NULL,
      notifications_enabled BOOLEAN DEFAULT TRUE
    )
  `;
})();

module.exports = {};
