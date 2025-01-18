import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchTransactions = () => axios.get(`${API_URL}/transactions`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});
export const addTransaction = (transaction) => axios.post(`${API_URL}/transactions`, transaction, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});
