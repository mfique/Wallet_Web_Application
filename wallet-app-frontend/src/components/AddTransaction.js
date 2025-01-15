import React, { useState } from 'react';
import axios from 'axios';

function AddTransaction() {
    const [formData, setFormData] = useState({
        type: 'expense',
        amount: '',
        category: '',
        subcategory: '',
        description: '',
        account: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/transactions', formData);
        alert('Transaction added!');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Category" onChange={(e) => setFormData({ ...formData, category: e.target.value })} required />
            <input type="number" placeholder="Amount" onChange={(e) => setFormData({ ...formData, amount: e.target.value })} required />
            <button type="submit">Add Transaction</button>
        </form>
    );
}

export default AddTransaction;
