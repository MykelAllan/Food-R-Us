import React, { createContext, useEffect, useState } from 'react'
import { getAllCartItems, postAddToCart, deleteAllCartItems, updateCartItemAmount } from '../api/cartItem'
import { getAllProducts, getProductsByCateg, postNewProduct } from '../api/products'
import { registerNewUser } from '../api/auth'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
    const [products, setProducts] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [message, setMessage] = useState('')
    const [cartMsg, setCartMsg] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [credentials, setCredentials] = useState({ username: '', password: '' })

    useEffect(() => {
        fetchProducts()

    }, [])

    // //login
    // const logInUser = async (username, password) => {
    //     try {
    //         const response = await loginUser(username, password)
    //         setUser(username)
    //         setCredentials({ username, password })
    //         console.log('Login successful:', response.data);
    //     } catch (err) {
    //         console.log('error logging in')
    //         setUser(null)
    //     }

    // }

    //register
    const registerUser = async (newUser) => {
        try {
            await registerNewUser(newUser)

        } catch (err) {
            console.log(err)
        }
    }



    //products
    const fetchProducts = async () => {
        try {
            const data = await getAllProducts();
            setProducts(data);
        } catch (err) {
            console.error('Error fetching products:', err);
            setProducts([]);
        }
    };

    const filterHandler = async (category) => {
        try {
            const data = await getProductsByCateg(category);
            setProducts(data);
        } catch (err) {
            console.error('Error fetching products:', err);
            setProducts([]);
        }
    };
    const createNewProduct = async (newProduct) => {
        setIsLoading(true)
        setMessage(null)
        try {
            const data = await postNewProduct(newProduct);
            setProducts([...products, data])
            setMessage(`${newProduct.name} is successfully saved`)

        } catch (err) {
            console.error('Error saving new product', err);
            setProducts([]);
        } finally {
            setIsLoading(false)
        }
    };

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
        try {
            const data = await getAllCartItems();
            getTotalCart()
            setCartItems(data);

        } catch (err) {
            console.error('Error fetching products:', err);
            setCartItems([]);
        }
    }


    const addToCart = async (cartItem) => {
        try {
            const data = await postAddToCart(cartItem);
            // setCartMsg(data); added to cart msg
            fetchCart()
            console.log(`${cartItem.name} is successfully saved`)

        } catch (err) {
            console.error('Error adding item to cart', err);
        }
    }


    const clearCartItems = async () => {
        setCartMsg("")
        try {
            const res = await deleteAllCartItems();
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
        products, cartItems, cartMsg, message, isLoading,
        fetchProducts, filterHandler, createNewProduct,
        fetchCart, addToCart, clearCartItems, getTotalCart,
        addItemAmount, decreItemAmount, updateItemAmount,
        registerUser, user, credentials
    }



    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}
