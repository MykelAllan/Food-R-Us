import React, { useContext } from 'react'
import { CartContext } from '../../../../context/cartContext'
import { OrderHistoryLists } from './orders-lists'


export const PastOrders = (props) => {
    const { items, activeOrderId, toggleOrderDesc } = props.data
    const isPastOrders = true

    return (
        <div className='ohl-cards'>
            {items.filter(item => item.status !== "PENDING").length === 0 ? (
                <p>No Past Orders</p>
            ) : (
                items
                    .filter(item => item.status !== "PENDING")
                    .map((item, index) => (
                        <OrderHistoryLists
                            key={index}
                            data={{ item, index, activeOrderId, isPastOrders }}
                            toggleOrderDesc={() => toggleOrderDesc(item.id)}
                        />
                    ))
            )}
        </div>
    )
}
