// src/contexts/AuthContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setAuthToken(token);
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('authToken', token);
        setAuthToken(token);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setAuthToken(null);
    };

    const value = {
        authToken,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};