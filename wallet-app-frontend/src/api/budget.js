import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Helper function to get the authentication token
const getAuthToken = () => {
    return localStorage.getItem('token');
};

// Fetch Budgets
export const fetchBudgets = async () => {
    const token = getAuthToken();
    if (!token) {
        throw new Error("No authentication token found");
    }

    try {
        const response = await axios.get(`${API_URL}/budgets`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
            return response.data; // Return the budgets list
        } else {
            throw new Error(`Failed to fetch budgets. Status code: ${response.status}`);
        }
    } catch (error) {
        console.error("Error fetching budgets: ", error);
        throw new Error("Unable to load budgets. Please try again later.");
    }
};

// Create a New Budget
export const createBudget = async (budgetData) => {
    const token = getAuthToken();
    if (!token) {
        throw new Error("No authentication token found");
    }

    try {
        const response = await axios.post(`${API_URL}/budgets`, budgetData, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 201) {
            return response.data; // Return the newly created budget
        } else {
            throw new Error(`Failed to create budget. Status code: ${response.status}`);
        }
    } catch (error) {
        console.error("Error creating budget: ", error);
        throw new Error("Unable to create budget. Please try again later.");
    }
};
