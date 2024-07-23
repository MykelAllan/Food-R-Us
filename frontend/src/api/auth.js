import axios from 'axios'


// const BASE_URL = process.env.REACT_APP_API_BASE_URL

const BASE_URL = process.env.REACT_APP_TEST_API_BASE_URL

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

export const registerNewUser = async (newUser) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/register`, JSON.stringify(newUser), {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('Registration successful:', response.data);
        // Handle successful registration, e.g., show a success message or redirect
    } catch (error) {
        console.error('Registration error:', error.response.data);
        // Handle registration error, e.g., show an error message
    }
}