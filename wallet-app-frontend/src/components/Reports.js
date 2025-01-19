import React, { useEffect, useState } from 'react';
import { fetchBudgets } from '../api/budget';
import { fetchTransactions } from '../api/transaction';
import { Bar } from 'react-chartjs-2';

function Reports() {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });
    const [budget, setBudget] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch budgets
                const budgets = await fetchBudgets();
                if (budgets && budgets.length > 0) {
                    setBudget(budgets[0]);
                }

                // Fetch transactions
                const transactions = await fetchTransactions();

                // Ensure data exists before processing
                const income = transactions
                    ? transactions.filter((tx) => tx.type === 'income').reduce((sum, tx) => sum + tx.amount, 0)
                    : 0;
                const expense = transactions
                    ? transactions.filter((tx) => tx.type === 'expense').reduce((sum, tx) => sum + tx.amount, 0)
                    : 0;

                // Update chart data
                setChartData({
                    labels: ['Income', 'Expense'],
                    datasets: [
                        {
                            label: 'Financial Summary',
                            data: [income, expense],
                            backgroundColor: ['#36A2EB', '#FF6384'],
                            borderColor: ['#1E88E5', '#E53935'],
                            borderWidth: 1,
                        },
                    ],
                });
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to fetch report data. Please try again later.');
            }
        };

        fetchData();
    }, []); // Empty array ensures this runs only once when the component mounts

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Reports</h1>

                {error && (
                    <p className="text-red-600 text-center mb-4">{error}</p>
                )}

                {budget && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Budget Overview</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-blue-50 p-4 rounded-lg shadow-md">
                                <p className="text-sm text-gray-500">Amount</p>
                                <p className="text-lg font-semibold text-blue-600">${budget.amount}</p>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg shadow-md">
                                <p className="text-sm text-gray-500">Start Date</p>
                                <p className="text-lg font-semibold text-blue-600">{budget.start_date}</p>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg shadow-md">
                                <p className="text-sm text-gray-500">End Date</p>
                                <p className="text-lg font-semibold text-blue-600">{budget.end_date}</p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="w-full h-96">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
                        Financial Summary
                    </h2>
                    <Bar
                        data={chartData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    display: true,
                                    position: 'top',
                                },
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Reports;
