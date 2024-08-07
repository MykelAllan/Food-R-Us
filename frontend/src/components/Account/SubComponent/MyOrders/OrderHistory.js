import React, { useContext, useEffect, useState } from 'react'
import { OrderContext } from '../../../../context/orderContext'

import { PastOrders } from './pastorders'
import { PendingOrders } from './pendingorders'

import './order-lists.css'
export const OrderHistory = () => {
    const { fetchOrdersByUserId, userOrders } = useContext(OrderContext)
    const [activeOrderId, setActiveOrderId] = useState(null)

    const toggleOrderDesc = (orderId) => {
        const currentOrderDesc = document.getElementById(`od-container-${orderId}`),
            newOrderDesc = document.getElementById(`od-container-${orderId}`);

        const previousOrderDesc = document.getElementById(`od-container-${activeOrderId}`);
        if (activeOrderId === orderId) {
            // If an order is already active, just toggle visibility off
            setActiveOrderId(null);
            currentOrderDesc.classList.remove('active');
        } else {
            // Hide the previously active order description
            if (previousOrderDesc) {
                previousOrderDesc.classList.remove('active');
            }
            // Show the new order description
            if (newOrderDesc) {
                newOrderDesc.classList.add('active');
            }
            // Update the active order ID
            setActiveOrderId(orderId);
        }
    };

    // for pc escape to toggle
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const currentOrderDesc = document.getElementById(`od-container-${activeOrderId}`)
            if (currentOrderDesc) {
                currentOrderDesc.classList.remove('active')
                setActiveOrderId(null)
            }
        }
    })

    useEffect(() => {
        fetchOrdersByUserId()
        console.log(userOrders)

    }, [])


    return (
        <div className='my-container'>
            <div className='my-content'>
                <div className='my-pending-container'>
                    <h1>Pending Orders</h1>
                    <PendingOrders data={{ items: userOrders, activeOrderId, toggleOrderDesc }}
                    />
                </div>
                <div className='my-past-container'>
                    <h1>Past Orders</h1>
                    <PastOrders data={{ items: userOrders, activeOrderId, toggleOrderDesc }}
                    />
                </div>
            </div>
        </div>
    )
}
