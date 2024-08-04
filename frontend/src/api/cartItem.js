import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_BASE_URL

// const BASE_URL = process.env.REACT_APP_TEST_API_BASE_URL

export const getAllCartItems = async (userId, user, password) => {
    try {
        const res = await axios.get(`${BASE_URL}/api/cart/${userId}`, {
            auth: {
                username: user,
                password
            }
        })
        return res.data
    } catch (err) {
        console.error('error fetching the cart items')
        return []

    }
}

export const postAddToCart = async (cartItem, userId, user, password) => {
    try {
        await axios.post(`${BASE_URL}/api/cart/add`, { ...cartItem, userId }, {
            headers: {
                'Content-Type': 'application/json'
            },
            auth: {
                username: user,
                password
            }
        })
        return true
    } catch (err) {
        console.error('error adding to cart')
        return false
    }
}

export const updateCartItemAmount = async (id, amount, user, password) => {
    try {
        await axios.put(`${BASE_URL}/api/cart/${id}`, { amount }, {
            headers: {
                'Content-Type': 'application/json',
            },
            auth: {
                username: user,
                password
            }
        });
    } catch (err) {
        console.error('Error updating cart item amount', err);
    }
}

export const deleteAllCartItems = async (userId, user, password) => {
    try {
        await axios.delete(`${BASE_URL}/api/cart/clear/${userId}`, {
            auth: {
                username: user,
                password
            }
        })
        return true
    } catch (err) {
        console.error('error clearing the cart', err)
        return false
    }
}


