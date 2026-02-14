import axios from 'axios'

import { getBaseUrl } from './config'


const BASE_URL = getBaseUrl()

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

export const postAddToCart = async (cartItems, userId, user, password) => {
    try {
        await axios.post(`${BASE_URL}/api/cart/add-items`, cartItems, {
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


