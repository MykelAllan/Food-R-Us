import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_BASE_URL

// const BASE_URL = process.env.REACT_APP_TEST_API_BASE_URL

export const getAllCartItems = async (userId) => {
    try {
        const res = await axios.get(`${BASE_URL}/api/cart/${userId}`)
        return res.data
    } catch (err) {
        console.error('error fetching the cart items')
        return []

    }
}

export const postAddToCart = async (cartItem, userId) => {
    try {
        const res = await axios.post(`${BASE_URL}/api/cart/add`, {...cartItem, userId}, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return res.data
    } catch (err) {
        console.error('error adding to cart')
    }
}

export const updateCartItemAmount = async (id, amount) => {
    try {
        await axios.put(`${BASE_URL}/api/cart/${id}`, {amount}, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (err) {
        console.error('Error updating cart item amount', err);
    }
}

export const deleteAllCartItems = async (userId) => {
    try {
        const res = await axios.delete(`${BASE_URL}/api/cart/clear/${userId}`)
        return res.data
    } catch (err) {
        console.error('error clearing the cart', err)
        return err
    }
}


