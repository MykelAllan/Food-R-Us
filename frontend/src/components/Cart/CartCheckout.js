import React, { useContext, useState, useEffect } from 'react'
import { CartContext } from '../../context/cartContext'
import { OrderContext } from '../../context/orderContext'


export const CartCheckout = () => {
    const { clearCartItems, fetchCart, getTotalCart, isFreeShipping } = useContext(CartContext)
    const { checkoutHandler } = useContext(OrderContext)

    const total = getTotalCart()

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
                <h1 className='cart-shipping-info'>Shipping: <span>{isFreeShipping ? 'Free' : (total.totalItems > 0 ? '$1.50' : '$0.00')}</span></h1>

            </div>
            <div className='cart-total-btn'>
                <button onClick={checkoutHandler} className='cart-checkout'>Checkout</button>
                <button onClick={() => {
                    clearCartHandler()
                }} className='cart-remove'>Clear Cart</button>

            </div>
        </div>
    )
}
