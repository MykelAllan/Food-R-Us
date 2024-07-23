import React, { createContext, useEffect, useState } from 'react';
import { registerNewUser, loginUser, getUserRole, getUserId } from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(localStorage.getItem('user') || null);
    const [isLoggedIn, setLoggedIn] = useState(!!localStorage.getItem('user'));
    const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || null);
    const [userId, setUserId] = useState(localStorage.getItem('userId') || null);
    const [credentials, setCredentials] = useState({ username: '', password: '' });

    const logInUser = async (username, password) => {
        const result = await loginUser(username, password);
        if (result.success) {
            setUser(username);
            setLoggedIn(true);
            setCredentials({ username, password });
            localStorage.setItem('user', username);
            await getUserRoleByUsername(username);
            await getUserIdByUsername(username);
            return true;
        } else {
            handleLogout();
            return false;
        }
    };

    const registerUser = async (newUser) => {
        try {
            await registerNewUser(newUser);
        } catch (err) {
            console.log(err);
        }
    };

    const getUserRoleByUsername = async (username) => {
        try {
            const data = await getUserRole(username);
            localStorage.setItem('userRole', data);
            setUserRole(data);
        } catch (err) {
            console.log('Error fetching user role: ', err);
        }
    };

    const getUserIdByUsername = async (username) => {
        try {
            const data = await getUserId(username);
            localStorage.setItem('userId', data);
            setUserId(data);
        } catch (err) {
            console.log('Error fetching user ID: ', err);
        }
    };

    const handleLogout = () => {
        setUser(null);
        setCredentials({ username: '', password: '' });
        setLoggedIn(false);
        setUserRole(null);
        setUserId(null);
        localStorage.removeItem('user');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
    };

    const logOutUser = () => {
        handleLogout();
        window.location.reload();
    };

    const contextValue = {
        logInUser,
        registerUser,
        user,
        credentials,
        isLoggedIn,
        logOutUser,
        userRole,
        userId
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
