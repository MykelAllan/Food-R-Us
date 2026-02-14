import axios from 'axios'

import { getBaseUrl } from './config'

const BASE_URL = getBaseUrl()

//gets all orders by userId
export const getOrdersByUserId = async (userId, user, password) => {
    try {
        const res = await axios.get(`${BASE_URL}/api/orders/user/${userId}`, {
            auth: {
                username: user,
                password
            }
        });
        return res.data;
    } catch (err) {
        console.error('Error fetching orders:', err);
        return []
    }
}

//fetch product by id
export const getOrderById = async (orderId, user, password) => {
    try {
        const order = await axios.get(`${BASE_URL}/admin/products/order/${orderId}`, {
            auth: {
                username: user,
                password
            }
        })
        return order.data;
    } catch (err) {
        console.log(err)
    }
}

//creates new order | checkout
export const postCheckout = async (cartITems, userId, totalPrice, shippingFee, user, password) => {
    const order = { userId, items: cartITems, totalPrice, shippingFee }
    try {
        await axios.post(`${BASE_URL}/api/orders`, order, {
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

//gets all orders for admin
export const getAllOrders = async (user, password) => {
    try {
        const res = await axios.get(`${BASE_URL}/api/orders`, {
            auth: {
                username: user,
                password
            }
        });
        return res.data;
    } catch (err) {
        console.error('Error fetching orders:', err);
        return []
    }
}

//save status order

export const updateStatusOrder = async (orderID, newOrderModel, user, password) => {


    try {
        await axios.put(`${BASE_URL}/admin/products/${orderID}/status`, newOrderModel, {
            headers: {
                'Content-Type': 'application/json',
            },
            auth: {
                username: user,
                password
            }
        })
        return true

    } catch (err) {
        console.error(`error updating the order status `)
        return false
    }
}



//deletes an order
export const deletesOrder = async (orderID, user, password) => {
    try {
        await axios.delete(`${BASE_URL}/api/orders/delete/${orderID}`, {
            auth: {
                username: user,
                password
            }
        })
        return true

    } catch (err) {
        console.error(`error delete the product `)
        return false
    }
}


