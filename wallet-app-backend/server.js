const express = require('express');
const cors = require('cors');
require('dotenv').config();

const accountRoutes = require('./routes/accountRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

// Initialize the Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/accounts', accountRoutes);
app.use('/transactions', transactionRoutes);
app.use('/budgets', budgetRoutes);
app.use('/notifications', notificationRoutes);

// Test Database Connection
const sql = require('./config/db');
app.get('/', async (req, res) => {
    try {
        const result = await sql`SELECT version()`;
        res.send({ message: 'Database connected successfully!', version: result[0].version });
    } catch (err) {
        res.status(500).send({ error: 'Failed to connect to the database', details: err.message });
    }
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT,
    () =>
        console.log(`Server running on http://localhost:${PORT}`));
