import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api/cart';

export const getAllCartItems = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/`)
        return res.data
    } catch (err) {
        console.error('error fetching the cart items')

    }
}

export const postAddToCart = async (cartItem) => {
    try {
        const res = await axios.post(`${BASE_URL}/add`, cartItem, {
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
        await axios.put(`${BASE_URL}/${id}`, {amount}, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (err) {
        console.error('Error updating cart item amount', err);
    }
}

export const deleteAllCartItems = async () => {
    try {
        const res = await axios.delete(`${BASE_URL}/clear`)
        return res.data
    } catch (err) {
        console.error('error clearing the cart', err)
        return err
    }
}


