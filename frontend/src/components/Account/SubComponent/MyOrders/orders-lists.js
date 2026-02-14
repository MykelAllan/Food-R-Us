import React, { useState, useEffect } from 'react';
import { FaEye } from "react-icons/fa";
import { OrderDescription } from './OrderDesc/OrderDescription';


export const OrderHistoryLists = (props) => {
    const { item, index, reOrderHandler, isPastOrders } = props.data
    const { toggleOrderDesc } = props

    const img = item.items[0].imageUrl
    const numProds = item.totalProducts
    const totalPrice = item.totalPrice.toFixed(2)

    const toggleHandler = () => {
        toggleOrderDesc(item.id)
    }

    return (
        <>
            <div className='ohl-card' key={index}>
                <div className='ohl-card-img'>
                    <img src={img} alt='Product' />
                </div>
                <div className='ohl-card-text'>
                    <div className='ohl-card-text-sub'>
                        <h4>Products</h4>
                        <h3>{numProds} Products</h3>
                    </div>
                    <div className='ohl-card-text-price'>
                        <h4>Order Price</h4>
                        <h3>${totalPrice}</h3>
                    </div>
                </div>
                <div className='ohl-card-view-icon' onClick={toggleHandler}>
                    <FaEye color='#fff' />
                    <h4>View</h4>
                </div>
            </div>
            <OrderDescription data={{ item, toggleHandler, reOrderHandler, isPastOrders }} />

        </>
    );
};
