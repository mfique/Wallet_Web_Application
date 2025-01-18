import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchNotifications = () => {
    return axios.get(`${API_URL}/notifications`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
};

export const markNotificationAsRead = (id) => {
    return axios.put(`${API_URL}/notifications/${id}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
};
