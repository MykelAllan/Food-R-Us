import axios from 'axios'

const BASE_URL = 'https://food-r-us.onrender.com'

// export const loginUser = async (username, password) => {
//     try {
//         const response = await axios.get('http://localhost:8080/auth/check', {
//             auth: {
//                 username,
//                 password
//             }
//         });
//         // Handle successful login
//         //setMessage('Login successful');
//         console.log('Login successful:', response.data);
//     } catch (error) {
        
//         console.error('Login error:', error.response ? error.response.data : error.message);
//     }
// }

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