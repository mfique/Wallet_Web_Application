import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Helper function to get the token
const getAuthToken = () => {
    return localStorage.getItem('token');
}

// Fetch Accounts with enhanced error handling
export const fetchAccounts = async () => {
    const token = getAuthToken();
    if (!token) {
        throw new Error("No authentication token found");
    }

    try {
        const response = await axios.get(`${API_URL}/accounts`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        // You can add response validation here
        if (response.status === 200) {
            return response.data; // Assuming the response has a 'data' field
        } else {
            throw new Error(`Failed to fetch accounts. Status code: ${response.status}`);
        }
    } catch (error) {
        // Log the error and provide a message to the user
        console.error("Error fetching accounts: ", error);
        throw new Error("Unable to load accounts. Please try again later.");
    }
};

// Create Account with enhanced error handling
export const createAccount = async (accountData) => {
    const token = getAuthToken();
    if (!token) {
        throw new Error("No authentication token found");
    }

    try {
        const response = await axios.post(`${API_URL}/accounts`, accountData, {
            headers: { Authorization: `Bearer ${token}` },
        });

        // You can add response validation here
        if (response.status === 201) {
            return response.data; // Assuming the response contains the created account's data
        } else {
            throw new Error(`Failed to create account. Status code: ${response.status}`);
        }
    } catch (error) {
        // Log the error and provide a message to the user
        console.error("Error creating account: ", error);
        throw new Error("Unable to create account. Please try again later.");
    }
};
