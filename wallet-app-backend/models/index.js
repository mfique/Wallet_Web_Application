const { initializeDatabase: initializeUserTable } = require('./User');
const { initializeDatabase: initializeAccountTable } = require('./Account');
const { initializeDatabase: initializeBudgetTable } = require('./Budget');
const { initializeDatabase: initializeTransactionTable } = require('./Transaction');
const { initializeDatabase: initializeNotificationTable } = require('./Notification');

const initializeDatabase = async () => {
    try {
        await initializeUserTable();
        await initializeAccountTable();
        await initializeBudgetTable();
        await initializeTransactionTable(); // Correct function is called
        await initializeNotificationTable();
        console.log('All tables initialized successfully!');
    } catch (err) {
        console.error('Error during database initialization:', err.message);
        throw err;
    }
};

module.exports = { initializeDatabase };
