import axios from 'axios'

import { getBaseUrl } from './config'


const BASE_URL = getBaseUrl()

export const loginUser = async (username, password) => {
    try {
        const response = await axios.get(`${BASE_URL}/auth/check`, {
            headers: {
                'Content-Type': 'application/json'
            },
            auth: {
                username,
                password
            }
        });
        // Handle successful login
        return { success: true, data: response.data }
    } catch (error) {
        return { success: false, message: error.message }
    }
}

export const registerNewUser = async (newUser) => {
    try {
        const result = await axios.post(`${BASE_URL}/auth/register`, JSON.stringify(newUser), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(result)
        return { success: true, result }
    } catch (error) {
        console.error('Registration error:', error.response.data);
        return { success: false, error }
    }
}

//get role by user
export const getUserRole = async (username) => {
    try {
        const response = await axios.get(`${BASE_URL}/auth/get-role/${username.toLowerCase()}`);
        return response.data;
    } catch (err) {
        console.log('error getting role')
    }
}
//get role by user
export const getUserId = async (username) => {
    try {
        const response = await axios.get(`${BASE_URL}/auth/get-id/${username.toLowerCase()}`);
        return response.data;
    } catch (err) {
        console.log('error getting userId')
    }
}

