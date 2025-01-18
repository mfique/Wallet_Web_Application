import React, { useEffect, useState } from 'react';
import { fetchAccounts } from '../api/account';
import { fetchTransactions } from '../api/transaction';

function Dashboard() {
    const [accounts, setAccounts] = useState([]);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accountsData = await fetchAccounts();
                setAccounts(accountsData.data);

                const transactionsData = await fetchTransactions();
                setTransactions(transactionsData.data);
            } catch (err) {
                alert('Failed to load dashboard data');
            }
        };

        fetchData().then(() => console.log("Fetched data"));
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

                {/* Accounts Section */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Accounts</h2>
                    {accounts.length > 0 ? (
                        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {accounts.map((account) => (
                                <li
                                    key={account.id}
                                    className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
                                >
                                    <h3 className="text-lg font-medium text-gray-800">
                                        {account.name}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Balance: <span className="font-bold">${account.balance}</span>
                                    </p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No accounts available</p>
                    )}
                </section>

                {/* Transactions Section */}
                <section>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Transactions</h2>
                    {transactions.length > 0 ? (
                        <ul className="space-y-4">
                            {transactions.map((transaction) => (
                                <li
                                    key={transaction.id}
                                    className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
                                >
                                    <p className="text-sm text-gray-600">
                                        <span className="font-bold">{transaction.date}</span> -{' '}
                                        <span className="text-blue-600 font-semibold">
                                            {transaction.category}
                                        </span>
                                    </p>
                                    <p className="text-gray-800 font-medium">
                                        Amount: ${transaction.amount}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No transactions available</p>
                    )}
                </section>
            </div>
        </div>
    );
}

export default Dashboard;
