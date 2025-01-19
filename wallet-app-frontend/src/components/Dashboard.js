import React, { useEffect, useState } from 'react';
import { fetchAccounts } from '../api/account';
import { fetchTransactions } from '../api/transaction';
import { fetchNotifications } from '../api/notification';
import { fetchBudgets } from '../api/budget';
import { Bar } from 'react-chartjs-2';

function Dashboard() {
    const [accounts, setAccounts] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [_notifications, setNotifications] = useState([]);
    const [budget, setBudget] = useState(null);
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Enhanced fetchData with error handling
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetching data from APIs
                const accountsData = await fetchAccounts();
                const transactionsData = await fetchTransactions();
                const notificationsData = await fetchNotifications();
                const budgetsData = await fetchBudgets();

                // Setting data to state
                setAccounts(accountsData);
                setTransactions(transactionsData);
                setNotifications(notificationsData);
                setBudget(budgetsData[0]);

                // Processing transactions to create chart data
                const income = transactionsData
                    .filter((tx) => tx.type === 'income')
                    .reduce((sum, tx) => sum + tx.amount, 0);

                const expense = transactionsData
                    .filter((tx) => tx.type === 'expense')
                    .reduce((sum, tx) => sum + tx.amount, 0);

                setChartData({
                    labels: ['Income', 'Expense'],
                    datasets: [
                        {
                            label: 'Financial Summary',
                            data: [income, expense],
                            backgroundColor: ['#36A2EB', '#FF6384'],
                        },
                    ],
                });
            } catch (err) {
                console.error('Error fetching data:', err); // Log error for debugging
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // If loading, show loading state
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <p className="text-lg text-gray-600">Loading...</p>
            </div>
        );
    }

    // If error occurs, show error message
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <p className="text-lg text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-6 py-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-8">Dashboard</h1>

                {/* Budget Overview */}
                {budget && (
                    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Budget Overview</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <p className="text-gray-600 text-sm">Budget Amount</p>
                                <p className="text-lg font-bold">${budget.amount}</p>
                            </div>
                            <div>
                                <p className="text-gray-600 text-sm">Start Date</p>
                                <p className="text-lg font-bold">{budget.start_date}</p>
                            </div>
                            <div>
                                <p className="text-gray-600 text-sm">End Date</p>
                                <p className="text-lg font-bold">{budget.end_date}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Financial Summary Chart */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Financial Summary</h2>
                    <div className="h-80">
                        <Bar
                            data={chartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: { legend: { display: true } },
                            }}
                        />
                    </div>
                </div>

                {/* Accounts Section */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Accounts</h2>
                    {accounts.length > 0 ? (
                        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {accounts.map((account) => (
                                <li
                                    key={account.id}
                                    className="p-4 bg-gray-100 rounded-lg shadow-md"
                                >
                                    <h3 className="text-lg font-bold">{account.name}</h3>
                                    <p className="text-sm text-gray-600">
                                        Balance: <span className="font-semibold">${account.balance}</span>
                                    </p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No accounts available</p>
                    )}
                </div>

                {/* Transactions Section */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Transactions</h2>
                    {transactions.length > 0 ? (
                        <ul className="divide-y divide-gray-200">
                            {transactions.map((transaction) => (
                                <li key={transaction.id} className="py-4">
                                    <p className="text-sm text-gray-600">
                                        {transaction.date} -{' '}
                                        <span className="font-semibold">{transaction.category}</span>
                                    </p>
                                    <p className="text-lg font-bold text-gray-800">
                                        ${transaction.amount}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No transactions available</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
