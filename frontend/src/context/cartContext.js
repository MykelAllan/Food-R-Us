import React, { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getAllCartItems, postAddToCart, deleteAllCartItems, updateCartItemAmount } from '../api/cartItem'
import { AuthContext } from './authContext'


export const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const { userId, user, password } = useContext(AuthContext)
    const [cartItems, setCartItems] = useState([])
    const [isAddCart, setIsAddCart] = useState(false)
    const [cartMsg, setCartMsg] = useState('')
    const [isFreeShipping, setFreeShipping] = useState(false)


    useEffect(() => {
        fetchCart()
    }, [])


    //cart items

    //gets the total amount of items and subtotal
    const getTotalCart = () => {
        let totalItems = 0
        let subTotal = 0
        for (const item of cartItems) {
            totalItems += item.amount
            if (item.discountedPrice > 0) { //checks if product is on discount, if so it gets the discountPrice
                subTotal += item.discountedPrice * item.amount
            } else {
                subTotal += item.price * item.amount
            }
        }

        subTotal = subTotal.toFixed(2)
        if (subTotal >= 25) { //checks if subtotal is >= 25, give free shipping
            setFreeShipping(true)
        } else {
            setFreeShipping(false)
        }
        return { totalItems, subTotal }
    }

    // + 1 cart item
    const addItemAmount = async (id, amount) => {
        try {
            await updateCartItemAmount(id, amount + 1, user, password);
            fetchCart()
        } catch (err) {
            console.error('error adding an item')
        }
    }


    // - 1 cart item
    const decreItemAmount = async (id, amount) => {
        try {
            await updateCartItemAmount(id, amount - 1, user, password);
            fetchCart()
        } catch (err) {
            console.error('error adding an item')
        }
    }

    // custom amount cart item
    const updateItemAmount = async (id, amount) => {
        try {
            await updateCartItemAmount(id, amount, user, password);
            fetchCart()
        } catch (err) {
            console.error('error adding an item')
        }
    }

    const fetchCart = async () => {
        setIsAddCart(true)
        try {
            const data = await getAllCartItems(userId, user, password);
            getTotalCart()
            setCartItems(data);

        } catch (err) {
            console.error('Error fetching products:', err);
            setCartItems([]);
        } finally {
            setIsAddCart(false)
        }
    }


    const addToCart = async (cartItem) => {
        setIsAddCart(true)
        try {
            const isSuccess = await postAddToCart(cartItem, userId, user, password);
            if (isSuccess) {
                toast.info(`${cartItem.name} was added to cart`)
                fetchCart()
            }

        } catch (err) {
            console.error('Error adding item to cart', err);
        }
    }


    const clearCartItems = async () => {
        try {
            const isSuccess = await deleteAllCartItems(userId, user, password);
            setCartItems([]);
            if (isSuccess) {
                toast.success("Clear Cart Items")
            } else {
                toast.error("Cart Is Already Empty")
            }
        } catch (err) {
            toast.error("Error clearing the cart")
        }
    }

    const contextValue = {
        cartItems, cartMsg, isAddCart, isFreeShipping,
        fetchCart, addToCart, clearCartItems, getTotalCart,
        addItemAmount, decreItemAmount, updateItemAmount,

    }



    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}
