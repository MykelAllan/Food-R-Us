import React, { createContext, useContext, useEffect, useState } from 'react'
import { getAllCartItems, postAddToCart, deleteAllCartItems, updateCartItemAmount } from '../api/cartItem'
import { AuthContext } from './authContext'


export const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const { userId } = useContext(AuthContext)
    const [cartItems, setCartItems] = useState([])
    const [isAddCart, setIsAddCart] = useState(false)
    const [cartMsg, setCartMsg] = useState('')

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
            subTotal += item.price * item.amount
        }

        subTotal = subTotal.toFixed(2)
        return { totalItems, subTotal }
    }

    // + 1 cart item
    const addItemAmount = async (id, amount) => {
        try {
            await updateCartItemAmount(id, amount + 1);
            fetchCart()
        } catch (err) {
            console.error('error adding an item')
        }
    }


    // - 1 cart item
    const decreItemAmount = async (id, amount) => {
        try {
            await updateCartItemAmount(id, amount - 1);
            fetchCart()
        } catch (err) {
            console.error('error adding an item')
        }
    }

    // custom amount cart item
    const updateItemAmount = async (id, amount) => {
        try {
            await updateCartItemAmount(id, amount);
            fetchCart()
        } catch (err) {
            console.error('error adding an item')
        }
    }

    const fetchCart = async () => {
        setIsAddCart(true)
        try {
            const data = await getAllCartItems(userId);
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
        console.log(isAddCart)
        try {
            await postAddToCart(cartItem, userId);
            // setCartMsg(data); added to cart msg
            fetchCart()
            console.log(`${cartItem.name} is successfully saved ${isAddCart}`)

        } catch (err) {
            console.error('Error adding item to cart', err);
        }
    }


    const clearCartItems = async () => {
        setCartMsg("")
        try {
            const res = await deleteAllCartItems(userId);
            const msg = res.response.data;
            setCartItems([]);
            if (msg) {
                setCartMsg(msg);
                console.log(msg);
            }
        } catch (err) {
            setCartMsg("Cart Cleared");
        }
    }

    const contextValue = {
        cartItems, cartMsg, isAddCart,
        fetchCart, addToCart, clearCartItems, getTotalCart,
        addItemAmount, decreItemAmount, updateItemAmount,

    }



    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}
