const sql = require('../config/db');

(async () => {
    await sql`
    CREATE TABLE IF NOT EXISTS accounts (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      type VARCHAR(50) NOT NULL,
      balance NUMERIC DEFAULT 0
    )
  `;
})();

module.exports = {};
