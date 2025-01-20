const { pool } = require('../config/db');

exports.createAccount = async (req, res) => {
    const { name, type, balance } = req.body;
    try {
       await pool.query(`
      INSERT INTO accounts (name, type, balance)
      VALUES ($1, $2, $3)
      RETURNING *;
    `, [name, type, balance], (error, result ) => {
            if (error){
               return res.status(500).send({ error: error.message });
            }

            return res.status(200).send({ result: result.fields });
        });

    } catch (err) {
        res.status(500).json({ error: 'Failed to create account', details: err.message });
    }
};

exports.getAccounts = async (req, res) => {
    try {
       await pool.query(`SELECT * FROM accounts`, (err, result) => {
           if (err){
               return res.status(500).send({ error: err.message })
           }

           return res.status(200).send(result.fields);
       });

    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch accounts', details: err.message });
    }
};
