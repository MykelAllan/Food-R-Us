import React, { useContext, useState, useEffect } from 'react'
import { CartContext } from '../../context/cartContext'


export const CartCheckout = () => {
    const [visible, setVisible] = useState(false)
    const { cartMsg, clearCartItems, fetchCart, getTotalCart } = useContext(CartContext)

    const total = getTotalCart()

    const fadeOutMsg = () => {
        if (cartMsg) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }
    const clearCartHandler = async () => {
        try {
            await clearCartItems();
            fetchCart()

        } catch (err) {
            console.error('Error clearing cart:', err);
        }
    }

    return (
        <div className='cart-total-container'>
            <h1 className='cart-total-title'>Cart Checkout</h1>
            <div className='cart-total-info'>
                <h1>Total Items: <span>{total.totalItems}</span></h1>
                <h1>Subtotal: <span>${total.subTotal}</span></h1>
            </div>
            <div className='cart-total-btn'>
                <button className='cart-checkout'>Checkout</button>
                <button onClick={() => {
                    clearCartHandler()
                    fadeOutMsg()
                }} className='cart-remove'>Clear Cart</button>
                {/* message */}
                <p className={`cart-msg ${visible ? 'fade-in' : 'fade-out'}`}>{cartMsg}</p>
            </div>
        </div>
    )
}
