import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode }  from 'jwt-decode';

const AuthContext = createContext(undefined, undefined);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                // Optional: Add validation logic here (e.g., check token expiry)
                setUser(decodedToken);
            } catch (err) {
                console.error('Error decoding token:', err);
                setError('Invalid token. Please login again.');
            }
        }
    }, []);

    const login = (token) => {
        try {
            const decodedToken = jwtDecode(token);
            localStorage.setItem('token', token);
            setUser(decodedToken);
            setError(null); // Clear any previous errors on successful login
        } catch (err) {
            console.error('Error decoding token:', err);
            setError('Invalid login. Please try again.');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setError(null); // Clear any previous errors on logout
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
