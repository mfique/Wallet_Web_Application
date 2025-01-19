import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const register = async (email, password, name) => {
    try {
        // Pass name, email, and password for registration
        const response = await axios.post(`${API_URL}/auth/register`, { email, password, name });

        // Display success alert only after the request is successful
        alert('Registration successful!');
        return response.data;  // Return the response to handle it outside if needed
    } catch (err) {
        // Handle error from the registration request
        console.error(err.response);
        alert('Error during registration: ' + (err.response?.data?.message || 'Please try again.'));
        throw err; // Rethrow the error to handle it outside if needed
    }
};

export const login = async (email, password) => {
    try {
        // Send login request with email and password
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });
        return response.data; // Return the response to handle it outside if needed
    } catch (err) {
        // Handle error from the login request
        console.error(err.response);
        alert('Invalid credentials or error occurred. Please try again.');
        throw err; // Rethrow the error to handle it outside if needed
    }
};
