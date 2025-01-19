import React, { useEffect, useState } from 'react';
import { fetchNotifications, markNotificationAsRead } from '../api/notification';

function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadNotifications = async () => {
            try {
                const data = await fetchNotifications();
                setNotifications(data);
            } catch (err) {
                setError(err.message || 'Failed to fetch notifications');
            }
        };

        loadNotifications();
    }, []);

    const handleMarkAsRead = async (id) => {
        try {
            await markNotificationAsRead(id);
            setNotifications((prevNotifications) =>
                prevNotifications.filter((notif) => notif.id !== id)
            );
        } catch (err) {
            alert(err.message || 'Failed to mark notification as read');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Notifications</h1>
                {error && (
                    <p className="text-red-500 text-center mb-4">{error}</p>
                )}
                {notifications.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                        {notifications.map((notif) => (
                            <li
                                key={notif.id}
                                className="py-4 flex justify-between items-center text-gray-700"
                            >
                                <span className="text-sm">{notif.message}</span>
                                <button
                                    onClick={() => handleMarkAsRead(notif.id)}
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
