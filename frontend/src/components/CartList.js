import React, { useContext, useEffect } from 'react'


import '../styles/carts.css'

import emptyCart from '../assets/img/empty-cart.png'
import { AppContext } from '../context/context'

export const CartList = () => {
    const { cartItems, fetchCart, addItemAmount, decreItemAmount, updateItemAmount, } = useContext(AppContext)


    const updateItemAmountHandler = async (item, value) => {
        const amount = parseInt(value, 10);
        if (amount > 0) {
            await updateItemAmount?.(item.id, amount);
        }
    }

    useEffect(() => {
        fetchCart()
    }, [])

    return (
        <div className="cart-container">
            <div className='cart-box'>
                {cartItems.length === 0 ? (
                    <div className='cart-items'>
                        <div className='cart-empty'>
                            <p>Cart Empty</p>
                            <img src={emptyCart} loading='lazy' />
                        </div>
                    </div>
                ) : (
                    <div className='cart-items'>
                        {cartItems.map((item) => (
                            <div className='cart-item' key={item.id}>
                                <div className='cart-item-img'>
                                    <img src={item.imageUrl} />
                                </div>
                                <div className='cart-item-text'>
                                    <h1>{item.name}</h1>
                                    <h2>${item.price.toFixed(2)}</h2>
                                </div>
                                <div className='cart-item-btn'>
                                    <button onClick={() => decreItemAmount(item.id, item.amount)} className='container'>-</button>
                                    <input text="number"
                                        onChange={(e) => updateItemAmountHandler(item, e.target.value)}
                                        value={item.amount || ''} />
                                    <button onClick={() => addItemAmount(item.id, item.amount)} className='container'>+</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    )
}
