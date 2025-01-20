import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Helper function to get the authentication token
const getAuthToken = () => {
    return localStorage.getItem('token');
};
// Fetch Transactions
export const fetchTransactions = async () => {
    const token = getAuthToken();
    if (!token) {
        throw new Error("No authentication token found");
    }

    try {
        const response = await axios.get(`${API_URL}/transactions`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
            return response.data; // Return the transactions list
        } else {
            throw new Error(`Failed to fetch transactions. Status code: ${response.status}`);
        }
    } catch (error) {
        console.error("Error fetching transactions: ", error);
        throw new Error("Unable to load transactions. Please try again later.");
    }
};

// Add a New Transaction
export const addTransaction = async (transactionData) => {
    const token = getAuthToken();
    if (!token) {
        throw new Error("No authentication token found");
    }

    try {
        const response = await axios.post(`${API_URL}/transactions`, transactionData, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 201) {
            return response.data; // Return the newly created transaction
        } else {
            throw new Error(`Failed to add transaction. Status code: ${response.status}`);
        }
    } catch (error) {
        console.error("Error adding transaction: ", error);
        throw new Error("Unable to add transaction. Please try again later.");
    }
};
