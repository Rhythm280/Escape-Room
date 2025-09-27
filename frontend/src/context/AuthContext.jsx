import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

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
    const [gameState, setGameState] = useState(null);
    const [gameCompleted, setGameCompleted] = useState(false);
    const [loading, setLoading] = useState(true);

    const processUserToken = (token) => {
        const decodedToken = jwtDecode(token);
        const username = decodedToken.sub;
        const roles = decodedToken.roles || [];
        const userDetails = { username, roles, token };

        setUser(userDetails);
        localStorage.setItem('user', JSON.stringify(userDetails));
        return userDetails;
    };

    useEffect(() => {
        const savedUserJSON = localStorage.getItem('user');
        if (savedUserJSON) {
            const savedUser = JSON.parse(savedUserJSON);
            setAuthToken(savedUser.token);
            setUser(savedUser);

            const isGameCompleted = localStorage.getItem(`${savedUser.username}-gameCompleted`) === 'true';
            if (isGameCompleted) {
                setGameCompleted(true);
            } else {
                const savedGameState = localStorage.getItem('gameState');
                if (savedGameState) {
                    setGameState(JSON.parse(savedGameState));
                }
            }
        }
        setLoading(false);
    }, []);

    const login = async (userData) => {
        const response = await authService.login(userData);
        const { data } = response.data;
        let userDetails = null;

        if (data.token) {
            setAuthToken(data.token);
            userDetails = processUserToken(data.token); // Decode the token

            const isGameCompleted = localStorage.getItem(`${userDetails.username}-gameCompleted`) === 'true';
            if (isGameCompleted) {
                setGameCompleted(true);
                setGameState(null);
                localStorage.removeItem('gameState');
            } else if (data.gameState) {
                setGameCompleted(false);
                setGameState(data.gameState);
                localStorage.setItem('gameState', JSON.stringify(data.gameState));
            } else {
                setGameCompleted(false);
                setGameState(null);
                localStorage.removeItem('gameState');
            }
        }
        return userDetails; // **THE FIX IS HERE**: Return the user details
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('gameState');
        setAuthToken(null);
        setUser(null);
        setGameState(null);
        setGameCompleted(false); 
    };
    
    const updateGameState = (newGameState) => {
        setGameState(newGameState);
        if (newGameState) {
            localStorage.setItem('gameState', JSON.stringify(newGameState));
        } else {
            localStorage.removeItem('gameState');
        }
    };

    const markGameAsCompleted = () => {
        setGameCompleted(true);
        if (user) {
            localStorage.setItem(`${user.username}-gameCompleted`, 'true');
        }
        updateGameState(null);
    };

    const value = { user, gameState, gameCompleted, loading, login, logout, updateGameState, markGameAsCompleted };

    if (loading) {
        return <div>Loading session...</div>;
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};