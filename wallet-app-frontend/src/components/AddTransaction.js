import React, { useEffect, useState } from 'react';
import { fetchAccounts } from '../api/account';
import { addTransaction } from '../api/transaction';

function AddTransaction() {
    const [accounts, setAccounts] = useState([]);
    const [formData, setFormData] = useState({
        type: '',
        amount: '',
        account: '',
        category: '',
        description: '',
    });

    useEffect(() => {
        const loadAccounts = async () => {
            try {
                const { data } = await fetchAccounts();
                setAccounts(data);
            } catch (err) {
                alert('Failed to fetch accounts');
            }
        };

        loadAccounts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addTransaction(formData);
            alert('Transaction added successfully!');
        } catch (err) {
            alert('Failed to add transaction');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Add Transaction</h1>

            <label className="block text-sm font-medium text-gray-600 mb-2">Type:</label>
            <select
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
            </select>

            <label className="block text-sm font-medium text-gray-600 mb-2 mt-4">Amount:</label>
            <input
                type="number"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
            />

            <label className="block text-sm font-medium text-gray-600 mb-2 mt-4">Account:</label>
            <select
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => setFormData({ ...formData, account: e.target.value })}
            >
                <option value="">Select an account</option>
                {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                        {account.name}
                    </option>
                ))}
            </select>

            <label className="block text-sm font-medium text-gray-600 mb-2 mt-4">Category:</label>
            <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
            />

            <label className="block text-sm font-medium text-gray-600 mb-2 mt-4">Description:</label>
            <textarea
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            ></textarea>

            <button
                type="submit"
                className="w-full py-3 mt-6 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-200"
            >
                Submit
            </button>
        </form>
    );
}

export default AddTransaction;
