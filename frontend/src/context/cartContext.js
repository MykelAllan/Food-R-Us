import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getAllCartItems, postAddToCart, deleteAllCartItems, updateCartItemAmount } from '../api/cartItem'
import { AuthContext } from './authContext'


export const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const { userId, user, password, isLoggedIn } = useContext(AuthContext)
    const [cartItems, setCartItems] = useState([])
    const [isAddCart, setIsAddCart] = useState(false)
    const [cartMsg, setCartMsg] = useState('')
    const [isFreeShipping, setFreeShipping] = useState(false)

    const navigate = useNavigate()

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

    // adds one item to cart
    const handleAddToCart = (product) => {
        if (!isLoggedIn) {
            navigate('/auth/login')
            toast.info("Sign In to add product to cart", {
                autoClose: 4000
            })
        } else {
            // cartItem model
            const newCartItem = {
                productId: product.id,
                userId: userId,
                name: product.name,
                price: product.price,
                discountPercentage: product.discountPercentage,
                discountedPrice: product.discountedPrice,
                amount: 1, // Set default amount as 1
                imageUrl: product.imageUrl,
            };
            addToCart([newCartItem]);
        }
    };


    // re orders an entire lists of items
    const reOrderHandler = async (newCartItems, orderNum) => {
        try {
            const isSuccess = await postAddToCart(newCartItems, userId, user, password);
            if (isSuccess) {
                toast.info(`Order ID: ${orderNum} was added to cart`)
                fetchCart()
            }

        } catch (err) {
            console.error('Error adding item to cart', err);
        }
    }

    const addToCart = async (cartItem) => {
        setIsAddCart(true)
        try {
            const isSuccess = await postAddToCart(cartItem, userId, user, password);
            if (isSuccess) {
                toast.info(`${cartItem[0].name} was added to cart`)
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
        cartItems, cartMsg, isAddCart, isFreeShipping, handleAddToCart, reOrderHandler,
        fetchCart, addToCart, clearCartItems, getTotalCart,
        addItemAmount, decreItemAmount, updateItemAmount,

    }



    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}
