import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchAccounts = () => {
    return axios.get(`${API_URL}/accounts`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
};

export const createAccount = (accountData) => {
    return axios.post(`${API_URL}/accounts`, accountData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
};
