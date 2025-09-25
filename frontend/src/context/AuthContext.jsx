import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';
import axios from 'axios';

const AuthContext = createContext(null);

const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for token and username on initial app load
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username'); // Also get the username
        if (token && username) {
            setAuthToken(token);
            setUser({ username, token }); // Reconstruct the full user object
        }
        setLoading(false);
    }, []);

    const login = async (userData) => {
        const response = await authService.login(userData);
        const { data } = response.data;

        if (data.token) {
            // Save both token and username to localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', userData.username);
            setAuthToken(data.token);
            setUser({ username: userData.username, token: data.token });
        }
        return response;
    };

    const logout = () => {
        // Clear everything on logout
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setAuthToken(null);
        setUser(null);
    };

    const value = { user, login, logout };

    if (loading) {
        return <div>Loading session...</div>;
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
