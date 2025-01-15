import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

function Dashboard() {
    const [transactions, setTransactions] = useState([]);
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        axios.get('http://localhost:5000/transactions?startDate=2025-01-01&endDate=2025-01-14')
            .then(res => {
                setTransactions(res.data);
                const categories = [...new Set(res.data.map(tx => tx.category))];
                const data = categories.map(category => {
                    return res.data
                        .filter(tx => tx.category === category)
                        .reduce((sum, tx) => sum + tx.amount, 0);
                });
                setChartData({
                    labels: categories,
                    datasets: [
                        {
                            label: 'Expenses by Category',
                            data: data,
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                });
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h1>Transaction Summary</h1>
            <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
            <ul>
                {transactions.map(tx => (
                    <li key={tx._id}>{tx.date} - {tx.category} - {tx.amount}</li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;