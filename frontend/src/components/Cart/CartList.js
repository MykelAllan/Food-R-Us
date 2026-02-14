import React, { useContext, useEffect, useState } from 'react'


import './carts.css'

import emptyCart from '../../assets/img/empty-cart.png'
import { CartContext } from '../../context/cartContext'


export const CartList = () => {
    const { cartItems, fetchCart, addItemAmount, decreItemAmount, updateItemAmount, getTotalCart } = useContext(CartContext)
    const [itemAmounts, setItemAmounts] = useState({})

    const total = getTotalCart()

    const onBlurHandler = (item, value) => {
        const amount = parseInt(value, 10);
        if (amount >= 0) {
            updateItemAmount(item.id, amount);
        }

    }

    const onChangeHandler = (item, value) => {
        const updatedAmounts = { ...itemAmounts, [item.id]: value };
        setItemAmounts(updatedAmounts);
    };

    // checks if items is zero
    const carItemAmount = () => {
        const cartItemContainer = document.getElementById('cart-items')
        if (total.totalItems === 0) {
            cartItemContainer.classList.add('active')
        } else {
            cartItemContainer.classList.remove('active')
        }
    }


    useEffect(() => {
        fetchCart()
        carItemAmount()

    }, [total.totalItems])

    useEffect(() => {
        const initialAmounts = {};
        cartItems.forEach(item => {
            initialAmounts[item.id] = item.amount || 0;
        });
        setItemAmounts(initialAmounts);
    }, [cartItems]);

    return (
        <div className="cart-container">
            <div className='cart-box'>
                {cartItems.length === 0 ? (
                    <div className='cart-items' id='cart-items'>
                        <div className='cart-empty'>
                            <p>Cart Empty</p>
                            <img src={emptyCart} loading='lazy' />
                        </div>
                    </div>
                ) : (
                    <div className='cart-items' id='cart-items'>
                        {cartItems.map((item) => (
                            <div className='cart-item' key={item.id}>
                                <div className='cart-item-img'>
                                    {item.discountPercentage > 0 && <label className='discount-tag'>{item.discountPercentage}%</label>}
                                    <img src={item.imageUrl} loading='lazy' />
                                </div>
                                <div className='cart-item-text'>
                                    <h1>{item.name}</h1>
                                    <h2>
                                        {item.discountPercentage > 0 ?
                                            <label className='discounted-price'><span className='regular-price'>${item.price.toFixed(2)}</span>${item.discountedPrice.toFixed(2)}</label>
                                            :
                                            <label>${item.price.toFixed(2)}</label>
                                        }

                                    </h2>
                                </div>
                                <div className='cart-item-btn'>
                                    <button onClick={() => decreItemAmount(item.id, item.amount)} className='container'>-</button>
                                    <input type="text" inputMode='numeric'
                                        onBlur={(e) => onBlurHandler(item, e.target.value)}
                                        onChange={(e) => onChangeHandler(item, e.target.value)}
                                        value={itemAmounts[item.id] || ''} />
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
