import React, { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { registerNewUser, loginUser, getUserRole, getUserId } from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(localStorage.getItem('user') || null);
    const [password, setPassword] = useState(localStorage.getItem('pass') || null);
    const [isLoggedIn, setLoggedIn] = useState(!!localStorage.getItem('user'));
    const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || null);
    const [userId, setUserId] = useState(localStorage.getItem('userId') || null);

    //toast
    const showToast = (message, type) => {
        toast[type](message, {
            autoClose: false,
            position: "top-right"
        })
    }


    //checks if logged in user is an admin
    const isAdmin = () => {
        if (localStorage.getItem('userRole') === 'ADMIN') {
            showToast('You are an ADMIN', 'info')
            showToast('You can access ADMIN Dashboard through My Account', 'info')
           
        }
    }


    // login user
    const logInUser = async (username, password) => {
        const loggingInToast = toast.loading('Logging in...');
        const result = await loginUser(username, password);
        toast.update(loggingInToast, {
            render: 'Successfully Logged In',
            type: 'success',
            isLoading: false,
            autoClose: 4000,
        });
        if (result.success) {
            setUser(username);
            setPassword(password);
            setLoggedIn(true);
            localStorage.setItem('user', username);
            localStorage.setItem('pass', password);
            await getUserRoleByUsername(username);
            await getUserIdByUsername(username)
            return true;
        } else {
            toast.update(loggingInToast, {
                render: 'Invalid Username or Password',
                type: 'error',
                isLoading: false,
                autoClose: 4000,
            });
            handleLogout();
            return false;
        }
    };

    // register new user
    const registerUser = async (newUser) => {
        try {
            const result = await registerNewUser(newUser);
            if (result.success) {
                toast.success('Successfully Created a New Account', {
                    autoClose: 4000
                })
            } else {
                toast.error('Username is Already Taken', {
                    autoClose: 4000
                })
            }
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
        setLoggedIn(false);
        setUserRole(null);
        setUserId(null);
        localStorage.removeItem('user');
        localStorage.removeItem('pass');
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
        user, password,
        isLoggedIn,
        logOutUser,
        isAdmin,
        userRole,
        userId
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
