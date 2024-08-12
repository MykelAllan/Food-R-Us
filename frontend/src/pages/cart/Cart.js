import React, { useContext, useEffect } from 'react'
import './cart.css'
import { CartList } from '../../components/Cart/CartList'
import { CartCheckout } from '../../components/Cart/CartCheckout'
import { CartContext } from '../../context/cartContext'
import { useLocation } from 'react-router-dom'



export const Cart = () => {
  const { getTotalCart } = useContext(CartContext)
  const location = useLocation()


  const total = getTotalCart()



  return (
    <div className='cartItems-body container'>
      <div className='cart-items-cont container'>
        <h1 className="cart-title">Cart</h1>
        <div className='mobile-total-items'>
          <h1>({total.totalItems} items)</h1>
        </div>
        <CartList />
        <CartCheckout />
      </div>
    </div>
  )
}
