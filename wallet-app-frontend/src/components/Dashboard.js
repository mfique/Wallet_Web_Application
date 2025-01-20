import React, { useEffect, useState } from 'react';
import { fetchAccounts } from '../api/account';
import { fetchNotifications } from '../api/notification';
import { fetchBudgets } from '../api/budget';
import { Bar } from 'react-chartjs-2';

function Dashboard() {
    const [accounts, setAccounts] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [budget, setBudget] = useState(null);
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accountsData = await fetchAccounts();
                const notificationsData = await fetchNotifications();
                const budgetsData = await fetchBudgets();

                setAccounts(accountsData || []);
                setNotifications(notificationsData || []);
                setBudget(budgetsData[0] || null);

                // Example static chart data (you can modify this based on your use case)
                setChartData({
                    labels: ['Income', 'Expense'],
                    datasets: [
                        {
                            label: 'Financial Summary',
                            data: [5000, 3000], // Replace with dynamic data if needed
                            backgroundColor: ['#36A2EB', '#FF6384'],
                        },
                    ],
                });
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
                setError('Failed to fetch dashboard data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <p className="text-lg text-gray-600">Loading dashboard...</p>
            </div>
        );
    }

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
                                <p className="text-lg font-bold">{new Date(budget.start_date).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className="text-gray-600 text-sm">End Date</p>
                                <p className="text-lg font-bold">{new Date(budget.end_date).toLocaleDateString()}</p>
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

                {/* Notifications Section */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
                    {notifications.length > 0 ? (
                        <ul>
                            {notifications.map((notif) => (
                                <li key={notif.id} className="py-2">
                                    <p className="text-sm text-gray-600">{notif.message}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No new notifications</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
