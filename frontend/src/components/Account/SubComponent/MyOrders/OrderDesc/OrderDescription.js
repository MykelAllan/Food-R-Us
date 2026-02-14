import React, { useContext } from 'react'
import { CartContext } from '../../../../../context/cartContext'
import { OrderContext } from '../../../../../context/orderContext'
import { Lists } from './lists'

import './order-desc.css'

export const OrderDescription = (props) => {
    const { item, toggleHandler, isPastOrders } = props.data
    const { reOrderHandler } = useContext(CartContext)
    const { deleteAnOrder } = useContext(OrderContext)

    const subTotal = (item.totalPrice - item.shippingFee).toFixed(2)
    const shippingFee = item.shippingFee.toFixed(2)
    const totalPrice = item.totalPrice.toFixed(2)
    const totalProducts = item.totalProducts

    // last 3 characters of the order id
    // for order #
    const orderID = item.id
    const orderNum = orderID.slice(-3)



    return (
        <div className='od-container' id={`od-container-${item.id}`}>
            <div className='od-close-btn' onClick={toggleHandler}>
                <box-icon size='sm' name='x'></box-icon>
            </div>
            <div className='od-header'>
                <h3>Order ID: {orderNum}</h3>
                <h3>Status: {item.status}</h3>
            </div>
            <div className='od-products'>
                <div className='od-order-lists'>
                    {item.items.map((prod, index) => (
                        <Lists key={index} data={prod} />
                    ))}
                </div>

            </div>
            <div className='od-summary'>
                <div className='od-summary-headers'>
                    <h3>Total Items:</h3>
                    <h3>Subtotal:</h3>
                    <h3>Shipping Fee:</h3>
                    <h3>Total Price:</h3>
                </div>
                <div className='od-summary-body'>
                    <h3>{totalProducts}</h3>
                    <h3>${subTotal}</h3>
                    <h3>${shippingFee}</h3>
                    <h3>${totalPrice}</h3>
                </div>
                {isPastOrders ?
                    <button id='od-reoder-btn' onClick={() => reOrderHandler(item.items, orderNum)}>Re-Order</button>
                    :
                    <button id='od-cancelorder-btn' onClick={() => deleteAnOrder(orderID)} >Cancel Order</button>
                }

            </div>
        </div>
    )
}
