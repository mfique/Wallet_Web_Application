import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const fetchTransactions = (startDate, endDate) => {
    return axios.get(`${API_URL}/transactions`, {
        params: { startDate, endDate },
    });
};

export const addTransaction = (transaction) => {
    return axios.post(`${API_URL}/transactions`, transaction);
};
