import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchBudgets = () => {
    return axios.get(`${API_URL}/budgets`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
};

export const createBudget = (budgetData) => {
    return axios.post(`${API_URL}/budgets`, budgetData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
};
