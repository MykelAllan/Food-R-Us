import React, { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getAllOrders, getOrdersByUserId, getOrderById, postCheckout, deletesOrder, updateStatusOrder } from '../api/order'
import { AuthContext } from './authContext'
import { CartContext } from './cartContext'


export const OrderContext = createContext()

export const OrderProvider = ({ children }) => {
    const { userId, user, password } = useContext(AuthContext)
    const { fetchCart, cartItems, getTotalCart, isFreeShipping } = useContext(CartContext)
    const [isFetching, setFetching] = useState(true)
    const [adminOrders, setAdminOrders] = useState([])
    const [userOrders, setUserOrders] = useState([])


    //order model
    const [orderModel, setOrderModel] = useState({
        items: [],
        shippingFee: 0,
        status: '',
        totalPrice: 0,
        userId: ''
    });



    //fetch orders by user id
    const fetchOrdersByUserId = async () => {
        try {
            const res = await getOrdersByUserId(userId, user, password)
            setUserOrders(res)
            console.log(res)
        } catch (err) {
            return ([])
        }
    }
    const fetchAllOrders = async () => {
        try {
            const res = await getAllOrders(user, password)
            setAdminOrders(res)
            console.log(res)
        } catch (err) {
            return ([])
        }
    }


    //get order by id
    const fetchOrderById = async (orderId) => {
        setFetching(true)
        setOrderModel([])
        try {
            const newOrder = await getOrderById(orderId, user, password);
            if (newOrder === null) {
                toast.error("Error Getting The order")
            }
            setFetching(false)

            setOrderModel(newOrder)
            console.log('done fetching order by id', isFetching)
        } catch (err) {
            toast.error("Error Getting The Product")
            setOrderModel([])
        }
    }

    //update status of the order
    const saveStatusOrder = async (orderId) => {
        try {
            const isSuccess = await updateStatusOrder(orderId, orderModel, user, password);
            const orId = orderId.slice(-3)
            if (isSuccess) {
                toast.success(`Successfully updated ${orId}`, {
                    autoClose: 4000
                })
                fetchAllOrders()

            } else {
                toast.error("Error updating the order", {
                    autoClose: 4000
                })
            }
        } catch (err) {
            console.error('Error saving new order', err);
            toast.error("Error updating the order")
        }
    }

    //delete an order
    const deleteAnOrder = async (orderId) => {
        try {
            const isSucess = await deletesOrder(orderId, user, password);
            if (isSucess) {
                toast.success("Sucessfully Deleted An order", {
                    autoClose: 4000
                })
                fetchAllOrders()
            }
        } catch (err) {
            console.error('Error deleting an orde', err);
            toast.error("Error deleting an order")
        }
    }



    //checkout handler
    const checkoutHandler = async () => {
        //checks if cartItems is zero
        if (cartItems.length === 0) {
            toast.error('Please add items to cart before checking out')
            return;
        }

        const total = getTotalCart()
        let totalPrice = parseFloat(total.subTotal)
        const shippingFee = isFreeShipping ? 0 : 1.50
        totalPrice = totalPrice + shippingFee
        console.log(totalPrice)

        const isSuccess = await postCheckout(cartItems, userId, totalPrice, shippingFee, user, password)
        if (isSuccess) {
            toast.success('Order has been placed!', {
                autoClose: 2000
            })
            fetchCart()
        } else {
            toast.error('Failed to place the order')
        }

    }




    const contextValue = {
        userOrders,
        adminOrders,
        orderModel,
        isFetching,
        saveStatusOrder,
        setOrderModel,
        fetchAllOrders,
        fetchOrderById,
        fetchOrdersByUserId,
        checkoutHandler,
        deleteAnOrder,


    }



    return (
        <OrderContext.Provider value={contextValue}>
            {children}
        </OrderContext.Provider>
    )
}
