const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { initializeDatabase } = require('./models');
const accountRoutes = require('./routes/accountRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const authRoutes = require('./routes/authRoutes');

// Initialize the Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Public routes (no authentication required)
app.use('/auth', authRoutes); // Routes like login, register

// Protected routes (applied authMiddleware only to these routes)
app.use('/accounts', authMiddleware, accountRoutes);
app.use('/transactions', authMiddleware, transactionRoutes);
app.use('/budgets', authMiddleware, budgetRoutes);
app.use('/notifications', authMiddleware, notificationRoutes);

app.use(express.static('/client/build'))


app.get('/', async (req, res) => {
   res.send("Hello World!");
});

// Initialize the database and start the server
initializeDatabase()
    .then(() => {
        console.log('Database setup complete.');
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    })
    .catch((err) => {
        console.error('Error during database setup:', err.message);
        process.exit(1); // Exit if database initialization fails
    });
