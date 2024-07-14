import React, { } from 'react'

import { CartList } from '../../components/CartList'
import { CartCheckout } from '../../components/CartCheckout'


export const Cart = () => {


  return (
    <div className='cartItems-body container'>
      <div className='cart-items-cont container'>
        <h1 className="cart-title">Cart Items</h1>
        <CartList />
        <CartCheckout />
      </div>
    </div>
  )
}
