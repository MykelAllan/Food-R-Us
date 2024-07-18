import React, { createContext, useEffect, useState } from 'react'

import { registerNewUser, loginUser } from '../api/auth'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isLoggedIn, setLoggedIn] = useState(false)
    const [credentials, setCredentials] = useState({ username: '', password: '' })


    // //login
    const logInUser = async (username, password) => {
        try {
            const response = await loginUser(username, password)
            setUser(username)
            setCredentials({ username, password })
            console.log('Login successful:', response.data);
        } catch (err) {
            console.log('error logging in')
            setUser(null)
        }

    }

    //register
    const registerUser = async (newUser) => {
        try {
            await registerNewUser(newUser)

        } catch (err) {
            console.log(err)
        }
    }


    const contextValue = {
        logInUser, registerUser, user, credentials
    }



    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}
