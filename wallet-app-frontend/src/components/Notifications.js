import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Notifications() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/notifications`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setNotifications(data);
            } catch (err) {
                alert('Failed to fetch notifications');
            }
        };

        fetchNotifications();
    }, []);

    const markAsRead = async (id) => {
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/notifications/${id}`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setNotifications(notifications.filter((notif) => notif.id !== id));
        } catch (err) {
            alert('Failed to mark notification as read');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Notifications</h1>
                {notifications.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                        {notifications.map((notif) => (
                            <li
                                key={notif.id}
                                className="py-4 flex justify-between items-center text-gray-700"
                            >
                                <span className="text-sm">{notif.message}</span>
                                <button
                                    onClick={() => markAsRead(notif.id)}
                                    className="bg-blue-600 text-white px-4 py-1 text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Mark as Read
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 text-center">No unread notifications</p>
                )}
            </div>
        </div>
    );
}

export default Notifications;
