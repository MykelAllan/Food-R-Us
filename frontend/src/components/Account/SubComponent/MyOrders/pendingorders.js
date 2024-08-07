import React from 'react'
import { OrderHistoryLists } from './orders-lists'

export const PendingOrders = (props) => {
    const { items, activeOrderId, toggleOrderDesc } = props.data

    return (
        <div className='ohl-cards'>
            {items
                .filter(item => item.status === "PENDING")
                .map((item, index) => (
                    <OrderHistoryLists
                        key={index}
                        data={{ item, index, activeOrderId }}
                        toggleOrderDesc={() => toggleOrderDesc(item.id)}

                    />
                ))}
        </div>
    )
}
