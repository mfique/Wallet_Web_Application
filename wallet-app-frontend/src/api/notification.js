import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Helper function to get the authentication token
const getAuthToken = () => {
    return localStorage.getItem('token');
};

// Fetch Notifications
export const fetchNotifications = async () => {
    const token = getAuthToken();
    if (!token) {
        throw new Error("No authentication token found");
    }

    try {
        const response = await axios.get(`${API_URL}/notifications`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
            return response.data; // Return the notifications list
        } else {
            throw new Error(`Failed to fetch notifications. Status code: ${response.status}`);
        }
    } catch (error) {
        console.error("Error fetching notifications: ", error);
        throw new Error("Unable to load notifications. Please try again later.");
    }
};

// Mark a Notification as Read
export const markNotificationAsRead = async (id) => {
    const token = getAuthToken();
    if (!token) {
        throw new Error("No authentication token found");
    }

    try {
        const response = await axios.put(`${API_URL}/notifications/${id}`, {}, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
            return response.data; // Return the updated notification
        } else {
            throw new Error(`Failed to mark notification as read. Status code: ${response.status}`);
        }
    } catch (error) {
        console.error(`Error marking notification ${id} as read: `, error);
        throw new Error("Unable to mark notification as read. Please try again later.");
    }
};
